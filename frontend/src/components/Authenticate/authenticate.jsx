import { useEffect, useState } from 'react';
import axios from 'axios';
import Flex from '../Flex/flex';
import withRequest from '../HOCS/with_request';
import { useAppContext } from '../../context/app_context';

const REGISTER_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/register`
const LOGIN_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/login`

const Authenticate = ({makePostRequest}) => {
    const [register_username, setRegisterUsername] = useState(null)
    const [register_password, setRegisterPassword] = useState(null)
  
    const [login_username, setLoginUsername] = useState(null)
    const [login_password, setLoginPassword] = useState(null)

    const { setAuthenticated } = useAppContext()

    const handleRegister = async (e) => {
      e.preventDefault();
      const res = await makePostRequest(REGISTER_ENDPOINT, { username: register_username, password: register_password })
      if (res?.status === 200) setAuthenticated(true) 
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      const res = await makePostRequest(LOGIN_ENDPOINT, { username: login_username, password: login_password })
      if (res?.status === 200) setAuthenticated(true) 
    }
  
    return (
      <Flex column gap="20px">
        <form onSubmit={handleRegister}>
          <Flex column gap="10px">
            <input 
              placeholder="username"
              value={register_username}
              onChange={e => setRegisterUsername(e.target.value)}
            />
            <input 
              placeholder="password"
              value={register_password}
              onChange={e => setRegisterPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </Flex>
        </form>

        <form onSubmit={handleLogin}>
          <Flex column gap="10px">
            <input 
              placeholder="username"
              value={login_username}
              onChange={e => setLoginUsername(e.target.value)}
            />
            <input 
              placeholder="password"
              value={login_password}
              onChange={e => setLoginPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
          </Flex>
        </form>
      </Flex>
    )
  }

  export default withRequest(Authenticate)