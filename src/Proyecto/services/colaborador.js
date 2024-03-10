const Colaborador = require('../model/colaborador')

function getAllColaboradores(){
    return Colaborador.findAll()
}

function createColaborador(object){
    const colborador = Colaborador.build(object)
    colborador.save()
    return colborador
}

module.exports = {
    getAllColaboradores,
    createColaborador
}