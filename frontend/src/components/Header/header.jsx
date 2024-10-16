import React from "react"

import Flex from "../Flex/flex"
import { useAppContext } from '../../context/app_context';

const Header = ({ todo_count, todo_done }) => {
  const { setLoading, setError, error } = useAppContext()
  
  return (
    <Flex vcenter end style={{justifyContent: "space-between", padding: "20px", background: "rgb(255, 228, 196)", borderBottom: "1px solid black"}}>
      <div></div>
      <div>
        <span><b>{todo_done} </b></span>
        <span>/</span>
        <span> {todo_count} todos completed</span>
      </div>
    </Flex>
  )
}

export default Header