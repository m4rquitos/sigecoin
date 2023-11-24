import React from 'react'
import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { initialValues, validationSchema } from './LoginForm.form'

export function LoginForm() {
    return (
        <Form>
            <Form.Input name="email" placeholder="Correo Electronico" />
            <Form.Input name="password" placeholder="Contraseña" />
            <Form.Button type="submit" primary fluid >Entrar</Form.Button>
        </Form>
    )
}