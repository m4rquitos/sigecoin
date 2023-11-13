const Factura = require('../models/factura.model.js');

async function createFactura(req, res){
    const factura = new Factura(req.body) 
    
    factura.save((error, facturaStored) => {
        if(error) {
            res.status(400).send({msg: "Error al crear la Factura"})
        } else {
            res.status(200).send(facturaStored)
        }
    })
}

async function updateFactura(req, res) {
    const { id } = req.params;
    const facturaData = req.body

    Factura.findByIdAndUpdate({_id: id}, facturaData, (error) => {
        if(error) {
            res.status(400).send({msg: "Error al actualizar la factura"})
        } else {
            res.status(200).send({msg: "La factura ha sido actualizada correctamente"})
        }
    })

}

async function getFacturas(req, res) {
    const { active } = req.query

    let response = null

    if (active === undefined){
        response = await Factura.find().sort({ order: "asc"})
    } else {
        response = await Factura.find({active}).sort({ order: "asc"})
    }

    if(!response) {
        res.status(400).send({msg: "No se haencontrado ninguna factura"})
    } else {
        res.status(200).send({response})
    }
}

async function deleteFactura(req, res){

    const { id } = req.params

    Factura.findByIdAndDelete(id, (error) => {
        if(error) {
            res.status(400).send({msg: "Error al eliminar la factura"})
        } else {
            res.status(200).send({msg: "La factura ha sido eliminada exitosamente"})
        }
    })
}

module.exports = {
    createFactura,
    updateFactura,
    getFacturas,
    deleteFactura,
}