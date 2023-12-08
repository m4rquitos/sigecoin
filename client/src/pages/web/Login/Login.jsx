import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/svg/logo_icon1.png'


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/api/v1/auth/login/', {email, password})
        .then(result => {
            console.log(result);
            if(result.status === 200){
                alert('Inicio de sesión exitoso!')
                navigate('/home');
            }
            else{
                alert('¡Contraseña incorrecta! Inténtalo de nuevo.');
            }
        })
        .catch(err => console.log(err));
    }

    const refreshAccessToken = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken)
        axios.post('http://localhost:3001/api/v1/auth/refresh', { token: refreshToken })
            .then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                
                handleSubmit();
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    console.log("Error al actualizar el token. Reintentando");
                    refreshAccessToken();
                } 
            })
            
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    localStorage.setItem('accessToken', result.data.access);
                    localStorage.setItem('refreshToken', result.data.refresh);
                    console.log("Login Success");
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert('Incorrect password! Please try again.');
                }
            })
            
    }
    refreshAccessToken()


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 " style= {{backgroundImage : "linear-gradient(rgb(3, 246, 226),rgb(5, 202, 241),rgb(11, 3, 242))" ,flexDirection: "column"}}>
            <img src={Logo} alt="" style={{width : '15%'}} />
                <div className="bg-white p-3 rounded" style={{width: "370px"}}>
                    <h2 className='mb-3 text-primary'>Ingresar</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Correo Electrónico</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Introduzca su correo electrónico"
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
                                placeholder="Introduzca su contraseña"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        <a href="/forgot" target="_blank" rel="noopener noreferrer">¿Olvidaste tu contraseña?</a>

                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>¿No tienes una cuenta?</p>
                    <Link to='/' className="btn btn-secondary">Registrar</Link>
                </div>
            </div>
        </div>
    )
}

export default Login