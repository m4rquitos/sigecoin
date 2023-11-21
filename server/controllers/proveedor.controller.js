const Proveedor = require("../models/proveedor.model")

 function register(req, res) {
    const { firstname, lastname, email, empresa, direccion, telefono, nit } = req.body
    console.log(req.body);

    if (!email) res.status(400).send({msg: "El email es Obligatorio"})
    if(!firstname || !lastname) res.status(400).send({msg:"Los nombres son obligatorios"})
    if(!empresa) res.status(400).send({msg:"La empresa es obligatoria"})
    if(!direccion) res.status(400).send({msg:"La dirección de la empresa es obligatoria"})
    if(!telefono) res.status(400).send({msg:"El teléfono es obligatorio"})
    if(!nit) res.status(400).send({msg:"El NIT es obligatorio"})


    const proveedor = new Proveedor({
        firstname,
        lastname,
        email: email.toLowerCase(),
        empresa,
        direccion,
        telefono,
        nit,
    })

    proveedor.save((error, proveedorStorage) => {
        if(error) {
            res.status(400).send({ msg: "Error al crear el proveedor"})
        } else {
            res.status(200).send(proveedorStorage)
        }
    })
    }

    async function updateProveedor(req, res) {
        const { id } = req.params
        const proveedorData = req.body

        Proveedor.findByIdAndUpdate({ _id: id}, proveedorData, (error) => {
            if(error){
                res.status(400).send({msg: "Error al actualizar el proveedor"})
            } else {
                res.status(200).send({msg: "Actualizado correctamente"})
            }
        })
    }

    async function deleteProveedor(req, res){
        const { id } = req.params

        Proveedor.findByIdAndDelete(id, (error) => {
            if(error){
                res.status(400).send({msg: "Error al eliminar el proveedor"})
            } else {
                res.status(200).send({msg: "Se elimino correctamente"})
            }
        })

    }

    module.exports = {
        register,
        deleteProveedor,
        updateProveedor,
    }