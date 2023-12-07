const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const image = require("../utils/image")
const Token = require("../models/token.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

async function getMe(req, res) {
    
    const { user_id } = req.user
    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({msg: "No se ha encontrado el usuario"})
    } else {
        res.status(200).send(response)
    }
}

async function getUsers(req, res){
    
    const { active } = req.query
    
    let response = null
    if (active === undefined){
        response = await User.find()
    } else {
        response = await User.find({ active })
    }
    
    res.status(200).send(response)
}

async function createUser(req, res) {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }

    try {
        const userStored = await user.save();
        res.status(201).send(userStored);
    } catch (error) {
        res.status(400).send({ msg: "Usuario o correo ya existente" });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body

    //password
    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else {
        delete userData.password
    }
    //Avatar
    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath
    }

    User.findByIdAndUpdate({ _id: id}, userData, (error) => {
        if(error) {
            res.status(400).send({msg: "Error al actualizar el usuario"})
        } else {
            res.status(200).send({msg: "Datos de usuario actualizados"})
        }
    })
}

async function deleteUser(req, res){
    const { id } = req.params

    User.findByIdAndDelete(id, (error => {
        if (error){
            res.status(400).send({msg: "Error al eliminar el usuario"})
        } else {
            res.status(200).send({msg: "Usuario Eliminado"})
        }
    }))
}

//Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(req.body.email);

  if (!user) {
    res.status(404);
    throw new Error("El usuario no existe");
  }

  // Delete Token if it exists on DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create token before save on db
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Save token on DB
  await new Token({
    userId: user._id,
    token: resetToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * (60 * 1000), // 10 minutes to expires
  }).save();

  // Construct URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;


  // Email body
  const message = `
  <div style="background-color: #F5F5F5; padding: 20px; border-radius: 10px; text-align: center; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333;">
    <h2 style="color: #007BFF;">Estimado, ${user.firstname}</h2>
    <p style="font-size: 16px; color: #666;">Recibimos una solicitud para restablecer la contraseña de tu cuenta. Para completar el proceso, haz clic en el siguiente enlace:</p>
    <p style="font-size: 16px; color: #666;">Si no solicitaste este cambio, por favor ignora este mensaje. Tu contraseña actual seguirá siendo válida.<br>
    Por razones de seguridad, este enlace expirará en 10 minutos. Si no completas el restablecimiento dentro de este tiempo, deberás iniciar el proceso nuevamente.</p>
    <a href="${resetUrl}" style="display: block; margin: 20px 0; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">${resetUrl}</a>
    <p style="font-size: 16px; color: #666;">Que tengas un lindo día...</p>
    <h3 style="color: #333;">SIGECOIN</h3>
  </div>
  `;

  const subject = "Solicitud de Restablecimiento de Contraseña";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    // Send Email 
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      success: true,
      message: "Mensaje enviado para restablecimiento.",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email no enviado, por favor inténtelo de nuevo.");
  }
});


//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    const { resetToken } = req.params;

    // Buscar el token en la base de datos
    const userToken = await Token.findOne({
      token: resetToken,
      expiresAt: { $gt: Date.now() }, // Verificar si el token aún no ha expirado
    });

    if (!userToken) {
      res.status(404);
      throw new Error("Token inválido o expirado");
    }

    // Encontrar al usuario asociado con el token
    const user = await User.findById(userToken.userId);

    if (!user) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    // Validar la nueva contraseña (por ejemplo, longitud mínima, complejidad, etc.)
    if (!password || password.length < 6) {
      res.status(400);
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    // Encriptar la nueva contraseña antes de guardarla
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Guardar la contraseña encriptada en el usuario
    user.password = hashedPassword;

    // Guardar el usuario actualizado en la base de datos
    await user.save();

    // Eliminar el token usado
    await userToken.deleteOne();

    // Respuesta de éxito
    res.status(200).json({
      message: "Contraseña cambiada exitosamente. Puedes iniciar sesión con tu nueva contraseña.",
    });
  } catch (error) {
    console.error("Error durante el restablecimiento de contraseña:", error);
    res.status(500).json({
      message: "Error al cambiar la contraseña. Por favor, inténtalo de nuevo.",
    });
  }
});

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword,
}