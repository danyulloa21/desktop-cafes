const BASE_URL = 'http://localhost:3000';

export const ApiDebtsAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-debts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};

export const ApiPaymentsAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};

export const ApiContractsAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};
export const ApiResidencesAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-residences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};
export const ApiWarningsAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-warnings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};
export const ApiRulesAdmin = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin-rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.json()); // Invoke response.json() as a function
    }
  } catch (error) {
    throw error;
  }
};


