import * as Yup from "yup"

export function initialValues(){
    return{
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted:false,
    }
}

export function validationSchem(){
    return Yup.object({
        firstname: Yup.string().required("Campo Obligatorio"),
        lastname: Yup.string().required("Campo Obligatorio"),
        email: Yup.string().required("El email no es valido").required("Campo Obligatorio"),
        password: Yup.string().required("Campo Obligatorio"),
        repeatPassword: Yup.string().required("Campo Obligatorio").oneOf([Yup.ref("password")],"Las contraseñas deben ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),
    })
}