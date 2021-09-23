/*global naver*/
import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const InfoBoxS = styled.div`
  position: absolute;
  height: 42px;
  z-index: 10000;
  top: 42px;
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border: 1px solid rgb(232, 232, 232);
  background-color: rgb(255, 255, 255);

  @media screen and (max-width: 420px) {
    width: 96%;
    margin: 2%;
  }
  @media screen and (min-width: 420px) {
    width: 400px;
    margin: 10px;
  }
`

const SearchWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const InputWrap = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
`
const SearchInput = styled.input`
  width: 100%;
`

const IconWrap = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  top: 0;
  /* height: 100%; */
`

const TitleBox = styled.div`
  width: 45px;
  font-size: 14px;
  font-weight: 900;
  margin-right: 12px;
`

const Border = styled.div`
  width: 1px;
  opacity: 0.2;
  height: 80%;
  background: rgb(112, 112, 112);
`

const SearchBox = ({ SearchBtn }) => {
  return (
    <InfoBoxS>
      {/* <TitleBox>트래쉬맵</TitleBox> */}
      {/* <Border></Border> */}
      {/* <div style={{ marginLeft: "auto" }}> */}
      {/* <div></div> */}
      <SearchWrap>
        <IconWrap>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </IconWrap>
        <InputWrap>
          <SearchInput
            onKeyDown={SearchBtn}
            placeholder={"예) 서울역 or 포레나노원아파트 or 삼성동"}
            type="text"
          />
        </InputWrap>
      </SearchWrap>
      {/* </div> */}
    </InfoBoxS>
  )
}

export default SearchBox
