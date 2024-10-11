import React from "react"
import { useEffect, useState } from 'react';
import axios from 'axios';

import Flex from "../Flex/flex";

const GET_NOTES_ENDPOINT = `${process.env.REACT_APP_API_URL}/notes`

const NotesPanel = () => {
  const [notes, setNotes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getNotes = async () => {
      setError(null)
      setLoading(true)
      try {
        const res = await axios.get(GET_NOTES_ENDPOINT, { withCredentials: true })
        setNotes(res.data)
      } catch (e) {
        setError(`Loading notes error: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    getNotes()
  }, [])


  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Flex column gap="10px">
      {notes.map(note => (
        <div>{note.content}</div>
      ))}
    </Flex>
  )
}

export default NotesPanel
