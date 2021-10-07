import React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player/lazy"

const VideoWrap = styled.div`
  margin-bottom: ${(props) => props.marginBottom};

  @media screen and (min-width: 600px) {
    width: 485px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const videoStyle = {
  overflow: "hidden",
  border: "2px solid rgb(232, 232, 232)",
  boxShadow: "rgb(0 0 0 / 16%) 0px 3px 6px 0px",
  borderRadius: "20px",
}

function PreVideo({ video, marginBottom }) {
  return (
    <VideoWrap marginBottom={marginBottom}>
      <ReactPlayer
        width={"100%"}
        height={"270px"}
        controls={true}
        url={video?.url}
        style={videoStyle}
      />
    </VideoWrap>
  )
}

export default PreVideo
