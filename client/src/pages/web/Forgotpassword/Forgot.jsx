import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Logo from '../../../assets/svg/logo_icon1.png'


const Forgot = () => {
    const [email, setEmail] = useState();
   
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/api/v1/forgot', {email})
        .then(result => {
            console.log(result);
            if(result.status === 200){
                alert('La solicitud del restablecimiento de contraseña ha sido enviada a tu correo ')
               
            }
            else if (result.status === 500){
                alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.')
               
            }
        })
        .catch(err => alert(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 " style= {{backgroundImage : "linear-gradient(rgb(3, 246, 226),rgb(5, 202, 241),rgb(11, 3, 242))" ,flexDirection: "column"}}>
            <img src={Logo} alt="" style={{width : '25%'}} />
                <div className="bg-white p-3 rounded" style={{width: "450px"}}>
                    <h2 className='mb-3 text-primary'>Recuperar Contraseña</h2>
                    <form onSubmit={handleSubmit}>
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
                        
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>¿No tienes una cuenta?</p>
                    <Link to='/' className="btn btn-secondary">Registrar</Link>
                </div>
            </div>
        </div>
    )
}

export default Forgot