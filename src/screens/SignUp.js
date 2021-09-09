import { gql, useMutation } from "@apollo/client"
// import { faInstagram } from "@fortawesome/free-brands-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import AuthLayout from "../components/auth/AuthLayout"
import BottomBox from "../components/auth/BottomBox"
import Button from "../components/auth/Button"
import FormBox from "../components/auth/FormBox"
import Input from "../components/auth/Input"
import { Logo } from "../components/Icons"
import PageTitle from "../components/PageTitle"
import routes from "../routes"

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`

function SingUp() {
  const history = useHistory()
  const onCompleted = (data) => {
    const { email, password } = getValues()
    const {
      createAccount: { ok, error },
    } = data
    if (!ok) {
      alert(error)
      return
    }
    history.push(routes.login, {
      message: "계정이 생성되었습니다. 로그인을 해주세요.",
      email,
      password,
    })
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  })
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  })
  const onSubmitValid = (data) => {
    if (loading) {
      return
    }
    const { password, password2 } = data
    if (password !== password2) {
      alert("비밀번호를 다시 확인하세요.")
      return
    }
    createAccount({
      variables: {
        ...data,
      },
    })
  }

  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <Logo size={52} />
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("email", {
              required: "Email은 필수항목입니다.",
            })}
            type="email"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: "닉네임은 필수항목입니다.",
              minLength: {
                value: 2,
                message: "닉네임은 최소 2글자입니다.",
              },
            })}
            type="text"
            placeholder="닉네임 (2글자 이상)"
          />
          <Input
            {...register("password", {
              required: "비밀번호는 필수항목입니다.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6글자입니다.",
              },
            })}
            type="password"
            placeholder="비밀번호 (6개 이상)"
          />
          <Input
            {...register("password2", {
              required: "비밀번호 확인은 필수항목입니다.",
              minLength: {
                value: 6,
                message: "비밀번호 확인은 최소 6글자입니다.",
              },
            })}
            type="password"
            placeholder="비밀번호 확인"
          />
          <Button
            type="submit"
            value={loading ? "로딩중..." : "회원가입"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="이미 계정이 있으신가요?" linkText="로그인" link={routes.login} />
    </AuthLayout>
  )
}
export default SingUp
