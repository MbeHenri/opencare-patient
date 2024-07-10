import React from "react";
import { useAuth } from "../../context/AuthContext";

function Welcome() {
  const { user } = useAuth();
  //console.log("welcome message", user);
  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p> // Affiche un message de bienvenue si l'utilisateur est connecté
      ) : (
        <p>Please log in to access more features.</p> // Affiche un message demandnt de se connecter si l'utilisteur n'est ps connecté
      )}
    </div>
  );
}

export default Welcome;
