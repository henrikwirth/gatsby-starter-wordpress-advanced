import React from "react"
import { CreateLocalLink } from "../utils"
import { Link } from "gatsby"

const MenuItem = ({ menuItem, wordPressUrl }) => {
  return (
    <Link style={{marginRight: '20px' }} to={CreateLocalLink(menuItem, wordPressUrl)}>{menuItem.label}</Link>
  )
}

export default MenuItem
