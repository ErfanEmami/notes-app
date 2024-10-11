import React from "react"

import styles from "./input.module.css"

const Input = ({children, ...props}) => (
  <input {...props}>
    {children}
  </input>
)

export default Input