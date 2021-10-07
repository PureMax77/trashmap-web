// import { useReactiveVar } from "@apollo/client"
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import styled from "styled-components"
// import { isLoggedInVar } from "../apollo"
// import useUser from "../hooks/useUser"
import routes from "../routes"
// import Avatar from "./Avatar"
import { Logo } from "./Icons"

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
`

const Wrapper = styled.div`
  /* max-width: 930px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MarkLink = styled(Link)`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 1.2em;
    font-weight: 900;
  }
`

const Column = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 1.2em;
    font-weight: 900;
  }
`
const Icon = styled.span`
  margin-left: 15px;
`

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`

const ItemWrap = styled(Link)`
  div {
    @media screen and (min-width: 600px) {
      :first-child {
        display: none;
      }
    }
    @media screen and (max-width: 600px) {
      :nth-child(2) {
        display: none;
      }
    }
  }
`

function Header() {
  // const isLoggedIn = useReactiveVar(isLoggedInVar)
  // const { data } = useUser()
  return (
    <SHeader>
      <Wrapper>
        <MarkLink to="/">
          <Logo />
          <span>K-트래쉬맵</span>
        </MarkLink>
        <Column>
          {/* {isLoggedIn ? ( */}
          <IconsContainer>
            <Icon>
              <ItemWrap to={routes.videos}>
                <div>
                  <FontAwesomeIcon icon={faVideo} size="lg" />
                </div>
                <div>영상</div>
              </ItemWrap>
            </Icon>
            <Icon>
              <ItemWrap to={routes.articles}>
                <div>
                  <FontAwesomeIcon icon={faNewspaper} size="lg" />
                </div>
                <div>신문기사</div>
              </ItemWrap>
            </Icon>
            {/* <Icon>
              <Link to={`/users/${data?.me?.username}`}>
                <Avatar url={data?.me?.avatar} />
              </Link>
            </Icon> */}
          </IconsContainer>
          {/*  ) : (
             <Link to={routes.login}>
               <Button>로그인</Button>
             </Link>
           )} */}
        </Column>
      </Wrapper>
    </SHeader>
  )
}
export default Header
