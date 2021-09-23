import React from "react"
import styled from "styled-components"

const Preview = styled.a`
  /* min-width: 300px; */
  cursor: pointer;
  overflow: hidden;
  border: 2px solid rgb(232, 232, 232);
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px 0px;
  border-radius: 20px;
  margin-bottom: ${(props) => props.marginBottom};

  @media screen and (min-width: 600px) {
    width: 485px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
const PreImage = styled.img`
  width: 100%;
`
const PreContent = styled.ul`
  padding: 10px 20px;
  li {
    :first-child {
      font-size: 18px;
      margin-bottom: 10px;
    }
    :last-child {
      color: ${(props) => props.theme.darkGrey};
    }
  }
`

function PreArticle({ article, marginBottom }) {
  let newTitle = ""
  let newDescription = ""

  if (article?.ogPreview.title.includes("�")) {
    newTitle = "클릭 시 해당 기사로 이동"
    newDescription = "내용 불러오기 실패..."
  } else {
    newTitle = article?.ogPreview?.title
    newDescription = article?.ogPreview?.description
  }

  return (
    <Preview href={article?.url} target="_blank" marginBottom={marginBottom}>
      <PreImage src={article?.ogPreview?.image} />
      <PreContent>
        <li>{newTitle}</li>
        <li>{newDescription}</li>
      </PreContent>
    </Preview>
  )
}

export default PreArticle
