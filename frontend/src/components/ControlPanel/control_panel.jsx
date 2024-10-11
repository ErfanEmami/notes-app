import React from "react"
import { useState } from 'react';


import Input from "../Input/input";
import Button from "../Button/button";
import Flex from "../Flex/flex";
import withRequest from "../HOCS/with_request";
import { useAppContext } from '../../context/app_context';

const ADD_NOTE_ENDPOINT = `${process.env.REACT_APP_API_URL}/notes`
const LOGOUT_ENDPOINT = `${process.env.REACT_APP_API_URL}/auth/logout`

const ControlPanel = ({ makePostRequest }) => {
  const [note, setNote] = useState(null)

  const { setAuthenticated } = useAppContext()

  const handleAddToList = () => {
    makePostRequest(ADD_NOTE_ENDPOINT, {content: note})
  }

  const handleLogOut = async () => {
    const res = await makePostRequest(LOGOUT_ENDPOINT, {})
    if(res.status === 200) setAuthenticated(false)
  }

  return (
    <Flex column h100 style={{background: "rgb(255, 228, 196)", padding: "10px"}}>
      <Flex column>
        <b>Add to list</b>
        <Input value={note} onChange={e => setNote(e.target.value)} />
        <Button disabled={!note?.length} onClick={handleAddToList}>Add to list</Button>
      </Flex>
      <Button style={{marginTop: "auto"}} onClick={handleLogOut}>Log Out</Button>
    </Flex>
  )
}


export default withRequest(ControlPanel);
