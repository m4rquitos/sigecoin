import Factura from '../models/factura.model.js'

async function createFactura(req, res){
    const factura = new Factura(req.body)
createFactura
    factura.save((error, facturaStored) => {
        if(error) {
            res.status(400).send({msg: "Error al crear ls Factura"})
        } else {
            res.status(200).send(facturaStored)
        }
    })
}

module.exports = {
    createFactura,
}