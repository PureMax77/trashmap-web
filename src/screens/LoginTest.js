import React from "react"
import styled from "styled-components"
import { gql, useMutation } from "@apollo/client"
import KaKaoLogin from "react-kakao-login"

const KaKaoLogin_Mutation = gql`
  mutation kakaoLogin($token: String!) {
    kakaoLogin(token: $token) {
      ok
      token
      error
    }
  }
`

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`

const LoginTest = () => {
  const onCompleted = (data) => {
    const {
      kakaoLogin: { ok },
    } = data
    console.log(ok)
  }

  const [kakaoLogin, { loading }] = useMutation(KaKaoLogin_Mutation, {
    onCompleted,
  })

  const KakaoSuccess = async (res) => {
    console.log("aa", res.response.access_token)
    kakaoLogin({ variables: { token: res.response.access_token } })
  }

  const KakaoFail = (error) => {
    alert(error)
  }

  return (
    <div>
      <KaKaoBtn
        token={"c5cb4dbc53e0cf6e9417e210c6cd2316"}
        buttonText={"카카오 계정으로 로그인"}
        onSuccess={KakaoSuccess}
        onFail={KakaoFail}
        getProfile={true}
      />
    </div>
  )
}

export default LoginTest
