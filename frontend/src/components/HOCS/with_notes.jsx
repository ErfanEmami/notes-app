import React, { useEffect, useState } from 'react';

import useRequest from '../../hooks/useRequest';

const GET_NOTES_ENDPOINT = `${process.env.REACT_APP_API_URL}/notes`
const ADD_NOTE_ENDPOINT = `${process.env.REACT_APP_API_URL}/notes`

const withNotes = (Component) => {
  return (props) => {
    const [notes, setNotes] = useState(null)
    const { makeGetRequest, makePostRequest } = useRequest()

    useEffect(() => {
      handleGetNotes()
    }, [])

    const handleGetNotes = async () => {
      const res = await makeGetRequest(GET_NOTES_ENDPOINT)
      if(res.status === 200) setNotes(res.data)
    }

    const handleAddNote = async (note) => {
      const res = await makePostRequest(ADD_NOTE_ENDPOINT, { content: note })
      if(res.status === 200) setNotes(res.data)
    }

    return (
      <Component
        {...props}
        notes={notes}
        handleAddNote={handleAddNote}
      />
    ) 
  };
};

export default withNotes;
