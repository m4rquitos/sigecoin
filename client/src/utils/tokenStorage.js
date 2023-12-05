document.addEventListener('DOMContentLoaded', function() {
    //Obtener el token almacenado en localStorage
    const storedToken = localStorage.getItem('miTokenDeSesion');
  
    // Verificar si hay un token almacenado
    if (storedToken) {
      //El usuario tiene una sesión iniciada
      console.log("Usuario autenticado con el token:", storedToken);
     
    } else {
      //El usuario no tiene sesión iniciada
      console.log("Usuario no autenticado");
      // al usuario a la página de inicio de sesión
    }
  });
  

  
const token = "tu_token_generado"; 
//Reemplaza con el token real

//Almacenar el token en localStorage
localStorage.setItem('miTokenDeSesion', token);

//enviar
// recibes la respuesta del backend
const responseData = {
    "access_token": "tu_access_token_aqui",
    "expires_in": 3600,
    // Otras propiedades...
  };
  
  // Almacenar el token en localStorage
  localStorage.setItem('access_token', responseData.access_token);
  

//solicitud

const accessToken = localStorage.getItem('access_token');

//  backend 
fetch('/api/ejemplo', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    
  },
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
