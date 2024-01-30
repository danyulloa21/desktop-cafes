import React, { useState,useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ApiDebtsAdmin } from "../../servicios/API-Admin/api_Admins";
import { useAppContext } from "../../AppContext";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, MenuItem} from "@mui/material";

const DebtsAdmin = () => {
  const { user, handleLogout} = useAppContext();
  const [debts, setDebts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDebt, setNewDebt] = useState({idUserDepartament: "", concept: "", amount: ""});
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openMarkAsPaidConfirmation, setOpenMarkAsPaidConfirmation] = useState(false);
  const [selectedDebtId, setSelectedDebtId] = useState(null);
  const [departamentosDisponibles, setdepartamentosDisponibles] = useState([]);
  const [reloadData, setReloadData] = useState(false);


  const conceptOptions = [
    { idConcept: 2, concept: "Recibo de luz" },
    { idConcept: 3, concept: "Recibo de agua" },
  ];


  const generateDebts = () => {
    const data = {
      opt : "consultarregistros"
    };

    ApiDebtsAdmin(data).then(res => {
      if (res.success) {
        setDebts(res.data); 

        console.log(res);
      } else {
        setDebts([]);
      }

    }).catch(err => console.log(err));
  } 

  const markAsPaid = (id) => {
    // Implement logic to mark debt as paid (you might want to update the API for this)
    console.log(`Mark as Paid: ${id}`);
    // Set the selected debt ID
    setSelectedDebtId(id);
    // Open the confirmation dialog
    setOpenMarkAsPaidConfirmation(true);
  };

  const deleteDebt = (id) => {
    // Implement logic to delete debt (you might want to update the API for this)
    console.log(`Delete: ${id}`);
    // Set the selected debt ID
    setSelectedDebtId(id);
    // Open the confirmation dialog
    setOpenDeleteConfirmation(true);
    
  }

  const addDebt = () => {
    // Implement logic to navigate to the page for adding a new debt
    console.log("Navigate to add new debt page");

    setOpenDialog(true);

    const opt = {
      opt : "mostrardepartamentos"
    };

    ApiDebtsAdmin(opt).then(res => {
      setdepartamentosDisponibles(res);
    }).catch(err => alert(err));


  };

  const handleDeleteDebt = (id) => {
    // Implement logic to delete debt (you might want to update the API for this)
    console.log(`Delete: ${id}`);

    const data = {
      opt : "eliminarregistro",
      id : id
    };
    console.log(data);
    ApiDebtsAdmin(data).then(res => {
      if (res.success) {
        console.log(res.message);
        setReloadData(true);
      }
    }).catch(e => console.log(e));

    // Close the delete confirmation dialog
    setOpenDeleteConfirmation(false);
  };

  const handleMarkAsPaid = (id) => {
    // Implement logic to mark debt as paid (you might want to update the API for this)
    console.log(`Mark as Paid: ${id}`);

    const data = {
      opt : 'editarregistro',
      id : id
    };

    ApiDebtsAdmin(data).then(res => {
      if (res.success) {
        console.log(res.message);

        setReloadData(true);
      }
    }).catch(e => console.log(e));

    // Close the mark as paid confirmation dialog
    setOpenMarkAsPaidConfirmation(false);
  };
  

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewDebt({idUserDepartament: 0, concept: "", amount: ""});
  };

  const handleNewDebtChange = (event) => {
    setNewDebt({
      ...newDebt,
      [event.target.name]: event.target.value,
    });
  };

  const handleInsertNewDebt = () => {
    // Implement logic to insert the new debt (you might want to update the API for this)
    console.log("Insert new debt:", newDebt);

    const data = {
      opt : 'insertarregistro',
      idUserDepartament : newDebt.idUserDepartament,
      concept : newDebt.concept,
      amount : newDebt.amount
    };

    ApiDebtsAdmin(data).then(res => {
      if (res.success) {
        console.log(res.message);

        // Activate the reload data flag
        setReloadData(true);
      }
    }).catch(e => console.log(e));
    console.log(data);
    // Close the dialog
    setOpenDialog(false);
    setNewDebt({idUserDepartament: 0, concept: "", amount: ""});
  };

  const handleRowClick = (idUserDepartament) => {
    // Establecer el idUserDepartament en el estado newDebt
    setNewDebt({
      ...newDebt,
      idUserDepartament: idUserDepartament,
    });
    // alert(idUserDepartament);
  };
  
  useEffect(() => {
    generateDebts();
    // Deactivate the reload data flag after reloading data
    setReloadData(false);
  
  }, [reloadData])
  

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
          Lista de Deudas
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={addDebt}>
            Añadir Nueva Deuda
          </Button>
        </Box>
        {!debts || debts.length === 0 ? (
        <Typography variant="subtitle1">
          No se encontraron deudas.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {debts.map((debt) => (
            <Grid item xs={12} sm={6} md={4} key={debt.idDebt}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {debt.concept}
                </Typography>
                <Typography paragraph>
                  <strong>Nombre:</strong> {debt.name} {debt.surname}{" "}
                  {debt.secondSurname}
                </Typography>
                <Typography paragraph>
                  <strong>Dirección:</strong> {debt.street}, {debt.cologne},{" "}
                  {debt.ciudad}, {debt.estado}, {debt.pais}, {debt.postalCode}
                </Typography>
                <Typography>
                  <strong>Departamento:</strong> {debt.departamentNumber}
                </Typography>
                <Typography>
                  <strong>Fecha de Deuda:</strong>{" "}
                  {new Date(debt.debtDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Monto:</strong> ${debt.amount}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => markAsPaid(debt.idDebt)}
                    sx={{ mr: 2 }}
                  >
                    Marcar como Pagada
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteDebt(debt.idDebt)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>)}
      </Container>

      {/* Insert New Debt Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Añadir Nuevo Registro</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Apellido</strong></TableCell>
                  <TableCell><strong>Ciudad</strong></TableCell>
                  {/* Add other table headers as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {departamentosDisponibles.map((row) => (
                  <TableRow
                    key={row.idUserDepartament}
                    onClick={() => handleRowClick(row.idUserDepartament)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        newDebt.idUserDepartament === row.idUserDepartament
                          ? "#e0e0e0"
                          : "white",
                    }}
                  >
                    <TableCell>{row.idUserDepartament}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.ciudad}</TableCell>
                    {/* Add other table cells as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add form fields for the new debt */}
          <TextField
            select
            label="Concepto"
            name="concept"
            value={newDebt.concept}
            onChange={handleNewDebtChange}
            fullWidth
            margin="normal"
          >
            {conceptOptions.map((option) => (
              <MenuItem key={option.idConcept} value={option.concept}>
                {option.concept}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Monto"
            name="amount"
            value={newDebt.amount}
            onChange={handleNewDebtChange}
            fullWidth
            margin="normal"
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleInsertNewDebt} color="primary">
            Insertar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar esta deuda?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmation(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteDebt(selectedDebtId)}
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mark as Paid Confirmation Dialog */}
      <Dialog
        open={openMarkAsPaidConfirmation}
        onClose={() => setOpenMarkAsPaidConfirmation(false)}
      >
        <DialogTitle>Confirmar Pago</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres marcar esta deuda como pagada?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarkAsPaidConfirmation(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleMarkAsPaid(selectedDebtId)}
            color="primary"
          >
            Marcar como Pagada
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DebtsAdmin;