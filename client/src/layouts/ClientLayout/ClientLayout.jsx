// eslint-disable-next-line no-unused-vars
import React from 'react'

export function ClientLayout(props) {
    // eslint-disable-next-line react/prop-types
    const { children} = props
  return (
    <div>
      <h2 style={{textAlign: "center", padding: "1em 0"}}>Ingresar Calzado</h2>
      {children}
    </div>
  )
}
    