import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { getAccountInfo } from "../../servicios/API-Inquilinos/api_Inquilinos"
import { useAppContext } from '../../AppContext'

const AccountPage = () => {
  const { user } = useAppContext();
  const [accountInfo, setAccountInfo] = useState({});
  const [userPhones, setUserPhones] = useState({})

  // useEffect(() => {
  //   console.log(accountInfo);
  //   console.log(userPhones);
  // }, [accountInfo, userPhones]);

  useEffect(() => {
    if (user && user.idUser) {
      // Llama a getAccountInfo cuando el usuario se carga por primera vez

      const data = {userid: user.idUser};

      getAccountInfo(data)
        .then((res) => {
          const {userinfo , phones} = res;
          setAccountInfo(userinfo);
          setUserPhones(phones);
          
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [user]);


  return (
    <>
      <ResponsiveAppBar userInfo={user}/>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Información de la Cuenta
          </Typography>
          <div>
            <Typography variant="h6">Información de Contacto</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  value={`${accountInfo.name} ${accountInfo.surname} ${accountInfo.secondSurname}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={accountInfo.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Pais de Nacimiento"
                  value={accountInfo.countryName}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Estado de Nacimiento"
                  value={accountInfo.stateName}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Cuidad de Nacimiento"
                  value={accountInfo.cityName}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Trabajo"
                  value={accountInfo.job}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Numero de Seguro Social"
                  value={accountInfo.socialSecurity}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Fecha de Nacimiento"
                  value={accountInfo.birthdate}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="No. de INE"
                  value={accountInfo.ineNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Tipo de Sangre"
                  value={accountInfo.bloodType}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Typography variant="h6">Información de Residencia</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="No. de Departamento"
                  value={accountInfo.departamentNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Dirección"
                  value={accountInfo.street}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="C.P"
                  value={accountInfo.postalCode}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Colonia"
                  value={accountInfo.cologne}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Cuidad de Residencia"
                  value={accountInfo.residenceCity}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                  style={{ marginLeft: "-50%" }}
                />
              </Grid>
            </Grid>
            <Typography variant="h6">Teléfonos</Typography>

            {Array.isArray(userPhones) && userPhones.length > 0 ? (
              userPhones.map((phone, index) => (
                <TextField
                  key={index}
                  label={phone.type}
                  value={phone.phone}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
              ))
            ) : (
              <Typography>No phone information available</Typography>
            )}
          </div>
          {/* Otros datos del usuario pueden ir aquí */}
        </Paper>
      </Container>
    </>
  );
};

export default AccountPage;
