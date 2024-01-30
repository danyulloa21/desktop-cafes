import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { ApiWarningsAdmin } from '../../servicios/API-Admin/api_Admins';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppContext } from '../../AppContext';
import { getWarnings } from '../../servicios/API-Inquilinos/api_Inquilinos';

const WarningsAdmin = () => {
  const {user} = useAppContext();
  const [warnings, setWarnings] = useState([]);
  const [warningsAdmin, setWarningsAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
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
          generateWarnings(); // Recarga la lista de avisos
        }
      });
  
      
      
      // setOpen(false); // Después de guardar, cierra el diálogo
  };




  useEffect(() => {
    generateWarnings();
  }, []);

  const generateWarnings = () => {
    const data = {
      opt: 'consultarregistros',
    };

    setLoading(true);

    ApiWarningsAdmin(data)
      .then((res) => {
        if (res.success) {
          setWarnings(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));

      const dataAdmin = {
        opt: 'consultarregistrosadmin',
      };


    ApiWarningsAdmin(dataAdmin)
      .then((res) => {
        if (res.success) {
          setWarningsAdmin(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };


  const handleDelete = (idWarning) => {
    // Aquí puedes agregar la lógica para eliminar el aviso con el ID correspondiente
    // Puedes hacer una llamada a la API o cualquier otra acción necesaria
    console.log(`Eliminar aviso con ID: ${idWarning}`);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography style={{ margin: '16px' }} variant='h5'>Avisos De Inquilinos</Typography>
      <TableContainer component={Paper} style={{ margin: '16px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : warnings.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Ciudad</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Dirección</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Número de Departamento</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Aviso</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Hora de Creación</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nivel de Importancia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warnings.map((warning) => (
                <TableRow key={warning.idWarning}>
                  <TableCell>{warning.ciudad}</TableCell>
                  <TableCell>{`${warning.street}, ${warning.cologne}, ${warning.postalCode}`}</TableCell>
                  <TableCell>{warning.departamentNumber}</TableCell>
                  <TableCell>{`${warning.name} ${warning.surname} ${warning.secondSurname}`}</TableCell>
                  <TableCell>{warning.warning}</TableCell>
                  <TableCell>{formatDate(warning.creationDate)}</TableCell>
                  <TableCell>{warning.creationTime}</TableCell>
                  <TableCell>{warning.importanceLevel}</TableCell>
                  <TableCell>
                    <Tooltip title="Eliminar aviso">
                      <IconButton onClick={() => handleDelete(warning.idWarning)}>
                        <Delete/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant='h5' style={{ margin: '16px' }}>
            No se hay avisos disponibles
          </Typography>
        )}
      </TableContainer>

      <Typography variant='h5' style={{ margin: '16px' }}>Avisos de Administradores</Typography>
{warningsAdmin.length > 0 ? (
  <TableContainer component={Paper} style={{ margin: '16px' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold' }}>Administrador</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>Aviso</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>Hora de Creación</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>Nivel de Importancia</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {warningsAdmin.map((adminWarning) => (
          <TableRow key={adminWarning.idWarning}>
            <TableCell>{adminWarning.Administrador}</TableCell>
            <TableCell>{adminWarning.warning}</TableCell>
            <TableCell>{formatDate(adminWarning.creationDate)}</TableCell>
            <TableCell>{adminWarning.creationTime}</TableCell>
            <TableCell>{adminWarning.importanceLevel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <Typography variant='h6' style={{ margin: '16px' }}>
    No hay avisos de administrador disponibles
  </Typography>
)}

     {/* Agregar funcionalidad al botón */}
     <Button onClick={handleOpenDialog} variant="contained" color="primary">
        Agregar Aviso
      </Button>

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
};

export default WarningsAdmin;

