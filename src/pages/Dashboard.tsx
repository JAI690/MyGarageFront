import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {role && <p>You are logged in as: <strong>{role}</strong></p>}
    </div>
  );
};

export default Dashboard;
