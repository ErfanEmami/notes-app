import React, { useEffect } from 'react';

import { useAppContext } from '../../context/app_context';
import useAuth from "../../hooks/useAuth";
import Authenticate from "../Authenticate/authenticate";

const withAuth = (Component) => {
  return () => {
  const { user } = useAppContext() 
  const { checkAuthStatus } = useAuth()

    useEffect(() => {
      checkAuthStatus()
    }, [])

    return (
      user
       ?  <Component />       
       :  <Authenticate />
    )
  };
};

export default withAuth;
