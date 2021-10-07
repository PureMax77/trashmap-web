import React from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import Loading from "../components/Loading"
import Button_more from "../components/Button/Button_more"
import PreVideo from "../components/PreVideo"

const Videos_QUERY = gql`
  query seeVideos($offset: Int!) {
    seeVideos(offset: $offset) {
      id
      url
      tMountain {
        id
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: ${(props) => props.minHeight};
`

function Videos() {
  const { data, fetchMore, networkStatus } = useQuery(Videos_QUERY, {
    variables: { offset: 0 },
    notifyOnNetworkStatusChange: true,
  })

  const MoreFeed = () => {
    fetchMore({ variables: { offset: data?.seeVideos?.length } })
  }

  return (
    <Wrapper minHeight={`${window.innerHeight - 100}px`}>
      {data?.seeVideos?.map((video, index) => (
        <PreVideo key={index} video={video} marginBottom={"50px"} />
      ))}
      {networkStatus === 1 ? (
        <Loading />
      ) : (
        <Button_more text={"더보기"} onClick={MoreFeed} loading={networkStatus === 3} />
      )}
    </Wrapper>
  )
}

export default Videos
