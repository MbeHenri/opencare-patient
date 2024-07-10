/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import User from "../../models/User";
import Patient from "../../models/Patient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Medication {
  start_date: string;
  drug_name: string;
  dosage: string;
  strength: string;
  dose: number;
  route: string;
  duration: number;
  duration_units: string;
  frequency: string;
  order_reason: any;
  quantity: number;
  quantity_units: string;
}

function Medicamentation() {
  const { user, logout } = useAuth();
  //const [userData, setUserData] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [O3ID, setO3ID] = useState("");
  const navigate = useNavigate();

  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const medication: Medication[] = [];
    const func = async () => {
      await api
        .get(`/patient/${O3ID}/medication`)
        .then(function (response) {
          if (response.status === 200) {
            response.data.results.map((item: any) => {
              medication.push({
                start_date: formattedDate(new Date(item.dateActivated)),
                drug_name: item.drug.display,
                dosage: item.drug.dosageForm.display,
                strength: item.drug.strength,
                dose: item.dose,
                route: item.route.display,
                duration: item.duration,
                duration_units: item.durationUnits.display,
                frequency: item.frequency.display,
                order_reason: item.orderReasonNonCoded,
                quantity: item.quantity,
                quantity_units: item.quantityUnits.display,
              });
            });
            setMedications(medication);
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

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
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
    if (value === "visionneuse") {
      navigate("/visionneuse");
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
  return (
    <>
      {user ? (
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
                className="btn btn-primary rounded-4 mx-1 p-2"
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
                Médicaments en cours
              </span>
            </h5>
            <table className="table">
              <thead className="table-info text-start">
                <tr>
                  <th>Date de prescription</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((medication) => (
                  <tr key={medication.drug_name}>
                    <td>{medication.start_date}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <p>
                          <b>{medication.drug_name}</b>
                        </p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>{medication.strength}</p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>{medication.dosage}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>
                          DOSE&nbsp;
                          <b>
                            {medication.dose}&nbsp;{medication.dosage}
                          </b>
                        </p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>{medication.route}</p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>{medication.frequency}</p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>
                          for&nbsp;{medication.duration}&nbsp;
                          {medication.duration_units}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>
                          INDICATION&nbsp;
                          {medication.order_reason}&nbsp;{medication.dosage}
                        </p>
                        <p>&nbsp;-&nbsp;</p>
                        <p>
                          QUANTITE&nbsp;{medication.quantity}&nbsp;
                          {medication.quantity_units}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row my-5">
            <h5 className="mb-4">
              <span className="border-b-4 border-sky-500">
                Médicaments passé
              </span>
            </h5>
            <table className="table">
              <thead className="table-info text-start">
                <tr>
                  <th>Date de prescription</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    Aucune données trouvées pour la médicamentation passée
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="container caviar_dreams">
          <h6>
            Vous n'êtes pas connecté. Veillez vous connecter pour accéder à
            votre dossier médical
          </h6>
        </div>
      )}
    </>
  );
}

export default Medicamentation;
