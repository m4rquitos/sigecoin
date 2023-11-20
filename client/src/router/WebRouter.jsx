// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "../pages/web/Home/index"
import { ClientLayout } from '../layouts/ClientLayout/ClientLayout'
import { Blog, Contact, Courses, Post} from "../pages/web"

export function WebRouter() {

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
      <Route path="/contact" element={loadLayout(ClientLayout, Contact)} />
      <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/blog/:path" element={ loadLayout(ClientLayout, Post)} />
    </Routes>
  )
}

