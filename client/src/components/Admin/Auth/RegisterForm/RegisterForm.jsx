// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { initialValues } from './RegisterForm.form'
import "./RegisterForm.scss"

export function RegisterForm() {
    const [error, setError] = useState("Ha ocurrido un error")

    const formik = useFormik({
        initialValues: initialValues(),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue)
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Input name="email" placeholder="Correo Electronico" onChange={formik.handleChange} value={formik.values.email} />
      <Form.Input name="password" type='password' placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} />
      <Form.Input name="repeatPassword" type='password' placeholder="Repite la Contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} />
      <Form.Checkbox name='conditionsAccepted' label="He leido y aceptado las politicas de privacidad." onChange={ (_, data) => formik.setFieldValue("conditionsAccepted", data.checked)} checked={ formik.values.conditionsAccepted } />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting }>Crear Cuenta</Form.Button>

      <p className='register-form__error'>{error}</p>
    </form>
  )
}
