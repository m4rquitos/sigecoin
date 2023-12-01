// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import "./Auth.scss"
import Login from "../../web/Login/Login"

function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  const openLogin = () => setActiveIndex(0)
  

  return (
    <Login />
  )
}
export default Auth;
