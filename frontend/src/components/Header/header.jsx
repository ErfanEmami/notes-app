import React from "react"
import Flex from "../Flex/flex"

const Header = ({ todo_count, todo_done }) => (
  <Flex vcenter end style={{padding: "20px", background: "rgb(255, 228, 196)", borderBottom: "1px solid black"}}>
    <div>
      <span><b>{todo_done} </b></span>
      <span>/</span>
      <span> {todo_count} todos completed</span>
    </div>
  </Flex>
)

export default Header