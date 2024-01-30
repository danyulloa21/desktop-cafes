import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { ApiPaymentsAdmin } from "../../servicios/API-Admin/api_Admins";
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";

const PaymentsAdmin = () => {
  const [payments, setPayments] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [selectedDebtId, setSelectedDebtId] = useState(null)
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const generatePayments = () => {
    const data = {
      opt: "consultarregistros",
    };

    ApiPaymentsAdmin(data)
      .then((res) => {
        if (res.success) {
          setPayments(res.data);
          console.log(res);
        } else {
          setPayments([]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    generatePayments();
    // Desactiva la bandera de recarga de datos después de recargar los datos
    setReloadData(false);
  }, [reloadData]);

  const handleDeletePayment = (idPayment, idDebt) => {
    // Mostrar el cuadro de confirmación
    setSelectedPaymentId(idPayment);
    setSelectedDebtId(idDebt);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Aquí deberías implementar la lógica para eliminar el pago con el id proporcionado
    console.log(`Eliminar pago con ID: ${selectedPaymentId} y deuda con ID ${selectedDebtId}`);

    const data = {
      opt: 'editarregistro',
      idPayment: selectedPaymentId,
      idDebt: selectedDebtId
    };

    ApiPaymentsAdmin(data)
      .then((res) => {
        if (res.success) {
          console.log(res);
          setReloadData(true);
        }
      })
      .catch((e) => console.log(e));

    // Cerrar el cuadro de confirmación
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    // Cancelar la eliminación y cerrar el cuadro de confirmación
    setSelectedPaymentId(null);
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ margin: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Lista de Pagos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nombre Completo</b>
                </TableCell>
                <TableCell>
                  <b>Ciudad</b>
                </TableCell>
                <TableCell>
                  <b>Estado</b>
                </TableCell>
                <TableCell>
                  <b>País</b>
                </TableCell>
                <TableCell>
                  <b>Concepto</b>
                </TableCell>
                <TableCell>
                  <b>Monto</b>
                </TableCell>
                <TableCell>
                  <b>Tipo de Pago</b>
                </TableCell>
                <TableCell>
                  <b>Fecha de Deuda</b>
                </TableCell>
                <TableCell>
                  <b>Fecha de Pago</b>
                </TableCell>
                <TableCell>
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.idPayment}>
                  <TableCell>{`${payment.name} ${payment.surname} ${payment.secondSurname}`}</TableCell>
                  <TableCell>{payment.ciudad}</TableCell>
                  <TableCell>{payment.estado}</TableCell>
                  <TableCell>{payment.pais}</TableCell>
                  <TableCell>{payment.concept}</TableCell>
                  <TableCell>{`$${parseFloat(payment.amount).toFixed(
                    2
                  )}`}</TableCell>
                  <TableCell>{payment.paymentTypeName}</TableCell>
                  <TableCell>
                    {new Date(payment.debtDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="error"
                      onClick={() => handleDeletePayment(payment.idPayment, payment.idDebt)}
                    >
                      <DeleteForeverOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Cuadro de confirmación */}
        <Dialog
          open={isConfirmationDialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              ¿Estás seguro de que deseas eliminar esta deuda?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default PaymentsAdmin;
