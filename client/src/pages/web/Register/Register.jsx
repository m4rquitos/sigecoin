import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/svg/logo_icon1.png'



const Register = () => {
    const [firstname, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( `${import.meta.env.VITE_API_URL}/auth/register/`, {firstname, email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                alert("¡Correo electrónico ya registrado! Por favor inicie sesión para continuar.");
                navigate('/login');
            }
            else{
                alert("¡Registrado correctamente! Por favor inicie sesión para continuar.")
                navigate('/login');
            }
            
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(rgb(3, 246, 226),rgb(5, 202, 241),rgb(11, 3, 242))" ,flexDirection: "column"}}>
             <img src={Logo} alt="" style={{width: '15%'}} />
                <div className="bg-white p-3 rounded" style={{width: "370px"}}>
                    <h2 className='mb-3 text-primary'>Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Nombre</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Ingrese su nombre"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Correo Electrónico</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Ingrese correo electrónico"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Contraseña</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Introducir la contraseña"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Registrarse</button>
                    </form>

                    <p className='container my-2'>¿Ya tienes una cuenta?</p>
                    <Link to='/login' className="btn btn-secondary">Ingresar</Link>
                </div>
            </div>
        </div>
    )
}

export default Register