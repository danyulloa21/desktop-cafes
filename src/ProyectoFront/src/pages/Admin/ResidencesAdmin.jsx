import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { ApiResidencesAdmin, ApiContractsAdmin } from '../../servicios/API-Admin/api_Admins';
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField, Typography } from '@mui/material';

const ResidencesAdmin = () => {
  const [residences, setResidences] = useState([]);
  const [avalaibleDepartaments, setAvalaibleDepartaments] = useState([]);
  const [openDialogDepartaments, setOpenDialogDepartaments] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Nuevo estado para el diálogo de borrado
  const [message, setMessage] = useState(null);
  const [openDialogInsertDepartament, setOpenDialogInsertDepartament] = useState(false);
  const [newDepartament, setNewDepartament] = useState({
    idResidence: '',
    departamentNumber: '',
    amount: '',
  });
  const [selectedIdResidence, setSelectedIdResidence] = useState(null);
  const [openDialogInsertReisdence, setOpenDialogInsertReisdence] = useState(false);
  const [newResidence, setNewResidence] = useState({state:"", country: "",idCity: "", street: "", postalCode: "", cologne: ""})
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [citiesOptions, setiCtiesOptions] = useState([]);


  useEffect(() => {
    generateResidences();
  }, []);

  useEffect(() => {
    // if (newContract.country =! '') {
    //   generateStates();
    // }
    generateStates();
  }, [newResidence.country]);
  useEffect(() => {
    // if (newContract.state =! '') {
    //   generateCities();
    // }
    generateCities();
  }, [newResidence.state]);







  const generateCities = () => {
    const data = {
      opt : "mostrarciudades",
      idState : newResidence.state
    };

    // console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setiCtiesOptions(res.data);
        generateStates();
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  };

  const generateStates = () => {
    const data = {
      opt : "mostrarestados",
      idCountry : newResidence.country 
    }

    // console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setStatesOptions(res.data);
        // console.log(statesOptions);

      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  };

  const generateCountries = () => {
    const data = {
      opt: "mostrarpaises"
    }
    console.log(data)
    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setCountriesOptions(res.data);
        // console.log(res.data);
        
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  };





  const generateResidences = () => {
    const data = {
      opt: "consultarregistros"
    };

    ApiResidencesAdmin(data)
      .then(res => {
        if (res.success) {
          setResidences(res.data);
        } else {
          setResidences([]);
        }
      })
      .catch(e => console.log(e));
  };

  const generateDepartaments = (idResidence) => {
    const data = {
      opt: "mostrardepartamentos",
      idResidence
    };

    ApiResidencesAdmin(data)
      .then(res => {
        if (res.success) {
          setAvalaibleDepartaments(res.data);
          setOpenDialogDepartaments(true);
        } else {
          console.log(res);
          setOpenDialogDepartaments(true);
          setMessage(res.message);
        }
      })
      .catch(e => console.log(e));
  };

  const handleActivateResidence = (idResidence) => {
    const data = {
      opt : "activarresidencia",
      idResidence
    };

    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setMessage(res.message);
        setOpenDeleteDialog(true);
      } else {
        setMessage(res.message);
        setOpenDeleteDialog(true);
      }
    }).catch(e => console.log(e));
  };

  const handleDeactivateResidence = (idResidence) => {
    const data = {
      opt : "desactivarresidencia",
      idResidence
    };

    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setMessage(res.message);
        setOpenDeleteDialog(true);
      } else {
        setMessage(res.message);
        setOpenDeleteDialog(true);
      }
    }).catch(e => console.log(e));
  };


  const handleDeactivateDepartament = (idDepartament) => {
    const data = {
      opt: "desactivardepartamento",
      idDepartament
    };

    console.log(data);
    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setMessage(res.message);
        setOpenDeleteDialog(true); // Mostrar el diálogo de borrado
      } else {
        setOpenDeleteDialog(true);
        setMessage(res.message);
        console.log(res.message);
      }
    })
    console.log(idDepartament);
  };

  const handleActivateDepartament = (idDepartament) => {
    const data = {
      opt: "activardepartamento",
      idDepartament
    };

    console.log(data);
    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setMessage(res.message);
        setOpenDeleteDialog(true); // Mostrar el diálogo de borrado
      } else {
        setOpenDeleteDialog(true);
        setMessage(res.message);
        console.log(res.message);
      }
    })
    console.log(idDepartament);
  };

  const handleData = (event) => {
    const { name, value } = event.target;
  
    setNewResidence((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleNewDepartamentChange = (event) => {
    const {value, name} = event.target;

    console.log(`${name} : ${value}`)

    setNewDepartament((prevData) => (
      {...prevData,
      [name]: value}
    ))
  };

  const handleInsertDepartament = () => {
    
    const { departamentNumber, amount} = newDepartament;
    const data = {
      opt : "insertardepartamento",
      idResidence: selectedIdResidence,
      departamentNumber,
      amount
    };

    // console.log(data);

    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setOpenDialogInsertDepartament(false)
        generateDepartaments(selectedIdResidence);
      } else {
        console.log(res.message);
      }
    }).catch(e => console.log(e));
  };

  const handleInsertResidence = () => {
    console.log(newResidence);
    const { idCity, street, cologne, postalCode } = newResidence;

    const data = {
      opt: "insertarresidencia",
      idCity, street, cologne, postalCode
    }
    console.log(data);
    ApiResidencesAdmin(data).then(res => {
      if (res.success) {
        setMessage(res.message);
        setOpenDeleteDialog(true);
        setOpenDialogInsertReisdence(false);
        setNewResidence({
          state: "",
          country: "",
          idCity: "",
          street: "",
          postalCode: "",
          cologne: ""
        });
      } else {
        setMessage(res.message);
        setOpenDeleteDialog(true);
      }
    }).catch(e => console.log(e));
  };

  const handleOpenDialogInsertResidence = () => {
    setOpenDialogInsertReisdence(true);
    generateCountries();
  };

  const handleCloseDialogInsertResidence = () => {
    setOpenDialogInsertReisdence(false);
    setNewResidence({state:"", country: "",idCity: "", street: "", postalCode: "", cologne: ""});
  };

  const handleCloseDialogDepartaments = () => {
    setOpenDialogDepartaments(false);
    setAvalaibleDepartaments([]);
  };
  
  const handleOpenDialogInsertDepartament = () => {
    setOpenDialogDepartaments(false);
    setOpenDialogInsertDepartament(true);
  };

  const handleCloseDialogInsertDepartament = () => {
    setNewDepartament({
      idResidence: '',
      departamentNumber: '',
      amount: '',
    });
    setOpenDialogInsertDepartament(false);
  };

  const handleCloseDeleteDialog = () => {
    generateResidences(); // Actualizar la lista de residencias después de borrar un departamento
    setOpenDeleteDialog(false); // Cerrar el diálogo de borrado
    setOpenDialogDepartaments(false);
  };

  const handleResidenceClick = (idResidence) => {
    generateDepartaments(idResidence);
    setSelectedIdResidence(idResidence);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Typography variant="h5" gutterBottom style={{ margin: "20px" }}>
          Residencias
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handleOpenDialogInsertResidence()}
        >
          Insertar Residencia
        </Button>
        {residences.length > 0 ? (
          residences.map((residence) => (
            <Card
              key={residence.idResidence}
              style={{ margin: "10px", padding: "10px" }}
            >
              <CardContent>
                <Typography variant="h6">
                  {residence.ciudad}, {residence.estado}, {residence.pais}
                </Typography>
                <Typography>Street: {residence.street}</Typography>
                <Typography>Cologne: {residence.cologne}</Typography>
                <Typography>Postal Code: {residence.postalCode}</Typography>
                <Typography>Status: {residence.status}</Typography>
                <Button
                  onClick={() => handleResidenceClick(residence.idResidence)}
                >
                  Ver Departamentos
                </Button>
                {residence.status === "ACTIVO" ? (
                  <Button
                    color="primary"
                    onClick={() =>
                      handleDeactivateResidence(residence.idResidence)
                    }
                  >
                    Desactivar
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={() =>
                      handleActivateResidence(residence.idResidence)
                    }
                  >
                    Reactivar
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h4" align="center" gutterBottom>
            No se encontraron Residencias
          </Typography>
        )}

        <Dialog
          open={openDialogDepartaments}
          onClose={handleCloseDialogDepartaments}
        >
          <DialogTitle>Departamentos Disponibles</DialogTitle>
          <DialogContent>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleOpenDialogInsertDepartament()}
            >
              Insertar Departamento
            </Button>
            {avalaibleDepartaments.length > 0 ? (
              avalaibleDepartaments.map((departament) => (
                <Card
                  key={departament.idDepartament}
                  style={{ margin: "10px", padding: "10px" }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {departament.ciudad}, {departament.estado},{" "}
                      {departament.pais}
                    </Typography>
                    <Typography>Street: {departament.street}</Typography>
                    <Typography>Cologne: {departament.cologne}</Typography>
                    <Typography>
                      Postal Code: {departament.postalCode}
                    </Typography>
                    <Typography>
                      Departament Number: {departament.departamentNumber}
                    </Typography>
                    <Typography>Amount: {departament.amount}</Typography>
                    <Typography>Status: {departament.status}</Typography>

                    {departament.status === "ACTIVO" ? (
                      <Button
                        color="primary"
                        onClick={() =>
                          handleDeactivateDepartament(departament.idDepartament)
                        }
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={() =>
                          handleActivateDepartament(departament.idDepartament)
                        }
                      >
                        Reactivar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="h6" margin={"10px"}>
                {message}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogDepartaments} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo para insertar departamento */}
        <Dialog
          open={openDialogInsertDepartament}
          onClose={handleCloseDialogInsertDepartament}
        >
          <DialogTitle>Insertar Nuevo Departamento</DialogTitle>
          <DialogContent>
            <TextField
              label="Número de Departamento"
              name="departamentNumber"
              value={newDepartament.departamentNumber}
              onChange={handleNewDepartamentChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Monto"
              name="amount"
              value={newDepartament.amount}
              onChange={handleNewDepartamentChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialogInsertDepartament}
              color="primary"
            >
              Cancelar
            </Button>
            <Button onClick={handleInsertDepartament} color="primary">
              Insertar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo para insertar residencia */}
        <Dialog
          open={openDialogInsertReisdence}
          onClose={handleCloseDialogInsertResidence}
        >
          <DialogTitle>Insertar Nueva Reisdencia</DialogTitle>
          <DialogContent>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pais"
                name="country"
                select
                fullWidth
                value={newResidence.country}
                onChange={handleData}
                variant="outlined"
              >
                {countriesOptions.map((country) => (
                  <MenuItem key={country.idCountry} value={country.idCountry}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Estado"
                name="state"
                select
                fullWidth
                value={newResidence.state}
                onChange={handleData}
                variant="outlined"
              >
                {statesOptions.length > 0 ? (
                  statesOptions.map((state) => (
                    <MenuItem key={state.idState} value={state.idState}>
                      {state.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No se encontraron</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                name="idCity"
                select
                fullWidth
                value={newResidence.city}
                onChange={handleData}
                variant="outlined"
              >
                {citiesOptions.map((city, index) => (
                  <MenuItem key={city.idCity} value={city.idCity}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cologne"
                name="cologne"
                fullWidth
                value={newResidence.cologne}
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                name="street"
                fullWidth
                value={newResidence.street}
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Postal"
                name="postalCode"
                fullWidth
                value={newResidence.postalCode}
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogInsertResidence} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleInsertResidence} color="primary">
              Insertar
            </Button>
          </DialogActions>
        </Dialog>

        {/*Dialogo de mensaje*/}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Mensaje</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ResidencesAdmin;
