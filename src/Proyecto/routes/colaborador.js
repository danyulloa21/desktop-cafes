const { Router } = require('express')
const createHashPassword = require('../services/createHashPassword')
const { getAllColaboradores, createColaborador } = require('../services/colaborador')

const router = Router()


router.get('/colaboradores',async (req, res) => {
  let colaboradores = await getAllColaboradores()

  colaboradores = JSON.parse(JSON.stringify(colaboradores, null, 2))
  
  res.status(200).json(colaboradores)
})

router.post('/colaboradores',async (req, res) => {
  const newColaborador = req.body
  console.log(newColaborador)
  if (!isColaboradorCreationInterface(newColaborador))
      return res.status(400).json({error: "Wrong parsing for body"})


  newColaborador.estado = 'Activo'
  newColaborador.contrasena = createHashPassword(newColaborador.contrasena)

  let answer = createColaborador(newColaborador)

  console.log(answer)

  res.status(200).json(answer)
})

/**
 * @param {Object} object
 */
function isColaboradorCreationInterface(object){
  if (typeof object != 'object') return false
  if (!object.matricula) return false
  if (!object.clave_licenciatura) return false
  if (!object.nombres) return false
  if (!object.tipo) return false
  if (!object.apellido_paterno) return false
  if (!object.apellido_materno) return false
  if (!object.telefono) return false
  if (!object.correo_personal) return false

  return true
}



module.exports = router
