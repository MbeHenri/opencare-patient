import React from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
