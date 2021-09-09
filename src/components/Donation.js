import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { closeDonation } from "../apollo"
import PopupClose from "./Button/PopupClose"

const BlackBack = styled.div`
  position: absolute;
  z-index: 10100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.theme.windowWidth};
  height: ${(props) => props.theme.windowHeight};
  background-color: black;
  opacity: 50%;
`

const CustomPopup = styled.div`
  position: absolute;
  z-index: 10100;
  width: ${(props) => props.popWidth};
  height: ${(props) => props.popHeight};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  left: ${(props) => props.popLeft};
  top: ${(props) => props.popTop};
`

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 20px;
  width: 100%;
  padding: 20px;
`

const DonationA = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border: 1px solid rgb(232, 232, 232);
  margin-top: 10px;
  background-color: ${(props) => props.theme.yellow};

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`
const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`
const RedP = styled.p`
  color: ${(props) => props.theme.lightRed};
`

const popWidth = 320
const popHeight = 200
const popTop = window.innerHeight / 2 - popWidth / 2 + 45
const popLeft = window.innerWidth / 2 - popWidth / 2
const DonationURL = "https://toon.at/donate/637659719549166046"

function Donation() {
  return (
    <>
      <BlackBack />
      <CustomPopup
        popWidth={`${popWidth}px`}
        popHeight={`${popHeight}px`}
        popTop={`${popTop}px`}
        popLeft={`${popLeft}px`}
      >
        <PBody>
          <PopupClose onClick={() => closeDonation()} custom={true} />
          <Title>K-트래쉬맵 후원하기</Title>
          <p>지원해주신 후원금은 소중히 사용하겠습니다</p>
          <RedP>
            (금액 충전 후 후원하기를 다시 한번 눌러주셔야 됩니다. 이것 때문에 충전만 하고 후원되지
            않는 경우가 다수 발생하고 있습니다.)
          </RedP>
          <DonationA href={DonationURL} target="_blank">
            <FontAwesomeIcon icon={faCoffee} size="lg" />
            <span>커피 한 잔 선물하기</span>
          </DonationA>
        </PBody>
      </CustomPopup>
    </>
  )
}

export default Donation
