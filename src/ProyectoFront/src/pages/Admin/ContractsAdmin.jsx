import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ApiContractsAdmin } from "../../servicios/API-Admin/api_Admins";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";


const ContractsAdmin = () => {
  const [contractsDetails, setContractsDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenantinformation, setTenantInformation] = useState([]);

  const [openConfirmationEndContractDialog, setOpenConfirmationEndContractDialog] = useState(false);
  const [selectedContractIndex, setSelectedContractIndex] = useState(null);



  const [editMode, setEditMode] = useState(false);
  const [typePhoneOptions, setTypePhoneOptions] = useState([]);
  const [editedTenantInformation, setEditedTenantInformation] = useState({});
  const [dataUNIQUE, setDataUNIQUE] = useState({});

  const [newContract, setNewContract] = useState({
    name: '',
    surname: '',
    secondSurname: '',
    email: '',
    country: '',
    state: '',
    city: '',
    job: '',
    bloodType: '',
    socialSecurity: '',
    birthday: '',
    INEnumber: '',
    personalPhone: '',
    emergencyPhone: '',
    residence: '',
    departament: '',
  });
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [citiesOptions, setiCtiesOptions] = useState([]);
  const [residencesOptions, setResidencesOptions] = useState([]);
  const [departamentsOptions, setDepartamentsOptions] = useState([]);
  const [openConfirmationContract, setOpenConfirmationContract] = useState(false);
  const [dataAccount, setDataAccount] = useState({});

  const handleData = (e) => {
    const { name, value } = e.target;
    setNewContract((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // console.log(newContract)
  };

useEffect(() => {
  // if (newContract.country =! '') {
  //   generateStates();
  // }
  generateStates();
}, [newContract.country]);
useEffect(() => {
  // if (newContract.state =! '') {
  //   generateCities();
  // }
  generateCities();
}, [newContract.state]);
useEffect(() => {
  generateResidences()
}, [newContract]);
useEffect(() => {
//   if (newContract.residence =! '') {
//   generateDepartaments()
// }
generateDepartaments();
}, [newContract.residence]);

const handleInsertNewContract = () => {
  // console.log(newContract);
  insertNewContract();

  setNewContract({
    name: '',
    surname: '',
    secondSurname: '',
    email: '',
    country: '',
    state: '',
    city: '',
    job: '',
    bloodType: '',
    socialSecurity: '',
    birthday: '',
    INEnumber: '',
    personalPhone: '',
    emergencyPhone: '',
    residence: '',
    departament: '',
  });
  
}


const handleCancelNewContract = () => {
  setNewContract({
    name: '',
    surname: '',
    secondSurname: '',
    email: '',
    country: '',
    state: '',
    city: '',
    job: '',
    bloodType: '',
    socialSecurity: '',
    birthday: '',
    INEnumber: '',
    personalPhone: '',
    emergencyPhone: '',
    residence: '',
    departament: '',
  });
}

const handleCloseConfirmationEndContractDialog = () => {
  setOpenConfirmationEndContractDialog(false);
  setSelectedContractIndex(null);
};

const handleOpenConfirmationEndContractDialog = (contractIndex) => {
  setSelectedContractIndex(contractIndex);
  setOpenConfirmationEndContractDialog(true);
};


const handleEndContract = () => {
  
  const data = {
    opt: 'terminarcontrato',
    idUserDepartament: selectedContractIndex
  }
  
  ApiContractsAdmin(data).then((res) => {
    if (res.success) {
      console.log(res.message);
      setOpenConfirmationEndContractDialog(false);
      setSelectedOption("");
    } else {
      console.log(res.message);
    }
  }).catch(e => console.log(e));
};


  const handleSaveChanges = () => {
    // Aquí puedes enviar los cambios al servidor o realizar otras acciones necesarias
    setEditMode(false);
    // Imprime los cambios almacenados en tenantInfoEdited
    console.log(tenantinformation);
    // Clear the editedTenantInformation state after saving changes
    setEditedTenantInformation({});
    setTypePhoneOptions([]);

    editTenantInformation();
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    // Revert to the original state stored in editedTenantInformation
    setTenantInformation({ ...editedTenantInformation });
  };
  
const handleOpenConfirmationContract = () => {
  setOpenConfirmationContract(true);
};
const handleCloseConfirmationContract = () => {
  setDataAccount({})
  setOpenConfirmationContract(false);
  setSelectedOption('');
};


  const handleEditClick = () => {
    setEditMode(true);
    // Initialize the editedTenantInformation state with the current tenantinformation
    setEditedTenantInformation({ ...tenantinformation });
  };

  const handleFieldChange = (fieldName, value, index) => {
    if (fieldName === 'email') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      user: {
        ...prevTenantInfo.user,
        [fieldName]: value,
      },
    }));
    console.log('Estas editando email')
  } else if (fieldName === 'job') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      tenantInformation: {
        ...prevTenantInfo.tenantInformation,
        [fieldName]: value,
      },
    }));


    console.log('Estas editando trabajo')
  } else if (fieldName === 'socialSecurity') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      tenantInformation: {
        ...prevTenantInfo.tenantInformation,
        [fieldName]: value,
      },
    }));

    console.log('Estas editando nss')
  } else if (fieldName === 'ineNumber') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      tenantInformation: {
        ...prevTenantInfo.tenantInformation,
        [fieldName]: value,
      },
    }));

    console.log('Estas editando no. de ine')
  } else if (fieldName === 'phone' || fieldName === 'type') {
    console.log(`${fieldName} : ${value} - ${index}`)
    setTenantInformation((prevTenantInfo) => {
      const updatedTenantContacts = [...prevTenantInfo.tenantContacts];
      updatedTenantContacts[index-1] = {
        ...updatedTenantContacts[index-1],
        [fieldName]: value,
      };
      return {
        ...prevTenantInfo,
        tenantContacts: updatedTenantContacts,
      };
    });

    console.log('Estas editando phone')
  } else if (fieldName === 'accountName') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      account: {
        ...prevTenantInfo.account,
        [fieldName]: value,
      },
    }));

    console.log('Estas editando nombre de usuario')
  } else if (fieldName === 'password') {
    setTenantInformation((prevTenantInfo) => ({
      ...prevTenantInfo,
      account: {
        ...prevTenantInfo.account,
        [fieldName]: value,
      },
    }));
    console.log('Estas editando pass')
  }
  };
  
  const editTenantInformation = () => {
    const { user, tenantInformation, tenantContacts, account } = tenantinformation;

    const data = {
      opt : 'editarregistro',
      email : user.email,
      ineNumber : tenantInformation.ineNumber,
      socialSecurity: tenantInformation.socialSecurity,
      job: tenantInformation.job,
      tenantContacts,
      accountName : account.accountName,
      password : account.password,
      idAccount : dataUNIQUE.idAccount,
      idUser: dataUNIQUE.idUser
    };

    // console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        console.log(res.message);
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));;
  };
  
  const insertNewContract = () => {
    const {name, surname, secondSurname, email, country, state, city, job, bloodType, socialSecurity, birthday, INEnumber, personalPhone, emergencyPhone, residence, departament} = newContract;

    const data = {
      opt : "insertarregistro",
      optadd : "nuevocontrato",
      name,
      surname,
      secondSurname,
      email,
      country,
      state,
      city,
      job,
      bloodType,
      socialSecurity,
      birthday,
      INEnumber,
      personalPhone,
      emergencyPhone,
      residence,
      departament,
    };

    console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        // alert(res.message);
        setDataAccount(res.data);
        handleOpenConfirmationContract();
        
      } else {
        console.log(res.message);
      }
    }).catch(e => console.log(e));
  };

  const generateDepartaments = () => {
    const data = {
      opt : "mostrardepartamentos",
      idResidence : newContract.residence
    }

    console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setDepartamentsOptions(res.data);
        console.log(res.data);
      } else {
        setDepartamentsOptions(res);
        console.log(res.message);
      }
    }).catch(e => console.log(e));
  };

  const generateResidences = () => {
    const data = {
      opt : "mostrarresidencias"
    }

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setResidencesOptions(res.data);
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  }

  const generateCities = () => {
    const data = {
      opt : "mostrarciudades",
      idState : newContract.state
    };

    // console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setiCtiesOptions(res.data);
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  };

  const generateStates = () => {
    const data = {
      opt : "mostrarestados",
      idCountry : newContract.country 
    }

    // console.log(data);

    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setStatesOptions(res.data);
        console.log(statesOptions);
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
  
  const generateTypePhones = () => {
    const data = {
      opt : 'mostrartipotelefonos'
    };
    ApiContractsAdmin(data).then(res => {
      if (res.success) {
        setTypePhoneOptions(res.data);
      } else {
        console.log(res);
      }
    }).catch(e => console.log(e));
  };
  
  const generateContractsDetails = (newOption) => {
    let optAdd = null;

    if (newOption === "verContratosActuales") {
      optAdd = "activos";
    } else if (newOption === "verContratosAcabados") {
      optAdd = "acabados";
    } else if (newOption === "verInquilinosActivos") {
      optAdd = "inquilinosactivos";
    } else if (newOption === 'verInquilinosInactivos') {
      optAdd = "inquilinosinactivos"
    } else if (newOption === 'insertarNuevoContrato') {
      generateCountries();
      console.log('Se ejecuta generar Paises');
      // optAdd = "inquilinosinactivos"
      return 0;
    }
    
    const data = {
      opt: "consultarregistros",
      optadd: optAdd,
    };
    console.log(data);
    ApiContractsAdmin(data)
      .then((res) => {
        if (res.success) {
          setContractsDetails(res.data);
        } else {
          console.log(res);
          // alert(res.message);
          setContractsDetails(res);
        }
      })
      .catch((e) => console.log(e));
  };

  const generateTenantInfo = (selectedIndex) => {
    if (selectedIndex !== -1) {
      const selectedTenantInfo = contractsDetails[selectedIndex];

      // Ahora tienes el objeto del inquilino seleccionado
      // console.log("Selected Tenant Info:", selectedTenantInfo);

      // Puedes acceder a los campos específicos, por ejemplo:
      const { idUser, idAccount, idTenantInformation } = selectedTenantInfo;
      // console.log("idUser:", idUser);
      // console.log("idAccount:", idAccount);
      // console.log("idTenantInformation:", idTenantInformation);
      const data = {
        opt: "mostrarinfoinquilinoactivo",
        idUser,
        idAccount,
        idTenantInformation,
      };

      console.log(data);
      setDataUNIQUE(data);

      ApiContractsAdmin(data)
        .then((res) => {
          if (res.success) {
            console.log(res.data);
            setTenantInformation(res.data);
          } else {
            console.log(res);
          }
        })
        .catch((e) => console.log(e));
      // console.log(tenantinformation);
    }
  };

  useEffect(() => {
    generateTypePhones();
  }, [editMode]);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setSelectedTenant("");
    setTenantInformation([]);
    console.log(selectedOption);
    generateContractsDetails(value);
    setContractsDetails([]);
    setNewContract({
    name: '',
    surname: '',
    secondSurname: '',
    email: '',
    country: '',
    state: '',
    city: '',
    job: '',
    bloodType: '',
    socialSecurity: '',
    birthday: '',
    INEnumber: '',
    personalPhone: '',
    emergencyPhone: '',
    residence: '',
    departament: '',
  });
  // setCountriesOptions([]);
  // setiCtiesOptions([]);
  // setStatesOptions([]);
  // setResidencesOptions([]);
  // setDepartamentsOptions([]);
  };

  const handleTenantChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setSelectedTenant(value);
    // console.log(contractsDetails);
    // Encuentra el índice del inquilino seleccionado
    const selectedIndex = contractsDetails.findIndex((tenant) => {
      return (
        `${tenant.name} ${tenant.surname} ${tenant.secondSurname}` === value
      );
      // Puedes cambiar esta condición según el campo que desees comparar
    });

    console.log(selectedIndex);
    // Llama a la función generadora de información del inquilino con el índice encontrado
    generateTenantInfo(selectedIndex);
    // console.log(value);
    // Realiza cualquier acción adicional necesaria al seleccionar un inquilino
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Contratos Administrativos
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Seleccione una opción para continuar.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
              variant="outlined"
            >
              <MenuItem value="verContratosActuales">
                Ver contratos actuales
              </MenuItem>
              <MenuItem value="verContratosAcabados">
                Ver contratos acabados
              </MenuItem>
              <MenuItem value="verInquilinosActivos">
                Ver inquilinos activos
              </MenuItem>
              <MenuItem value="verInquilinosInactivos">
                Ver inquilinos inactivos
              </MenuItem>
              <MenuItem value="insertarNuevoContrato">
                Insertar nuevo contrato
              </MenuItem>
              {/* Agrega más opciones según sea necesario */}
            </Select>
          </Box>

          {selectedOption === "verContratosActuales" && (
            <Box mt={3}>
              <Typography variant="h5" align="center">
                Detalles de Contratos Actuales
              </Typography>
              {/* Mostrar detalles del contrato en una tabla */}
              <TableContainer component={Paper} style={{ marginTop: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    {contractsDetails.map((contract, index) => (
                      <React.Fragment key={index}>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleOpenConfirmationEndContractDialog(contract.idUserDepartament)
                              }
                            >
                              Acabar Contrato
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            Nombre
                          </TableCell>
                          <TableCell>{`${contract.name} ${contract.surname} ${contract.secondSurname}`}</TableCell>
                        </TableRow>
                        <TableRow key={index + 1}>
                          <TableCell component="th" scope="row">
                            Email
                          </TableCell>
                          <TableCell>{contract.email}</TableCell>
                        </TableRow>
                        <TableRow key={index + 2}>
                          <TableCell component="th" scope="row">
                            Departamento
                          </TableCell>
                          <TableCell>{contract.departamentNumber}</TableCell>
                        </TableRow>
                        <TableRow key={index + 3}>
                          <TableCell component="th" scope="row">
                            Dirección
                          </TableCell>
                          <TableCell>{`${contract.street}, ${contract.postalCode} ${contract.cologne}`}</TableCell>
                        </TableRow>
                        <TableRow key={index + 4}>
                          <TableCell component="th" scope="row">
                            Ciudad
                          </TableCell>
                          <TableCell>{`${contract.ciudad}, ${contract.estado}, ${contract.pais}`}</TableCell>
                        </TableRow>
                        <TableRow key={index + 5}>
                          <TableCell component="th" scope="row">
                            Fecha de admisión
                          </TableCell>
                          <TableCell>{contract.admissionDate}</TableCell>
                        </TableRow>
                        <TableRow key={index + 6}>
                          <TableCell component="th" scope="row">
                            Hora de admisión
                          </TableCell>
                          <TableCell>{contract.admissionTime}</TableCell>
                        </TableRow>
                        <TableRow style={{ backgroundColor: "#1976d2" }}>
                          <TableCell colSpan={2}></TableCell>
                        </TableRow>

                        {/* Agrega más detalles del contrato según sea necesario */}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Dialog
                open={openConfirmationEndContractDialog}
                onClose={handleCloseConfirmationEndContractDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Confirmar</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro de que quieres finalizar este contrato?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => handleCloseConfirmationEndContractDialog(false)}
                    color="primary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleEndContract()}
                    color="primary"
                    autoFocus
                  >
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}

          {selectedOption === "verContratosAcabados" && (
            <Box mt={3}>
              <Typography variant="h5" align="center">
                Detalles de Contratos Acabados
              </Typography>
              <TableContainer component={Paper} style={{ marginTop: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    {contractsDetails.map((contract, index) => (
                      <React.Fragment key={index}>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Nombre
                          </TableCell>
                          <TableCell>{`${contract.name} ${contract.surname} ${contract.secondSurname}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Email
                          </TableCell>
                          <TableCell>{contract.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Departamento
                          </TableCell>
                          <TableCell>{contract.departamentNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Dirección
                          </TableCell>
                          <TableCell>{`${contract.street}, ${contract.postalCode} ${contract.cologne}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Ciudad
                          </TableCell>
                          <TableCell>{`${contract.ciudad}, ${contract.estado}, ${contract.pais}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Fecha de admisión
                          </TableCell>
                          <TableCell>{contract.admissionDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Hora de admisión
                          </TableCell>
                          <TableCell>{contract.admissionTime}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Fecha de alta
                          </TableCell>
                          <TableCell>{contract.dischargeDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Hora de alta
                          </TableCell>
                          <TableCell>{contract.dischargeTime}</TableCell>
                        </TableRow>
                        <TableRow style={{ backgroundColor: "#1976d2" }}>
                          <TableCell colSpan={2}></TableCell>
                        </TableRow>
                        {/* Agregar más filas según sea necesario */}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {selectedOption === "verInquilinosActivos" && (
            <Box mt={3}>
              <Typography variant="h5" align="center">
                Inquilinos Activos
              </Typography>
              {contractsDetails.length > 0 ? (
                <>
                  <Typography variant="body1" align="center" paragraph>
                    Seleccione un inquilino para continuar.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Select
                      value={selectedTenant}
                      onChange={handleTenantChange} // Usa la función de cambio de inquilino
                      variant="outlined"
                    >
                      {contractsDetails.map((tenant, index) => (
                        <MenuItem
                          key={index}
                          value={`${tenant.name} ${tenant.surname} ${tenant.secondSurname}`}
                        >
                          {" "}
                          {/* Asigna un valor único como el id del inquilino */}
                          {`${tenant.name} ${tenant.surname} ${tenant.secondSurname}`}
                        </MenuItem>
                      ))}
                      {/* Agrega más opciones según sea necesario */}
                    </Select>
                  </Box>
                </>
              ) : (
                <Typography variant="body1" align="center" paragraph>
                  {contractsDetails.message}
                </Typography>
              )}
            </Box>
          )}

          {selectedOption === "verInquilinosInactivos" && (
            <Box mt={3}>
              <Typography variant="h5" align="center">
                Inquilinos Inactivos
              </Typography>
              {contractsDetails.length > 0 ? (
                <>
                  <Typography variant="body1" align="center" paragraph>
                    Seleccione un inquilino para continuar.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Select
                      value={selectedTenant}
                      onChange={handleTenantChange} // Usa la función de cambio de inquilino
                      variant="outlined"
                    >
                      {contractsDetails.map((tenant, index) => (
                        <MenuItem
                          key={index}
                          value={`${tenant.name} ${tenant.surname} ${tenant.secondSurname}`}
                        >
                          {" "}
                          {/* Asigna un valor único como el id del inquilino */}
                          {`${tenant.name} ${tenant.surname} ${tenant.secondSurname}`}
                        </MenuItem>
                      ))}
                      {/* Agrega más opciones según sea necesario */}
                    </Select>
                  </Box>
                </>
              ) : (
                <Typography variant="body1" align="center" paragraph>
                  {contractsDetails.message}
                </Typography>
              )}
            </Box>
          )}

          {selectedOption === "insertarNuevoContrato" && (
            <Box mt={3}>
              <Typography variant="h5" align="center">
                Crear nuevo contrato
              </Typography>
              <Paper
                elevation={3}
                style={{ padding: "20px", margin: "20px 0" }}
              >
                <Box mt={3} mb={5}>
                  <form>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Nombre"
                          name="name"
                          variant="outlined"
                          fullWidth
                          value={newContract.name}
                          onChange={handleData}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Apellido"
                          name="surname"
                          variant="outlined"
                          fullWidth
                          value={newContract.surname}
                          onChange={handleData}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Segundo apellido"
                          name="secondSurname"
                          variant="outlined"
                          value={newContract.secondSurname}
                          onChange={handleData}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          name="email"
                          variant="outlined"
                          fullWidth
                          value={newContract.email}
                          onChange={handleData}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Pais"
                          name="country"
                          select
                          fullWidth
                          value={newContract.country}
                          onChange={handleData}
                          variant="outlined"
                        >
                          {countriesOptions.map((country) => (
                            <MenuItem
                              key={country.idCountry}
                              value={country.idCountry}
                            >
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
                          value={newContract.state}
                          onChange={handleData}
                          variant="outlined"
                        >
                          {statesOptions.length > 0 ? (
                            statesOptions.map((state) => (
                              <MenuItem
                                key={state.idState}
                                value={state.idState}
                              >
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
                          name="city"
                          select
                          fullWidth
                          value={newContract.city}
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
                          label="Trabajo"
                          name="job"
                          variant="outlined"
                          value={newContract.job}
                          onChange={handleData}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Tipo de sangre"
                          name="bloodType"
                          variant="outlined"
                          value={newContract.bloodType}
                          onChange={handleData}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Seguro social"
                          name="socialSecurity"
                          variant="outlined"
                          value={newContract.socialSecurity}
                          onChange={handleData}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Cumpleaños"
                          name="birthday"
                          type="date"
                          variant="outlined"
                          value={newContract.birthday}
                          onChange={handleData}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="INE number"
                          name="INEnumber"
                          variant="outlined"
                          value={newContract.INEnumber}
                          onChange={handleData}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Numero Personal"
                          name="personalPhone"
                          variant="outlined"
                          value={newContract.personalPhone}
                          onChange={handleData}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Numero de Emergencia"
                          name="emergencyPhone"
                          variant="outlined"
                          value={newContract.emergencyPhone}
                          onChange={handleData}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Residencia"
                          name="residence"
                          select
                          fullWidth
                          value={newContract.residence}
                          onChange={handleData}
                          variant="outlined"
                        >
                          {residencesOptions.map((residence) => (
                            <MenuItem
                              key={residence.idResidence}
                              value={residence.idResidence}
                            >
                              {`${residence.street} - ${residence.cologne} - ${residence.ciudad}, ${residence.state}, ${residence.pais} - ${residence.postalCode}`}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Departamento"
                          name="departament"
                          select
                          fullWidth
                          value={newContract.departament}
                          onChange={handleData}
                          variant="outlined"
                        >
                          {departamentsOptions.length > 0 ? (
                            departamentsOptions.map((departament) => (
                              <MenuItem
                                key={departament.idDepartament}
                                value={departament.idDepartament}
                              >
                                {departament.departamentNumber}
                              </MenuItem>
                            ))
                          ) : (
                            <Typography>
                              {departamentsOptions.message}
                            </Typography>
                          )}
                        </TextField>
                      </Grid>
                    </Grid>
                  </form>
                  <Box display="flex" justifyContent="end">
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleCancelNewContract}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={handleInsertNewContract}
                        >
                          Crear Contrato
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Box>

                  <Dialog
                    open={openConfirmationContract}
                    onClose={handleCloseConfirmationContract}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Contrato Generado
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        El contrato se ha generado correctamente. Tu nombre de
                        usuario es: {dataAccount.username}
                        tu contraseña es: {dataAccount.password}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseConfirmationContract}
                        color="primary"
                        autoFocus
                      >
                        Cerrar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Paper>
            </Box>
          )}

          {Object.keys(tenantinformation).length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" align="center">
                {editMode
                  ? "Edita los campos disponibles"
                  : "Información del Inquilino Seleccionado"}
              </Typography>
              <Button
                startIcon={<EditIcon />}
                color="secondary"
                variant="contained"
                onClick={() => handleEditClick()}
              >
                Editar Información
              </Button>
              <TableContainer component={Paper} style={{ marginTop: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={4}></TableCell>
                    </TableRow>
                    {/* Datos del usuario */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Nombre
                      </TableCell>
                      <TableCell>{tenantinformation.user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Apellidos
                      </TableCell>
                      <TableCell>{`${tenantinformation.user.surname} ${tenantinformation.user.secondSurname}`}</TableCell>
                    </TableRow>
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Email
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={tenantinformation.user.email}
                            onChange={(e) =>
                              handleFieldChange("email", e.target.value)
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Email
                        </TableCell>
                        <TableCell>{tenantinformation.user.email}</TableCell>
                      </TableRow>
                    )}
                    {/* Información del inquilino */}
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={4}></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Ciudad
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.ciudad}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Estado
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.estado}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        País
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.pais}
                      </TableCell>
                    </TableRow>
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Trabajo
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={tenantinformation.tenantInformation.job}
                            onChange={(e) =>
                              handleFieldChange("job", e.target.value)
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Trabajo
                        </TableCell>
                        <TableCell>
                          {tenantinformation.tenantInformation.job}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Tipo de Sangre
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.bloodType}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Fecha de nacimiento
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.birthdate}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Fecha de registro
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.registerDate}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Hora de registro
                      </TableCell>
                      <TableCell>
                        {tenantinformation.tenantInformation.registerTime}
                      </TableCell>
                    </TableRow>
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          No. de INE
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={
                              tenantinformation.tenantInformation.ineNumber
                            }
                            onChange={(e) =>
                              handleFieldChange("ineNumber", e.target.value)
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          No. de INE
                        </TableCell>
                        <TableCell>
                          {tenantinformation.tenantInformation.ineNumber}
                        </TableCell>
                      </TableRow>
                    )}
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          No. de Seguro
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={
                              tenantinformation.tenantInformation.socialSecurity
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "socialSecurity",
                                e.target.value
                              )
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          No. de Seguro
                        </TableCell>
                        <TableCell>
                          {tenantinformation.tenantInformation.socialSecurity}
                        </TableCell>
                      </TableRow>
                    )}
                    {/* Agrega más detalles del inquilino según sea necesario */}
                    {/* Información de contacto del inquilino */}
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={4}></TableCell>
                    </TableRow>
                    {tenantinformation.tenantContacts.map((contact) => (
                      <TableRow key={contact.idTenantContact}>
                        <TableCell component="th" scope="row">
                          Tipo de contacto
                        </TableCell>
                        <TableCell>
                          {editMode ? (
                            <Select
                              key={contact.idTenantContact}
                              value={contact.type}
                              onChange={(e) =>
                                handleFieldChange(
                                  "type",
                                  e.target.value,
                                  contact.idTenantContact
                                )
                              }
                            >
                              {typePhoneOptions.map((option) => (
                                <MenuItem
                                  key={option.idTypePhone}
                                  value={option.type}
                                >
                                  {option.type}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            contact.type
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Teléfono
                        </TableCell>
                        <TableCell>
                          {editMode ? (
                            <TextField
                              value={contact.phone}
                              onChange={(e) =>
                                handleFieldChange(
                                  "phone",
                                  e.target.value,
                                  contact.idTenantContact
                                )
                              }
                            />
                          ) : (
                            contact.phone
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Agrega más detalles de contacto según sea necesario */}
                    {/* Información de la cuenta del inquilino */}
                    <TableRow style={{ backgroundColor: "#1976d2" }}>
                      <TableCell colSpan={4}></TableCell>
                    </TableRow>
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Nombre de la cuenta
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={tenantinformation.account.accountName}
                            onChange={(e) =>
                              handleFieldChange("accountName", e.target.value)
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Nombre de la cuenta
                        </TableCell>
                        <TableCell>
                          {tenantinformation.account.accountName}
                        </TableCell>
                      </TableRow>
                    )}
                    {editMode ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Contraseña
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={tenantinformation.account.password}
                            onChange={(e) =>
                              handleFieldChange("password", e.target.value)
                            }
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Contraseña
                        </TableCell>
                        <TableCell>
                          {tenantinformation.account.password}
                        </TableCell>
                      </TableRow>
                    )}
                    {/* Agrega más detalles de la cuenta según sea necesario */}
                  </TableBody>
                </Table>
              </TableContainer>
              {editMode && (
                <Box display="flex" justifyContent="end">
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handleSaveChanges}
                      >
                        Guardar cambios
                      </Button>
                    </TableCell>
                  </TableRow>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};



export default ContractsAdmin;