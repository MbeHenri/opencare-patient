import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Observation {
  date: string;
  temperature: number | null;
  bloodPressureSystolic: string | null;
  bloodPressureDiastolic: string | null;
  spo2: number | null;
  respiratoryRate: number | null;
  pulse: number | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  muac: number | null;
}

function SignesVitaux() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");

  const [observations, setObservations] = useState<Observation[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchObservations = async () => {
      await api
        .get(`/patient/${O3ID}/observation`)
        .then((response) => {
          if (response.status === 200) {
            const obsArray = response.data?.results.map(
              (entry: any) => entry.resource
            );
            const extracted = extractObservations(obsArray);
            setObservations(extracted);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchObservations();
    return () => {};
  }, [O3ID]);

  const extractObservations = (observations: any[]): Observation[] => {
    const groupedObservations: { [key: string]: Observation } = {};

    observations.forEach((obs) => {
      const date = formattedDate(new Date(obs.effectiveDateTime));

      if (!groupedObservations[date]) {
        groupedObservations[date] = {
          date: date,
          temperature: null,
          bloodPressureSystolic: null,
          bloodPressureDiastolic: null,
          spo2: null,
          respiratoryRate: null,
          pulse: null,
          height: null,
          weight: null,
          bmi: null,
          muac: null,
        };
      }

      const coding = obs.code.coding.find((code: any) =>
        [
          "http://loinc.org",
          "http://snomed.info/sct/",
          "https://cielterminology.org",
        ].includes(code.system)
      );

      if (coding) {
        if (coding.code === "5088") {
          // CIEL code for body temperature
          groupedObservations[date].temperature = obs.valueQuantity.value;
        } else if (coding.code === "5085") {
          // CIEL code for systolic blood pressure
          groupedObservations[date].bloodPressureSystolic =
            obs.valueQuantity.value;
        } else if (coding.code === "5086" || coding.code === "35094-2") {
          // CIEL code for systolic blood pressure
          groupedObservations[date].bloodPressureDiastolic =
            obs.valueQuantity.value;
        } else if (coding.code === "5092") {
          // CIEL code for oxygen saturation
          groupedObservations[date].spo2 = obs.valueQuantity.value;
        } else if (coding.code === "5242") {
          // CIEL code for Respiratory rate
          groupedObservations[date].respiratoryRate = obs.valueQuantity.value;
        } else if (coding.code === "5087") {
          // CIEL code for Pulse
          groupedObservations[date].pulse = obs.valueQuantity.value;
        } else if (coding.code === "1343") {
          // CIEL code for Mid-upper arm circumference
          groupedObservations[date].muac = obs.valueQuantity.value;
        } else if (coding?.code === "5089" && obs.valueQuantity.unit === "kg") {
          // CIEL code for Weight
          groupedObservations[date].weight = obs.valueQuantity.value;
        } else if (coding?.code === "5090" && obs.valueQuantity.unit === "cm") {
          // CIEL code for Height
          groupedObservations[date].height = obs.valueQuantity.value;
        }
        // CIEL code for Karnofsky performance score 5283 units = %
      }
    });

    // Calculate Body Mass Indice (BMI) after all observations are grouped
    for (let date in groupedObservations) {
      const obs = groupedObservations[date];
      if (obs.weight && obs.height) {
        obs.bmi = Math.abs(obs.weight / (obs.height / 100) ** 2);
      }
    }

    return Object.values(groupedObservations);
  };

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
                className="btn btn-primary rounded-4 mx-1 p-2"
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
              <span className="border-b-4 border-sky-500">Signes vitaux</span>
            </h5>
            <table className="table">
              <thead className="table-info text-start">
                <tr>
                  <th>Date et heure</th>
                  <th className="text-center">Température (C)</th>
                  <th className="text-center">Pression sanguine (mmHg)</th>
                  <th className="text-center">Batement (beats/min)</th>
                  <th className="text-center">Taux R.</th>
                  <th className="text-center">SpO2 (%)</th>
                </tr>
              </thead>
              <tbody>
                {observations.map((obs, index) => (
                  <tr key={index}>
                    <td>{obs.date}</td>
                    <td>{obs.temperature !== null ? obs.temperature : "-"}</td>
                    <td>
                      {obs.bloodPressureSystolic !== null &&
                      obs.bloodPressureDiastolic !== null
                        ? `${obs.bloodPressureSystolic}/${obs.bloodPressureDiastolic}`
                        : "-"}
                    </td>
                    <td>{obs.pulse !== null ? obs.pulse : "-"}</td>
                    <td>{obs.respiratoryRate}</td>
                    <td>{obs.spo2 !== null ? obs.spo2 : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row my-5">
            <h5 className="mb-4">
              <span className="border-b-4 border-sky-500">
                Données biométriques
              </span>
            </h5>
            <table className="table">
              <thead className="table-info text-start">
                <tr>
                  <th>Date et heure</th>
                  <th>Poids (Kg)</th>
                  <th>Taille (cm)</th>
                  <th>IMC (Kg/m2)</th>
                  <th>MUAC (cm)</th>
                </tr>
              </thead>
              <tbody>
                {observations.map((obs, index) => (
                  <tr key={index}>
                    <td>{obs.date}</td>
                    <td>{obs.weight !== null ? obs.weight : "-"}</td>
                    <td>{obs.height !== null ? obs.height : "-"}</td>
                    <td>{obs.bmi !== null ? obs.bmi.toFixed(1) : "-"}</td>
                    <td>{obs.muac !== null ? obs.muac : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              Mon dossier médical
            </h2>
          </div>
          <hr className="mb-5" />
          <h6>
            Vous n'êtes pas connecté. Veillez vous connecter pour accéder à
            votre dossier médical
          </h6>
        </div>
      )}
    </>
  );
}

export default SignesVitaux;
