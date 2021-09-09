import { gql, useMutation } from "@apollo/client"
// import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { logUserIn } from "../apollo"
import AuthLayout from "../components/auth/AuthLayout"
import BottomBox from "../components/auth/BottomBox"
import Button from "../components/auth/Button"
import FormBox from "../components/auth/FormBox"
import FormError from "../components/auth/FormError"
import Input from "../components/auth/Input"
// import Separator from "../components/auth/Separator"
import { Logo } from "../components/Icons"
import PageTitle from "../components/PageTitle"
import routes from "../routes"

// const FacebookLogin = styled.div`
//   color: #385285;
//   span {
//     margin-left: 10px;
//     font-weight: 600;
//   }
// `

const Notification = styled.div`
  color: #2ecc71;
`

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`

function Login() {
  const history = useHistory()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: location?.state?.email || "",
      password: location?.state?.password || "",
    },
  })
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data
    if (!ok) {
      return setError("result", {
        message: error,
      })
    }
    if (token) {
      logUserIn(token)
      history.push(routes.home)
    }
  }
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  })
  const onSubmitValid = () => {
    if (loading) {
      return
    }
    const { email, password } = getValues()
    login({
      variables: { email, password },
    })
  }
  const clearLoginError = () => {
    clearErrors("result")
  }
  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <Logo size={52} />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("email", {
              required: "Email은 필수항목입니다.",
            })}
            onChange={clearLoginError}
            type="email"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("비밀번호", {
              required: "비밀번호는 필수항목입니다.",
            })}
            onChange={clearLoginError}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value={loading ? "로딩중..." : "로그인"} disabled={loading} />
          <FormError message={errors?.result?.message} />
        </form>
        {/* <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin> */}
      </FormBox>
      <BottomBox cta="아직 계정이 없으신가요?" linkText="회원가입" link={routes.signUp} />
    </AuthLayout>
  )
}
export default Login
