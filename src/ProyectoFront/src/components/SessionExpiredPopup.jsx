import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const SessionExpiredPopup = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ruta actual


  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Muestra el pop-up si el usuario es undefined
    if (!user && location.pathname !== '/') {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [user]);

  const handleLoginClick = () => {
    // Redirige al usuario a la página de inicio de sesión
    navigate('/');
  };

  return (
    <Dialog open={showPopup} onClose={handleLoginClick}>
      <DialogContent>
        <div>
          <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Iniciar sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiredPopup;
