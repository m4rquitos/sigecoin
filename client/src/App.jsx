// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import {BrowserRouter} from "react-router-dom"
import {WebRouter, AdminRouter} from "./router"
import { setAppElement } from 'react-modal';

export default function App() {

  useEffect(() => {
    // Establecer el elemento raíz de la aplicación para react-modal
    setAppElement('#root');
  }, []);

  return (
    <BrowserRouter>
    <WebRouter />
    <AdminRouter />
    </BrowserRouter>
  )
}
