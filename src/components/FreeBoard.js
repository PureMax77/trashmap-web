import React from "react"
import styled from "styled-components"
import { openDonation, openNotice } from "../apollo"

const InfoBoxS = styled.div`
  position: absolute;
  width: 220px;
  top: 102px;
  z-index: 10000;
  padding: 3px;
  border-radius: 4px;
  text-align: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border: 1px solid rgb(232, 232, 232);
  background-color: rgb(255, 255, 255);

  @media screen and (max-width: 420px) {
    left: 7.5px;
  }
  @media screen and (min-width: 420px) {
    left: 10px;
  }
`

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
`

const Item = styled.ul`
  padding: 5px;

  /* &:not(:first-child) {
    border-left: 1px solid ${(props) => props.theme.lightGrey};
  } */

  li {
    &:nth-child(2) {
      margin-top: 5px;
      font-weight: 600;
    }
  }
`

const Report = styled.li`
  cursor: pointer;
  background-color: ${(props) => props.theme.midGrey};
  padding: 10px 10px;
  border-radius: 6px;
  font-weight: 600;
`

const Donation = styled(Report)`
  background-color: ${(props) => props.theme.yellow};
`

const FreeBoard = ({ mountains }) => {
  const totalCount = mountains?.length
  const finishMountains = mountains?.filter((mountain) => mountain.finish)
  const finishCount = finishMountains?.length

  return (
    <InfoBoxS>
      <Board>
        <Item>
          <li>처리</li>
          <li>{finishCount ? finishCount : "..."}</li>
        </Item>
        <Item>
          <li>등록</li>
          <li>{totalCount ? totalCount : "..."}</li>
        </Item>
        <Item>
          <Report onClick={() => openNotice()}>공지</Report>
        </Item>
        <Item>
          <Donation onClick={() => openDonation()}>후원</Donation>
        </Item>
      </Board>
    </InfoBoxS>
  )
}

export default FreeBoard
