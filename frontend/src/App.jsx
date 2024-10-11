import React from "react"
import { useEffect, useState } from 'react';
import axios from 'axios';

import Flex from './components/Flex/flex';
import Authenticate from './components/Authenticate/authenticate';
import Page from './components/Page/page';
import Header from './components/Header/header';
import ControlPanel from "./components/ControlPanel/control_panel";
import SpinnerOverlay from "./components/SpinnerOverlay/spinner_overlay"
import NotesPanel from "./components/NotesPanel/ notes_panel";
import { AppContextProvider, useAppContext } from "./context/app_context";

import styles from "./App.modules.css"

const GET_AUTH_STATUS_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/check-auth`

const AppContent = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const { 
    loading: context_loading, error: context_error,
    authenticated, setAuthenticated, 
  } = useAppContext()

  useEffect(() => {
    const getAuthStatus = async () => {
      setError(null)
      setLoading(true)
      try {
        const res = await axios.get(GET_AUTH_STATUS_ENDPOINT, { withCredentials: true })
        console.log("getAuthStatus", res);
        setAuthenticated(res.data.authenticated)
      } catch (e) {
        setError(`getAuthStatus error: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    getAuthStatus()
  }, [])

  if (loading || context_loading) {
    return (
      <SpinnerOverlay />
    )
  }
  
  if (error || context_error) {
    return (
      <div>{error || context_error}</div>
    ) 
  } 

  if (authenticated) {
    return (
      <Page>
        <Header todo_count={2} todo_done={2}/>
        <Flex h100>
          <Flex column style={{flex: "2", borderRight: "1px solid black"}}>
            <NotesPanel/>
          </Flex>
          <Flex column style={{flex: "1"}}>
            <ControlPanel/>
          </Flex>
        </Flex>
      </Page>
    )
  } 

  return (
    <Authenticate />
  )
}

const App = () => (
  <AppContextProvider>
    <AppContent />
  </AppContextProvider>  
)


export default App;
