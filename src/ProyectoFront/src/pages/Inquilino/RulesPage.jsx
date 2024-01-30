import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { ApiRulesAdmin } from '../../servicios/API-Admin/api_Admins';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

const opt = {
  consultarregistros: "consultarregistros",
  editarregistro: "editarregistro",
  insertarregistro: "insertarregistro",
  eliminnarregistro: "eliminarregistro"
}
const RulesPage = () => {
const [rules, setRules] = useState([]);
const [message, setMessage] = useState("");
const [openModal, setOpenModal] = useState(false);
const [newRuleData, setNewRuleData] = useState({
  // Puedes agregar más campos según tus necesidades
  rule:""
});

useEffect(() => {
  generateRules();
}, []);


const handleAgregarRegla = () => {
  // Aquí puedes agregar la lógica para agregar una nueva regla
  // Puede ser abrir un modal, redirigir a otra página, etc.
  console.log('Agregar regla');
  setOpenModal(true);
};


const handleEliminarRegla = (idRule) => {
  const data = {
    opt: opt.eliminnarregistro,
    idRule: idRule,
  };
  console.log(data);
  ApiRulesAdmin(data)
    .then((res) => {
      if (res.success) {
        generateRules();
      } else {
        console.log(res.message);
      }
    })
    .catch((e) => console.log(e));
};


const handleGuardarNuevaRegla = () => {
  // Lógica para guardar la nueva regla, puedes utilizar la API correspondiente
  // Después de guardar, cierra el modal
  
  console.log(newRuleData);
  const data = {
    opt: opt.insertarregistro,
    rule: newRuleData.rule
  }
  ApiRulesAdmin(data).then(res => {
    if (res.success) {
      generateRules();
      setOpenModal(false);
      setNewRuleData({rule:""});
    } else {
      console.log(res.message);
    }
  }).catch( e => console.log(e));
  
};


const generateRules = () => {
  const data = {
    opt: opt.consultarregistros
  }
  ApiRulesAdmin(data).then(res => {
    if (res.success) {
      setRules(res.data);
    } else {
      console.log(res.message)
      setMessage(res.message);
    }
  }).catch(e => console.log(e));
};

  return (
    <>
      <ResponsiveAppBar />
      <Typography margin="30px" variant="h3">
        Reglas
      </Typography>
      {/* Botón para agregar una regla */}

      {/* Modal para agregar regla */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Agregar Nueva Regla</DialogTitle>
        <DialogContent>
          {/* Campos del formulario */}
          <TextField
            label="Regla"
            fullWidth
            name="rule"
            value={newRuleData.rule}
            onChange={(e) =>
              setNewRuleData({ ...newRuleData, rule: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          {/* Botones del modal */}
          <Button
            onClick={() => {
              setOpenModal(false);
              setNewRuleData({ rule: "" });
            }}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={() => handleGuardarNuevaRegla()} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {rules.length > 0 ? (
        <List
        style={{marginLeft: "18px"}}>
        {rules.map((rule) => (
          <ListItem key={rule.idRule}>
            <ListItemText primary={rule.rule} />           
          </ListItem>
        ))}
      </List>
      ) : (
        <Typography variant="h5" margin="10px">
          {message}
        </Typography>
      )}
    </>
  );
}

export default RulesPage;