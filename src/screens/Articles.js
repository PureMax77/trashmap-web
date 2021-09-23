import React from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import PreArticle from "../components/PreArticle"
import Loading from "../components/Loading"
import Button_more from "../components/Button/Button_more"

const Articles_QUERY = gql`
  query seeArticles($offset: Int!) {
    seeArticles(offset: $offset) {
      id
      url
      tMountain {
        id
      }
      ogPreview {
        title
        image
        description
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

function Articles() {
  const { data, fetchMore, networkStatus } = useQuery(Articles_QUERY, {
    variables: { offset: 0 },
    notifyOnNetworkStatusChange: true,
  })

  const MoreFeed = () => {
    fetchMore({ variables: { offset: data?.seeArticles?.length } })
  }

  return (
    <Wrapper minHeight={`${window.innerHeight - 100}px`}>
      {data?.seeArticles?.map((article, index) => (
        <PreArticle key={index} article={article} marginBottom={"20px"} />
      ))}
      {networkStatus === 1 ? (
        <Loading />
      ) : (
        <Button_more text={"더보기"} onClick={MoreFeed} loading={networkStatus === 3} />
      )}
    </Wrapper>
  )
}

export default Articles
