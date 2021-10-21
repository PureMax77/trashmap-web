import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities"

const TOKEN = "TOKEN"
const DARK_MODE = "DARK_MODE"
export const headerHeight = 42

// 로그인 상태 변수
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
export const logUserOut = () => {
  localStorage.removeItem(TOKEN)
  window.location.reload()
}
// 다크모드 변수
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)))
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled")
  darkModeVar(true)
}
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE)
  darkModeVar(false)
}

// 공지 팝업 처음 화면 띄울지 판단
export const popNotice = "NOTICE"
let firstPopVar = true
const popNoticeTime = localStorage.getItem(popNotice)
if (popNoticeTime) {
  // 로컬에 NOTICE 데이터 있으면 기간 체크후 팝업 띄울지 결정
  const nowTime = new Date().getTime()
  const isEffect = nowTime - popNoticeTime < 604800000
  if (isEffect) {
    firstPopVar = false
  }
}
// 공지 팝업 일주일 안보기 Display 변수
export const checkDisplayVar = makeVar(true)
// 공지 팝업 변수
export const noticePopVar = makeVar(firstPopVar)
export const openNotice = () => {
  noticePopVar(true)
  checkDisplayVar(false)
}
export const closeNotice = () => {
  noticePopVar(false)
}

// 후원 팝업 변수
export const donationPopVar = makeVar(false)
export const openDonation = () => {
  donationPopVar(true)
}
export const closeDonation = () => {
  donationPopVar(false)
}

// Client
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URI,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
      Query: {
        fields: {
          seeArticles: offsetLimitPagination(),
          seeVideos: offsetLimitPagination(),
        },
      },
    },
  }),
})
