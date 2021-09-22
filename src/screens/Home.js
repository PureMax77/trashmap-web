/*global naver*/
/*global kakao*/
import { gql, useQuery, useReactiveVar } from "@apollo/client"
import React, { useEffect, useState } from "react"
import Current from "../components/Current"
import SearchBox from "../components/SearchBox"
import FreeBoard from "../components/FreeBoard"
import Loading from "../components/Loading"
import Notice from "../components/Notice"
import Donation from "../components/Donation"
import { donationPopVar, noticePopVar } from "../apollo"
// import styled from "styled-components"
// import $ from "jquery"

const TMounts_QUERY = gql`
  query seeTMountains {
    seeTMountains {
      id
      latitude
      longtitude
      address
      amount
      image
      finish
      cleanCost
    }
  }
`

// 버튼 이동 예시 지점
// const seoul = new naver.maps.LatLngBounds(
//   new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
//   new naver.maps.LatLng(37.7010174173061, 127.18379493229875)
// )

// 임시 초기 쓰레기산
const tmpMountain = new naver.maps.LatLng(36.841805, 127.321792)

// 지도 초기 생성 옵션
const mapOptions = {
  center: tmpMountain,
  zoom: 10,
  scaleControl: true,
  logoControl: true,
  mapDataControl: true,
  mapTypeControl: false,
  zoomControl: false,
}

let map // 지도 넣을 곳
let marker // 현재위치 마커
const infoViews = [] // 쓰레기산 마커 모음
let searchMarker // 검색 마커

const Home = () => {
  const noticePop = useReactiveVar(noticePopVar)
  const donationPop = useReactiveVar(donationPopVar)

  const [getPosition, setGetPosition] = useState(false)

  const { data, loading } = useQuery(TMounts_QUERY)

  // 마커 생성 함수
  const createMarker = (tMountains) => {
    // 여러개 마커 생성 및 이벤트 등록
    tMountains.forEach((tMountain, index) => {
      const position = new naver.maps.LatLng(tMountain.latitude, tMountain.longtitude)

      // 정보창 html
      var contentString = [
        '<div style="width:250px;display:flex;align-items:center;flex-direction:column;padding:15px;line-height:150%;border:none;">',
        '   <div style="margin-bottom:10px;max-width:220px;">',
        tMountain.image
          ? `<img src="${tMountain.image}" height="150" style="max-width:220px;" alt="쓰레기 지도" />`
          : null,
        "   </div>",
        "   <p>규모 : " +
          (tMountain.amount ? `${tMountain.amount.toLocaleString("ko-KR")}톤` : `미등록`) +
          "   </p>",
        "   <p>처리 여부 : " + (tMountain.finish ? "완료" : "미완료") + "</p>",
        // "   <p>(처리를 지지합니다 기다려주세요...)</p>",
        '   <div style="margin:20px 0 5px 0">',
        `     <a href="/tmountain/${tMountain.id}" style="border:none;padding:10px 20px;border-radius:5px;background-color:#c8d6e5;font-weight:600;">자세히</a>`,
        "   </div>",
        "</div>",
      ].join("")

      // 마커 생성부
      var marker = new naver.maps.Marker({
        map: map,
        position,
        icon: "./img/mountain.svg",
      })

      // 정보창 생성부
      var infowindow = new naver.maps.InfoWindow({
        content: contentString,

        // maxWidth: 300,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 2,
        anchorSize: new naver.maps.Size(0, 0),
        // anchorSkew: true,
        // anchorColor: "white",

        pixelOffset: new naver.maps.Point(0, -10),
      })
      infoViews.push({ body: infowindow, display: false })

      // 마커에 이벤트 등록
      naver.maps.Event.addListener(marker, "click", function (e) {
        // console.log(infowindow, infowindow.getMap())
        if (infowindow.getMap()) {
          infowindow.close()
          infoViews[index].display = false
        } else {
          //만약 다른 켜져있는 정보창이 있다면 끄기
          const viewIndex = infoViews.findIndex((a) => a.display)
          if (viewIndex !== -1) {
            infoViews[viewIndex].body.setMap(null)
            infoViews[viewIndex].display = false
          }
          //클릭한 마커 정보창 켜기
          infowindow.open(map, marker)
          infoViews[index].display = true
        }
      })
    })
  }

  const switchPos = () => {
    if (!getPosition) {
      setGetPosition(true)
    } else {
      setGetPosition(false)
    }
  }

  // 현재위치 이동
  const getCurrentPosition = () => {
    switchPos()

    if (navigator.geolocation && !getPosition) {
      /* 위치정보 사용 가능 */
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const latlng = new naver.maps.LatLng(latitude, longitude)
        // map.setCenter(latlng); // 얻은 좌표를 지도의 중심으로 설정합니다.
        // map.setZoom(18);
        marker = new naver.maps.Marker({
          map: map,
          position: latlng,
          icon: {
            content:
              '<img class="pulse" draggable="false" unselectable="on" src="https://myfirstmap.s3.ap-northeast-2.amazonaws.com/circle.png">',
            anchor: new naver.maps.Point(11, 11),
          },
        })
        map.setZoom(14, false)
        map.panTo(latlng)
      })
    } else {
      /* 위치정보 사용 불가능 */
      // alert("위치 정보가 없습니다.");
      marker.setMap(null)
    }
  }

  // 검색 이동
  let ps = new kakao.maps.services.Places()

  const SearchBtn = (e) => {
    if (e.keyCode === 13) {
      let content = e.target.value
      ps.keywordSearch(content, placeSearchCB)
    }
  }

  const placeSearchCB = (data, status) => {
    if ((status = kakao.maps.services.Status.OK)) {
      let target = data[0]
      const lat = target.y
      const lng = target.x
      const latlng = new naver.maps.LatLng(lat, lng)
      // 마커 생성부
      if (searchMarker) {
        searchMarker.setMap(null)
      }
      searchMarker = new naver.maps.Marker({
        position: latlng,
        map: map,
      })

      map.setZoom(15, false)
      map.panTo(latlng)
    } else {
      alert("??")
    }
  }

  // 지도 초기화
  useEffect(() => {
    map = new naver.maps.Map("map", mapOptions) // 지도 생성
    const mapSize = new naver.maps.Size(window.innerWidth, window.innerHeight - 35)
    map.setSize(mapSize)
    // 맵 누르면 마커 정보창 꺼지게
    naver.maps.Event.addListener(map, "click", function () {
      const viewIndex = infoViews.findIndex((a) => a.display)
      if (viewIndex !== -1) {
        infoViews[viewIndex].body.setMap(null)
        infoViews[viewIndex].display = false
      }
    })
  }, [])

  useEffect(() => {
    if (data) {
      createMarker(data?.seeTMountains) // 마커 생성
    }
  }, [data])
  // console.log(data, loading, error)
  return (
    <div>
      {noticePop && <Notice />}
      {donationPop && <Donation />}
      {loading && <Loading />}
      <div id="map" />
      <SearchBox SearchBtn={SearchBtn} />
      <FreeBoard mountains={data?.seeTMountains} />
      <Current getCurrentPosition={getCurrentPosition} getPosition={getPosition} />
    </div>
  )
}

export default Home
