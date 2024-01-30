// api.js

const BASE_URL = 'http://localhost:3000'; // Cambia esto a la URL de tu servidor de API

// Función para iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Devuelve la respuesta de la API (por ejemplo, token de autenticación)
    } else {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  } catch (error) {
    throw error; // Maneja errores de red o de la API
  }
};

export const getAccountInfo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/accountpage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Devuelve la respuesta de la API (por ejemplo, token de autenticación)
    } else {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  } catch (error) {
    throw error; // Maneja errores de red o de la API
  }
};

export const getDebtDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/debts-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Devuelve la respuesta de la API (por ejemplo, token de autenticación)
    } else {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  } catch (error) {
    throw error; // Maneja errores de red o de la API
  }
};
export const getPaymentHistory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/history-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Devuelve la respuesta de la API (por ejemplo, token de autenticación)
    } else {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  } catch (error) {
    throw error; // Maneja errores de red o de la API
  }
};
export const getWarnings = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/show-warnings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Devuelve la respuesta de la API (por ejemplo, token de autenticación)
    } else {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  } catch (error) {
    throw error; // Maneja errores de red o de la API
  }
};