import React from "react"
import { useState } from 'react';

import Input from "../Input/input";
import Button from "../Button/button";
import Flex from "../Flex/flex";
import useAuth from "../../hooks/useAuth";

const ControlPanel = ({handleAddNote}) => {
  const [note, setNote] = useState(null)
  const { logOut: handleLogOut } = useAuth()
  
  return (
    <Flex column h100 style={{background: "rgb(255, 228, 196)", padding: "10px"}}>
      <Flex column>
        <b>Add to list</b>
        <Input value={note} onChange={e => setNote(e.target.value)} />
        <Button disabled={!note?.length} onClick={() => handleAddNote(note)}>Add to list</Button>
      </Flex>
      <Button style={{marginTop: "auto"}} onClick={handleLogOut}>Log Out</Button>
    </Flex>
  )
}


export default ControlPanel;
