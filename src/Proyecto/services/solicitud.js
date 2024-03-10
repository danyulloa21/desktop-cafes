const solicitudes = require('../model/solicitud')
const { getSolicitanteById } = require('../services/solicitante')

async function getAllSolicitudes(){
    let resultado = (await solicitudes.findAll()).map((item) => item.toJSON())

    for(let i = 0; i < resultado.length; i++){
        let solicitante = (await getSolicitanteById(resultado[i].id_solicitante)).toJSON()
        resultado[i].nombre_solicitante = `${solicitante.nombres} ${solicitante.apellido_paterno} ${solicitante.apellido_materno}`
        console.log(resultado[i])
    }

    return resultado
}


function createSolicitud(object){
    const newSolicitud = solicitudes.build(object)
    newSolicitud.save()
    return newSolicitud
}

async function acceptOrRejectSolicitud(idSolicitud, estado){
    if (estado == 'Espera') return  
    const solicitud = await solicitudes.findByPk(idSolicitud)
    solicitud.setDataValue('estado', estado)
    solicitud.save()
    return solicitud
}

module.exports = {
    getAllSolicitudes,
    createSolicitud,
    acceptOrRejectSolicitud
}
