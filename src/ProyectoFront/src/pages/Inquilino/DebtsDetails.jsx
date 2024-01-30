import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { useAppContext } from '../../AppContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { getAccountInfo, getDebtDetails } from '../../servicios/API-Inquilinos/api_Inquilinos';

function DebtsDetails() {
  const { user, handleLogout } = useAppContext();
  const [ detallesDeudas, setdetallesDeudas] = useState([]);
  useEffect(() => {
    // console.log(user);
    if (user) {
      const idUserInfo = { userid: user.idUser };
      getAccountInfo(idUserInfo)
        .then((res) => {
          const { userinfo } = res;
          const idUserDepartment = userinfo.idUserDepartament
          // console.log(idUserDepartment)
          const idData = {
            iduserdepartment: idUserDepartment,
          };
          getDebtDetails(idData)
            .then((res2) => {
              // console.log(res2);
              setdetallesDeudas(res2);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((e) => console.error(e));
    } else {
      alert("No se encontraron deudas");
    }
  }, []);
  
  

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
              <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Concepto</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Fecha de Deuda</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Monto</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detallesDeudas.map((debt, index) => (
                  <TableRow key={index}>
                    <TableCell>{debt.concept}</TableCell>
                    <TableCell>{new Date(debt.debtDate).toLocaleDateString()}</TableCell>   
                    <TableCell>{debt.amount}</TableCell>
                    <TableCell>{debt.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}

export default DebtsDetails;
