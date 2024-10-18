import React from "react"
import Flex from "../Flex/flex"
import Button from "../Button/button"

const Note = ({note, onDelete, onComplete}) => {
  return (
    <Flex w100 style={{justifyContent: "space-between"}}>
      <div style={{textDecoration: note.complete && "line-through"}}>{note.content}</div>
      <Flex gap="10px">
        <Button disabled={note.complete} onClick={() => onComplete(note._id)}>COMPLETE</Button>
        <Button onClick={() => onDelete(note._id)}>DELETE</Button>
      </Flex>
    </Flex>
  )
}

export default Note