import styled, { keyframes } from "styled-components"

const Body = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border: 1px solid rgb(232, 232, 232);
  height: 35px;
  font-size: 18px;
  border-radius: 15px;
  margin-top: 10px;

  @media screen and (min-width: 600px) {
    width: 485px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.div`
  border: 3px solid #00ff0000; /* Light grey */
  border-top: 3px solid #555;
  border-bottom: 3px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`

const MoreButton = ({ text, onClick, loading = false }) => {
  return <Body onClick={onClick}>{loading ? <Loader /> : text}</Body>
}

export default MoreButton
