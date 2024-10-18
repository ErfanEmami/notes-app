import React, { useMemo } from "react"

import Flex from "../Flex/flex"
import { useAppContext } from '../../context/app_context';

const Header = ({ notes }) => {
  const { user } = useAppContext()

  // Memoize the calculation of completed_notes
  const completed_notes = useMemo(() => {
    return notes.filter(o => o.complete);
  }, [notes]); // only recalculate when notes change
  
  return (
    <Flex vcenter end style={{justifyContent: "space-between", padding: "20px", background: "rgb(255, 228, 196)", borderBottom: "1px solid black"}}>
      <div>{user.username}</div>
      <div>
        <span><b>{completed_notes.length} </b></span>
        <span>/</span>
        <span> {notes.length} todos completed</span>
      </div>
    </Flex>
  )
}

export default Header