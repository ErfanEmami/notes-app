import { useAppContext } from "../context/app_context";
import useRequest from "./useRequest";

const GET_AUTH_STATUS_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/check-auth`
const LOGOUT_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/logout`;
const REGISTER_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/register`
const LOGIN_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/login`

const useAuth = () => {
  const { setAuthenticated } = useAppContext() 
  const { makePostRequest, makeGetRequest } = useRequest()

  const checkAuthStatus = async () => {
    const res = await makeGetRequest(GET_AUTH_STATUS_ENDPOINT)
    if (res.status === 200) setAuthenticated(res.data.authenticated) 
  }

  const register = async (username, password) => {
    const res = await makePostRequest(REGISTER_ENDPOINT, { username, password })
    if (res.status === 200) setAuthenticated(true) 
  }

  const login = async (username, password) => {
    const res = await makePostRequest(LOGIN_ENDPOINT, { username, password })
    if (res.status === 200) setAuthenticated(true) 
  }

  const logOut = async () => {
    const res = await makePostRequest(LOGOUT_ENDPOINT, {})
    if(res.status === 200) setAuthenticated(false)
  }

  return {
    checkAuthStatus,
    register,
    login,
    logOut,
  }
}

export default useAuth