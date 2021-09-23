import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMountain } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Button_accent from "../components/Button/Button_accent"
import PageTitle from "../components/PageTitle"
import { FatText } from "../components/shared"
import InfoDiv from "../components/TMountain/InfoDiv"
import PreArticle from "../components/PreArticle"

const TMount_QUERY = gql`
  query seeTMountain($id: Int!) {
    seeTMountain(id: $id) {
      id
      latitude
      longtitude
      address
      amount
      image
      finish
      cleanCost
      dumpType
      article {
        id
        url
        ogPreview {
          title
          image
          description
        }
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  /* @media screen and (max-width: 1230px) {
    flex-direction: column;
  }
  @media screen and (min-width: 1230px) {
    flex-direction: row;
  } */
`
const Avatar = styled.img`
  height: auto;
  width: auto;
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  border-radius: 10px;
  background-color: #2c2c2c;
  margin-bottom: 30px;
`
const Bio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.lightGrey};
  width: 100%;
  padding: 50px;
  margin-bottom: 30px;
`

const Article = styled(Bio)`
  background-color: ${(props) => props.theme.bgColor};
  @media screen and (max-width: 768px) {
    align-items: flex-start;
  }
  /* @media screen and (min-width: 420px) {
    left: 10px;
  } */
`

const InforTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 50px;
  div {
    font-size: 18px;
    font-weight: 900;
    height: 28px;
    display: flex;
    align-items: center;
    /* margin-left: 10px; */
  }
`

const NonData = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.lightRed};
  width: 100%;
  text-align: start;
`

const defaultImg =
  "https://trashmap-fold.s3.ap-northeast-2.amazonaws.com/TMountain-img/defaultMountain.jpg"

function TMountain() {
  const { id } = useParams()
  // const client = useApolloClient()
  const { data } = useQuery(TMount_QUERY, {
    variables: {
      id: Number(id),
    },
    notifyOnNetworkStatusChange: true,
  })

  // console.log(data?.seeTMountain)

  return (
    <Wrapper>
      {/* <PageTitle title={loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`} /> */}
      <Header>
        <Avatar
          src={data?.seeTMountain?.image ? data?.seeTMountain?.image : defaultImg}
          maxWidth={`${window.innerWidth}px`}
          maxHeight={`${window.innerHeight / 2}px`}
        />
        <Bio>
          <InforTitle>
            <FontAwesomeIcon icon={faMountain} size="2x" color="#576574" />
            <div>쓰레기산 정보</div>
          </InforTitle>
          {data?.seeTMountain && <InfoDiv mountain={data?.seeTMountain} />}
        </Bio>
        <Article>
          <InforTitle>
            <div>관련 기사</div>
          </InforTitle>
          {data?.seeTMountain?.article[0] ? (
            <PreArticle article={data?.seeTMountain?.article[0]} />
          ) : (
            <NonData>미등록</NonData>
          )}
        </Article>
      </Header>
    </Wrapper>
  )
}

export default TMountain
