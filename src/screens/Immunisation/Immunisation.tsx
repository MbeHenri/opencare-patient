import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import User from "../../models/User";
import Patient from "../../models/Patient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Immunization {
  vaccine: string;
  dose: number;
  //recent_vaccination_dose: number;
  recent_vaccination_date: string;
  vaccination_date: string;
  expiration_date: string;
}

function Immunisation() {
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");

  const [immunizations, setImmunizations] = useState<Immunization[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const immunization: Immunization[] = [];
    const func = async () => {
      await api
        .get(`/patient/${O3ID}/immunization`)
        .then(function (response) {
          if (response.status === 200) {
            response.data.results.map((item: any) => {
              immunization.push({
                vaccine: item.resource.vaccineCode.text,
                dose: item.resource.protocolApplied[0].doseNumberPositiveInt,
                recent_vaccination_date: formattedDate(
                  new Date(item.resource.meta.lastUpdated)
                ),
                vaccination_date: formattedTime(
                  new Date(item.resource.occurrenceDateTime)
                ),
                expiration_date: formattedDate(
                  new Date(item.resource.expirationDate)
                ),
              });
            });
            setImmunizations(immunization);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();
    return () => {};
  }, [O3ID]);

  const navigate = useNavigate();

  const formattedDate = (date: Date): string => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  const formattedTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // L'heure 0 doit être 12
    const heure = String(hours).padStart(2, "0");

    return `Aujourd'hui, ${heure}:${minutes} ${period}`;
  };

  const handleClick = (e: any) => {
    const value = e.target.id;
    if (value === "signes_vitaux") {
      navigate("/signes_vitaux");
    }
    if (value === "medicamentation") {
      navigate("/medicamentation");
    }
    if (value === "medicamentation") {
      navigate("/medicamentation");
    }
    if (value === "visite") {
      navigate("/visite");
    }
    if (value === "allergie") {
      navigate("/allergie");
    }
    if (value === "visionneuse") {
      navigate("/visionneuse");
    }
    if (value === "condition") {
      navigate("/condition");
    }
    if (value === "immunisation") {
      navigate("/immunisation");
    }
    if (value === "pieces_jointes") {
      navigate("/pieces_jointes");
    }
    if (value === "programme") {
      navigate("/programme");
    }
    if (value === "patient_appointement") {
      navigate("/patient_appointement");
    }
    if (value === "demande_service") {
      navigate("/demande_service");
    }
  };

  if (!user)
    return (
      <div className="container caviar_dreams">
        <h6>
          Vous n'êtes pas connecté. Veillez vous connecter pour accéder à votre
          dossier médical
        </h6>
      </div>
    );

  return (
    <>
      <div className="container caviar_dreams">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            Mon dossier médical
          </h2>
        </div>
        <hr className="mb-5" />
        <div className="row">
          <div className="btn-group">
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="signes_vitaux"
              onClick={handleClick}
            >
              Signes vitaux et biométriques
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="medicamentation"
              onClick={handleClick}
            >
              Médicamentations
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="visionneuse"
              onClick={handleClick}
            >
              Visioneuse de résultats
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="visite"
              onClick={handleClick}
            >
              Visites
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="allergie"
              onClick={handleClick}
            >
              Allergies
            </button>
          </div>
        </div>
        <div className="row my-3">
          <div className="btn-group">
            <button
              className="btn btn-secondary rounded-5 mx-1 p-2"
              id="condition"
              onClick={handleClick}
            >
              Conditions
            </button>
            <button
              className="btn btn-primary rounded-4 mx-1 p-2"
              id="immunisation"
              onClick={handleClick}
            >
              Immunisations
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="pieces_jointes"
              onClick={handleClick}
            >
              Pièces jointes
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="programme"
              onClick={handleClick}
            >
              Programme
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="patient_appointement"
              onClick={handleClick}
            >
              Rendez-vous
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
              id="demande_service"
              onClick={handleClick}
            >
              Demandes de services
            </button>
          </div>
          <hr className="my-5" />
          <DescriptionPatient />
        </div>
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">Immunisations</span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th colSpan={3}>Vaccin</th>
              </tr>
            </thead>
            {immunizations.map((immunization) => (
              <>
                <thead
                  className="table-secondary text-start"
                  key={immunization.vaccine}
                >
                  <tr>
                    <th>{immunization.vaccine}</th>
                    <th colSpan={2}>
                      Dose unique le {immunization.recent_vaccination_date}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>
                      <p>Nombre de dose</p>
                      <p>{immunization.dose}</p>
                    </td>
                    <td>
                      <p>Date de vaccination</p>
                      <p>{immunization.vaccination_date}</p>
                    </td>
                    <td>
                      <p>Date d'expiration</p>
                      <p>{immunization.expiration_date}</p>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Immunisation;
