import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { useAppContext } from "../../AppContext";

const UserRules = () => {
  const { user } = useAppContext();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3}>
      <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
        Reglas del usuario:
      </Typography>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : rules.length > 0 ? (
        <ul>
          {rules.map((rule, index) => (
            <Typography key={index}>{rule.rule}</Typography>
          ))}
        </ul>
      ) : (
        <Typography>No se encontraron reglas.</Typography>
      )}
      </Paper>
      </Container>
    </div>
  );
};

export default UserRules;
