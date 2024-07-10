import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Visionneuse.css";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import Accordeon from "../../components/accordeon/Accordeon";
import { useAuth } from "../../context/AuthContext";

function Visionneuse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

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
              className="btn btn-primary rounded-4 mx-1 p-2"
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
            <span className="border-b-4 border-sky-500">
              Resultats des tests
            </span>
          </h5>

          <Accordeon
            title={"Hématologie"}
            content={"Contenu de la section 1"}
          />
          <Accordeon
            title={"Bloodwork"}
            content={
              <table className="table table-sm">
                <thead className="table-secondary p-4">
                  <tr className="">
                    <th className="p-2" colSpan={4}>
                      Numérotation globulaire complète
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th className="p-2">Type de test</th>
                    <th>Date</th>
                    <th>Résultats</th>
                    <th>Interval normal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Coproculture</td>
                    <td>15 février 2024, 09:24</td>
                    <td>
                      Appearance of brights and deposits aginst a blue
                      background
                    </td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td>Coproculture</td>
                    <td>15 février 2024, 09:24</td>
                    <td>
                      Appearance of brights and deposits aginst a blue
                      background
                    </td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            }
          />
          <Accordeon title={"Section 3"} content={"Contenu de la section 3"} />
        </div>
      </div>
    </>
  );
}

export default Visionneuse;
