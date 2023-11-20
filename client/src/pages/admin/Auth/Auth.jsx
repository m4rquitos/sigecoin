// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Tab, Grid, GridColumn } from "semantic-ui-react";
import { iconLogo } from "../../../assets";
import "./Auth.scss";
import { RegisterForm } from "../../../components/Admin/Auth/RegisterForm";

function Auth() {
  const [activeIndex, setActiveIndex] = useState(1);
  const openLogin = () => setActiveIndex(0);
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <h2>Login Form</h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Nuevo Usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Grid columns={1}>
      <GridColumn mobile={16} tablet={16} computer={16}>
        <div className="auth">
          <img src={iconLogo} className="logo" />
          <Tab panes={panes} className="auth__forms" activeIndex={activeIndex}  onTabChange={(_, data) => setActiveIndex(data.activeIndex)} />
        </div>
      </GridColumn>
    </Grid>
  );
}
export default Auth;
