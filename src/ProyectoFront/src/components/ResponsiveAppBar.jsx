import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import SessionExpiredPopup from "./SessionExpiredPopup";

const pagesInquilino = ["Deudas", "Historial de Pagos", "Avisos", "Reglas"];
const pagesAdmin = ["Deudas", "Historial de Pagos", "Contratos", "Residencias", "Avisos", "Reglas"];
const settings = ["Cuenta", "Cerrar Sesión"];

function ResponsiveAppBar() {
  const nav = useNavigate();
  const { user, handleLogout } = useAppContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (opt) => {
    setAnchorElNav(null);
    if (user.usertype.userTypeName === "INQUILINO"){
      const pageToRoute = {
        Deudas: "/deudas",
        "Historial de Pagos": "/pagos",
        Avisos: "/avisos",
        Reglas: "/reglas",
      };
      nav(pageToRoute[opt]);
    } else {
      const pageToRoute = {
        Deudas: "/admin-deudas",
        "Historial de Pagos": "/admin-pagos",
        Contratos: "/admin-contratos",
        Residencias: "/admin-residencias",
        Avisos: "/admin-avisos",
        Reglas: "/admin-reglas",
      };
      nav(pageToRoute[opt]);
    }

    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => nav("/dashboard")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DEPARTAMENTOS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {user.usertype.userTypeName === "INQUILINO"
                  ? pagesInquilino.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                      >
                        <Button>
                          <Typography textAlign="center">{page}</Typography>
                        </Button>
                      </MenuItem>
                    ))
                  : pagesAdmin.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                      >
                        <Button>
                          <Typography textAlign="center">{page}</Typography>
                        </Button>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => nav("/dashboard")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DEPARTAMENTOS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {user.usertype.userTypeName === "INQUILINO"
                ? pagesInquilino.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))
                : pagesAdmin.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      flexGrow: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    {user.usertype.userTypeName === "INQUILINO"
                      ? "Inquilino:"
                      : "Admin:"}
                  </Typography>
                  <Typography
                    sx={{ mx: 2, my: 2, color: "white", display: "block" }}
                  >
                    {user.accountName}
                  </Typography>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={
                        setting === "Cerrar Sesión"
                          ? handleLogout
                          : setting === "Cuenta"
                          ? () => {
                              nav("/accountpage");
                            }
                          : undefined
                      }
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
