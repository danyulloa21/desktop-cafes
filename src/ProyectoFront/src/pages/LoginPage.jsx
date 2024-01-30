// // LoginPage.jsx

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../servicios/API-Inquilinos/api_Inquilinos';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function LoginPage() {
  const nav = useNavigate();
  const { user, setUser } = useAppContext();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userData = {
      username: data.get('email'),
      password: data.get('password'),
    };

    login(userData).then((res) => {
      alert('Inicio de Sesion Exitoso');
      // console.log(res);
      
      setUser(res);
      if (res.usertype.userTypeName === "INQUILINO") {
        nav('/dashboard', {state: res});
      } else {
        nav('/admin-deudas');
      }
      console.log(user);
      
    }).catch((err) => {
      alert(err);
      console.log(err);
    });
    
    // console.log(userData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", // Optional for vertical centering
          
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                mb: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "35px"
              }}
            >
              DEPARTAMENTOS
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}









// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../servicios/api'; // Importa la función de inicio de sesión desde tu archivo api.js

// function Login() {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState(null);
//   const nav = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await login(credentials);
//       // Si la autenticación fue exitosa, aquí puedes realizar acciones como guardar el token y redirigir al usuario a la página de inicio.
//       console.log('Autenticación exitosa');
//       setError('');
//       // Redirige al usuario a la página Dashboard después del inicio de sesión exitoso.
//       nav('/dashboard', {state : res});


//     } catch (error) {
//       setError('Error al iniciar sesión. Verifica tus credenciales.');
//       console.error('Error al iniciar sesión', error);
//     }


//   };

//   return (
//     <div>
//       <h2>Iniciar Sesión</h2>
//       {error && <p>{error}</p>}
//       <input
//         type="text"
//         placeholder="Username"
//         value={credentials.username}
//         onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={credentials.password}
//         onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
