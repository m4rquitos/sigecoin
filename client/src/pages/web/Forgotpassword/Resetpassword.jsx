import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/svg/logo_icon1.png'
import { useParams } from 'react-router-dom';



const Resetpassword = () => {
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  const { resetToken } = useParams();


    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( `http://localhost:3001/api/v1/resetpassword/${resetToken}`, {password})
        
        .then(result => {
            console.log(result);
            if(result.status === 200){
                console.log("Resetpassword Success");
                alert('Su contraseña se cambio correctamente, por favor iniciar sesión.')
                navigate('/login');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => alert(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 " style= {{backgroundImage : "linear-gradient(rgb(3, 246, 226),rgb(5, 202, 241),rgb(11, 3, 242))" ,flexDirection: "column"}}>
            <img src={Logo} alt="" style={{width : '25%'}} />
                <div className="bg-white p-3 rounded" style={{width: "370px"}}>
                    <h2 className='mb-3 text-primary'>Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                       
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
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Resetpassword