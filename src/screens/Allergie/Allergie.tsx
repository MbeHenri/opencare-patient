import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import User from "../../models/User";
import Patient from "../../models/Patient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Manifestation {
  text: string;
}

interface Allergie {
  allergen: string;
  severity: string;
  reaction: Manifestation[];
  onset_date_comment: any;
}

function Allergie() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [O3ID, setO3ID] = useState("");
  const [allergies, setAllergies] = useState<Allergie[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const allergie: Allergie[] = [];
    const func = async () => {
      await api
        .get(`/patient/${O3ID}/allergie`)
        .then((response) => {
          if (response.status === 200) {
            const res = response.data.results;
            res.forEach((element: any, i: number) => {
              allergie.push({
                allergen: element.code.text,
                severity: element.reaction[0].severity,
                reaction: element.reaction[0].manifestation,
                onset_date_comment: element.note[0].text,
              });
            });
            setAllergies(allergie);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    func();
    return () => {};
  }, [O3ID]);

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
              className="btn btn-primary rounded-4 mx-1 p-2"
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
            <span className="border-b-4 border-sky-500">Allergies</span>
          </h5>
          <table className="table table-sm border border-secondary">
            <thead className="table-info text-start">
              <tr>
                <th>Allergène</th>
                <th>Gravité et réaction</th>
                <th>Réaction</th>
                <th>Date de début et commentaires</th>
              </tr>
            </thead>
            <tbody>
              {allergies.map((allergie) => (
                <tr key={allergie.allergen}>
                  <td>{allergie.allergen}</td>
                  <td className="text-capitalize">{allergie.severity}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {allergie.reaction.map((el) => (
                        <p className="mx-2" key={el.text}>
                          {el.text}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td>{allergie.onset_date_comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Allergie;
