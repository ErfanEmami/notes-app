import React from "react"

import Flex from "../Flex/flex";

const NotesPanel = ({notes}) => {
  return (
    <Flex column gap="10px">
      {notes?.map(note => (
        <div>{note.content}</div>
      ))}
    </Flex>
  )
}

export default NotesPanel
