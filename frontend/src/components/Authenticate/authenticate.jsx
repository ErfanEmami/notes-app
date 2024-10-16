import { useState } from 'react';

import Flex from '../Flex/flex';
import useAuth from '../../hooks/useAuth';

const Authenticate = () => {
    const [register_username, setRegisterUsername] = useState(null)
    const [register_password, setRegisterPassword] = useState(null)
  
    const [login_username, setLoginUsername] = useState(null)
    const [login_password, setLoginPassword] = useState(null)

    const { register, login } = useAuth()

    const handleRegister = async (e) => {
      e.preventDefault();
      register(register_username, register_password)
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      login(login_username, login_password)
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

  export default Authenticate