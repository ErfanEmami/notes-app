import React from "react"
import styles from "./page.module.css" 
import Flex from "../Flex/flex"

const Page = ({children, ...props}) => (
    <Flex column className={styles.container} {...props}>{children}</Flex>
)

export default Page