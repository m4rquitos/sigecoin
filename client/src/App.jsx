// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import {BrowserRouter} from "react-router-dom"
import {WebRouter, AdminRouter} from "./router"
import { AuthProvider } from './contexts';

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
