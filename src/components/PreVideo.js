import React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player/lazy"

const Video = styled(ReactPlayer)`
  overflow: hidden;
  border: 2px solid rgb(232, 232, 232);
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border-radius: 20px;
`
const VideoWrap = styled.div`
  margin-bottom: ${(props) => props.marginBottom};

  @media screen and (min-width: 600px) {
    width: 485px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

function PreVideo({ video, marginBottom }) {
  return (
    <VideoWrap marginBottom={marginBottom}>
      <Video width={"100%"} height={"270px"} controls={true} url={video?.url} />
    </VideoWrap>
  )
}

export default PreVideo
