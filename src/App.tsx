import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./screens/Home/Home";
import Register from "./components/register/Register";
import Teleconsultation from "./screens/teleconsultation/Teleconsultation";
import ResetPassword from "./components/resetpassword/ResetPassword";
import Service from "./screens/Services/Service";
import Appointement from "./screens/Appointement/Appointement";
import DossierMedical from "./screens/DossierMedical/DossierMedical";
import Contact from "./screens/contact/Contact";
import Paiement from "./screens/Paiement/Paiement";
import Profile from "./screens/Profile/Profile";
import Allergie from "./screens/Allergie/Allergie";
import Medicamentation from "./screens/Medicamentation/Medicamentation";
import SignesVitaux from "./screens/SignesVitaux/SignesVitaux";
import Condition from "./screens/Condition/Condition";
import Programme from "./screens/Programme/Programme";
import Immunisation from "./screens/Immunisation/Immunisation";
import Visionneuse from "./screens/Visionneuse/Visionneuse";
import DemandeService from "./screens/DemandeService/DemandeService";
import PiecesJointes from "./screens/PiecesJointes/PiecesJointes";
import PatientAppointement from "./screens/PatientAppointement/PatientAppointement";
import Dashboard from "./screens/Dashboard/Dashboard";
import Visite from "./screens/Visite/Visite";
import Header from "./components/header/Header";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import DetailsFacture from "./screens/DetailsFacture/DetailsFacture";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teleconsultation/:url"
            element={
              <ProtectedRoute>
                <Teleconsultation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointement"
            element={
              <ProtectedRoute>
                <Appointement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dossier_medical"
            element={
              <ProtectedRoute>
                <DossierMedical />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paiement/:uuidAppointment"
            element={
              <ProtectedRoute>
                <Paiement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allergie"
            element={
              <ProtectedRoute>
                <Allergie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visionneuse"
            element={
              <ProtectedRoute>
                <Visionneuse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visite"
            element={
              <ProtectedRoute>
                <Visite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicamentation"
            element={
              <ProtectedRoute>
                <Medicamentation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signes_vitaux"
            element={
              <ProtectedRoute>
                <SignesVitaux />
              </ProtectedRoute>
            }
          />
          <Route
            path="/condition"
            element={
              <ProtectedRoute>
                <Condition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programme"
            element={
              <ProtectedRoute>
                <Programme />
              </ProtectedRoute>
            }
          />
          <Route
            path="/immunisation"
            element={
              <ProtectedRoute>
                <Immunisation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/demande_service"
            element={
              <ProtectedRoute>
                <DemandeService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pieces_jointes"
            element={
              <ProtectedRoute>
                <PiecesJointes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient_appointement"
            element={
              <ProtectedRoute>
                <PatientAppointement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details_invoice/:appointment_uuid/:idInvoice/:service_name"
            element={
              <ProtectedRoute>
                <DetailsFacture />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
