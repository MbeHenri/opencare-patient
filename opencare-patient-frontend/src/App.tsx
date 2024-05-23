//import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Teleconsultation from "./components/teleconsultation/Teleconsultation";
import ResetPassword from "./components/resetpassword/ResetPassword";
import Medecin from "./components/medecin/Medecin";
import ProfilMedecin from "./components/profil_medecin/ProfilMedecin";
import Appointement from "./components/appointement/Appointement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/teleconsultation" element={<Teleconsultation />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/medecin" element={<Medecin />}></Route>
        <Route path="/profilmedecin" element={<ProfilMedecin />}></Route>
        <Route path="/appointement" element={<Appointement />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
