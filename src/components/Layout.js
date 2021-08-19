import styled from "styled-components"
import Header from "./Header"

const Content = styled.main`
  margin: 0;
  /* max-width: 930px; */
`

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  )
}

export default Layout
