import React from "react";
import { useAppContext } from "../../AppContext";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import DebtsDetails from "./DebtsDetails";

function Dashboard() {
  const { user, handleLogout } = useAppContext();
  // console.log(user);
  return (
    <div>
      <ResponsiveAppBar/>
      <DebtsDetails/>
      {/* Resto del contenido de Dashboard */}
    </div>
  );
}

export default Dashboard;
