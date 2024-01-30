import { AppProvider } from './AppContext'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import AccountPage from './pages/Inquilino/AccountPage'
import Dashboard from './pages/Inquilino/Dashboard'
import DebtsDetails from './pages/Inquilino/DebtsDetails'
import Login from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PaymentHistory from './pages/Inquilino/PaymentHistory'
import WarningsPage from './pages/Inquilino/WarningsPage'
import UserRules from './pages/Inquilino/UserRules'
import SessionExpiredPopup from '../src/components/SessionExpiredPopup' // Importa el componente SessionExpiredPopup
import DebtsAdmin from './pages/Admin/DebtsAdmin'
import PaymentsAdmin from './pages/Admin/PaymentsAdmin'
import ContractsAdmin from './pages/Admin/ContractsAdmin'
import ResidencesAdmin from './pages/Admin/ResidencesAdmin'
import WarningsAdmin from './pages/Admin/WarningsAdmin'
import RulesAdmin from './pages/Admin/RulesAdmin'
import RulesPage from './pages/Inquilino/RulesPage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <SessionExpiredPopup/>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/dashboard" Component={DebtsDetails} />
            <Route path="/accountpage" Component={AccountPage} />
            <Route path="/deudas" Component={DebtsDetails} />
            <Route path="/pagos" Component={PaymentHistory} />
            <Route path="/avisos" Component={WarningsPage} />
            <Route path="/reglas" Component={RulesPage} />
            <Route path="/admin-deudas" Component={DebtsAdmin} />
            <Route path="/admin-pagos" Component={PaymentsAdmin} />
            <Route path="/admin-contratos" Component={ContractsAdmin} />
            <Route path="/admin-residencias" Component={ResidencesAdmin} />
            <Route path="/admin-avisos" Component={WarningsAdmin} />
            <Route path="/admin-reglas" Component={RulesAdmin} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
} 

export default App

