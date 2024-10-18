import React from "react"

import Flex from "../Flex/flex";
import Note from "../Note/note";

const NotesPanel = ({notes, handleDeleteNote, handleCompleteNote}) => {
  return (
    <Flex column gap="10px">
      {notes?.map(note => (
        <Note 
          key={note._id}
          note={note}
          onDelete={handleDeleteNote}
          onComplete={handleCompleteNote}
        />
      ))}
    </Flex>
  )
}

export default NotesPanel
