// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import "./Auth.scss"
import Login from "../../web/Login/Login"
import { Tab, Grid, GridColumn } from "semantic-ui-react"
import { iconLogo } from "../../../assets"
import {  RegisterForm } from "../../../components/Admin/Auth/RegisterForm"
import { LoginForm } from "../../../components/Admin/Auth"

function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  const openLogin = () => setActiveIndex(0)
  

  return (
    <Login />
  )
}
export default Auth;
