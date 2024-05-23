import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import api from "../../api/axios";
import axios from "axios";
import PatientService from "../../services/patient";
import Patient from "../../models/Patient";
import Doctor from "../../models/Doctor";
import RoomButton from "../RoomButton";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Frame from "../frame/Frame";
import Bloc3 from "../bloc3/Bloc3";

interface User {
  username: string;
  display: string;
}

function Teleconsultation(): JSX.Element {
  const { user, logout } = useAuth();
  //const [userData, setUserData] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [O3ID, setO3ID] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  //const o3_id = "ad7fe8c1-339c-497a-b95a-73785d040b57";
  //const docteur_uuid = "cce13a9b-e3be-4a0c-8d16-fc51e30bed8b";
  const patient_service = PatientService.getInstance();
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [dossier, setDossier] = useState<Patient | null>(null);
  const [doctors, setDoctors] = useState<Array<Doctor> | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        //setUserData("data");
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token manquant");
        }
        const response = await api.get("/protected", {
          headers: {
            Authorization: token,
          },
        });
        //console.log(response.data);
        setO3ID(response.data.uuid);
        setUserData(response.data.display);
      } catch (error) {
        console.error("Erreur de récupération des données protégées:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const func = async () => {
      await patient_service.getPatient(O3ID).then((patient) => {
        setPatientDetails(patient);
      });
      await patient_service.getVisits(O3ID).then((dossier: any) => {
        console.log(dossier);
        setDossier(dossier);
      });
      await patient_service.getRelatedDoctors(O3ID).then((doctors) => {
        setDoctors(doctors);
      });
    };
    func();
    return () => {};
  }, [O3ID]);

  const handleClick = useCallback((url: string) => {
    setUrl(url);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      {userData ? (
        <div>
          <div className="container">
            <Header />
            <div className="row mb-5">
              <h2 className="text-uppercase text-center mt-4 text-blue-500">
                royal clinique
              </h2>
              <h4 className="text-center">
                Téléconsultation avec le Dr. Yoning François
              </h4>
              <p className="text-center">Chirugien dentiste</p>
              <hr />
              <div className="col-md-7">
                <Frame />
              </div>
              <div className="col-md-5 border">
                <Bloc3 />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center my-5">Tableau de bord</h2>
          <div className="d-flex align-items-center">
            <h4 className=" my-5 text-center mx-2">
              Connectez-vous pour accéder à votre tableau de bord
            </h4>
            <button className="btn btn-secondary" onClick={handleLogin}>
              Se connecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Teleconsultation;
