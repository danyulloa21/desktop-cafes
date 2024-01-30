import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useAppContext } from '../../AppContext';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { getAccountInfo, getWarnings } from '../../servicios/API-Inquilinos/api_Inquilinos';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


function WarningsPage() {
  const { user } = useAppContext();
  const [avisos, setAvisos] = useState([])
  const [open, setOpen] = useState(false); // Estado para controlar la apertura/cierre del diálogo
  const [nuevoAviso, setNuevoAviso] = useState(''); // Estado para almacenar el nuevo aviso
  const [nivelImportancia, setNivelImportancia] = useState(''); // Campo para nivel de importancia


  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNuevoAviso('');
    setNivelImportancia('');
  };

  const handleGuardarAviso = () => {
    // Construye el objeto para enviar al servidor
    const nuevoAvisoData = {
        iduser: user.idUser, // El usuario actual
        aviso: nuevoAviso,
        nivelimportancia: nivelImportancia,
        opt: 'insertarregistro', // Puedes agregar lógica para generarlo automáticamente
      };

      // console.log(nuevoAvisoData);

      // Envía nuevoAvisoData al servidor para insertar el aviso
      getWarnings(nuevoAvisoData).then((res) => {
        console.log(res);
        if (res.success) {
          // Actualiza el estado "avisos" con el nuevo aviso
          // setAvisos((prevAvisos) => [...prevAvisos, res.nuevoAviso]);
          setOpen(false); // Después de guardar, cierra el diálogo
          setNuevoAviso('');
          setNivelImportancia('');
          generateAvisos(); // Recarga la lista de avisos
        }
      });
  
      
      
      // setOpen(false); // Después de guardar, cierra el diálogo
  };

  const generateAvisos = () => {
    if (user) {
      const idUserInfo = { userid: user.idUser };
      getAccountInfo(idUserInfo)
        .then((res) => {
          const { userinfo } = res;
          const idresidencia = userinfo.idResidence
        //   console.log(idresidencia);
          const idData = {
            idresidencia
          };
          getWarnings(idData)
            .then((res2) => {
              // console.log(res2);
              setAvisos(res2);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((e) => console.error(e));
    } else {
      alert("No se encontraron deudas");
    }
  };


  useEffect(() => {
    // console.log(user);
    generateAvisos();
  }, []);

  const getRowBackgroundColor= (importanceLevel) => {
    switch (importanceLevel) {
      case 'BAJO':
        return 'linear-gradient(to right, #33cc33, #99ff99)';
      case 'MEDIO':
        return 'linear-gradient(to right, #ffcc00, #ffff99)';
      case 'ALTO':
        return 'linear-gradient(to right, #ff3333, #ff9999)';
      default:
        return 'transparent';
    }
  }
  


  return (
    <>
      <ResponsiveAppBar />
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'block', left: '10px', top: '10px' }}
        onClick={handleOpenDialog}
      >
        CREAR AVISO
      </Button>
      
      <Paper elevation={3} style={{ marginTop: '20px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Departamento</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Apellido</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Aviso</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Fecha de Creación</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Hora de Creación</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Nivel de Importancia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {avisos.map((aviso) => (
                <TableRow key={aviso.idWarning} style={{ background: getRowBackgroundColor(aviso.importanceLevel) }}>
                  <TableCell>{aviso.departamentNumber}</TableCell>
                  <TableCell>{aviso.name}</TableCell>
                  <TableCell>{aviso.surname}</TableCell>
                  <TableCell>{aviso.warning}</TableCell>
                  <TableCell>{new Date(aviso.creationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{aviso.creationTime}</TableCell>
                  <TableCell >{aviso.importanceLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Crear un nuevo aviso</DialogTitle>
        <DialogContent>
        <TextField
            sx={{mb:2, mt:1}}
            label="Nuevo Aviso"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={nuevoAviso}
            onChange={(e) => setNuevoAviso(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Nivel de Importancia</InputLabel>
            <Select
              label="Nivel de Importancia"
              value={nivelImportancia}
              onChange={(e) => setNivelImportancia(e.target.value)}
            >
              <MenuItem value="BAJO">BAJO</MenuItem>
              <MenuItem value="MEDIO">MEDIO</MenuItem>
              <MenuItem value="ALTO">ALTO</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleGuardarAviso} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WarningsPage;
