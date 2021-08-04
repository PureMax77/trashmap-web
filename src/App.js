import { ApolloProvider, useReactiveVar } from "@apollo/client"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { client, darkModeVar } from "./apollo"
import Layout from "./components/Layout"
import routes from "./routes"
import Home from "./screens/Home"
import { darkTheme, GlobalStyles, lightTheme } from "./styles"

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              <Layout>
                <Home />
              </Layout>
            </Route>
            <Route path={routes.test}>
              <Home />
            </Route>
            <Route>
              <Redirect to={routes.home} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
