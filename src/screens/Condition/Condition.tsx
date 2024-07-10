import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import User from "../../models/User";
import Patient from "../../models/Patient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Condition {
  libelle: string;
  date_debut: string;
  statut: string;
}

function Condition() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [O3ID, setO3ID] = useState("");
  const [conditions, setConditions] = useState<Condition[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const condition: Condition[] = [];
    const func = async () => {
      await api
        .get(`/patient/${O3ID}/condition`)
        .then(function (response) {
          if (response.status === 200) {
            response.data.results.map((item: any) => {
              let date = "--";
              if (item.resource.onsetDateTime) {
                date = formattedDate(new Date(item.resource.onsetDateTime));
              }
              condition.push({
                libelle: item.resource.code.text,
                date_debut: date,
                statut: item.resource.clinicalStatus.coding[0].code,
              });
            });
            setConditions(condition);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();
    return () => {};
  }, [O3ID]);

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

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
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
              className="btn btn-primary rounded-5 mx-1 p-2"
              id="condition"
              onClick={handleClick}
            >
              Conditions
            </button>
            <button
              className="btn btn-secondary rounded-4 mx-1 p-2"
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
            <span className="border-b-4 border-sky-500">Conditions</span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th>Conditions</th>
                <th>Date début</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((condition) => (
                <tr key={condition.libelle}>
                  <td>{condition.libelle}</td>
                  <td>{condition.date_debut}</td>
                  <td className="text-capitalize">{condition.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Condition;
