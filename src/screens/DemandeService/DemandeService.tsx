import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "./DemandeService.css";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Service {
  uuid: string;
  service: string;
  price: number;
}

interface PageParams {
  uuid: string;
}

function DemandeService() {
  const { user, logout } = useAuth();
  const [O3ID, setO3ID] = useState("");

  const [request, setRequest] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const { patient_uuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const func = async () => {
      ///demand/patientRDV/${O3ID}
      //.get(`patient/${O3ID}/demand`, { params: { patient_id: O3ID } })
      await api
        .get(`patient/${O3ID}/demand`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.forEach((element: any) => {
              if (element.status === "2") {
                setRequest(data);
                setIsLoading(true);
              }
            });
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
      navigate(`/patient_appointement`);
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
                className="btn btn-primary rounded-4 mx-1 p-2"
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
                Demandes de services
              </span>
            </h5>
            <table className="table">
              <thead className="table-primary text-start">
                <tr>
                  <th colSpan={2}>Demande en attente de validation</th>
                </tr>
              </thead>
              <thead className="table-secondary text-start">
                <tr>
                  <th className="w-25">Date et temps</th>
                  <th className="text-opencare-gray">Services</th>
                  <th className="w-25">Statut</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  request.map((r) => (
                    <tr className="p-4">
                      <td>Pas encore enregistree</td>
                      <td>{r.service}</td>
                      <td>En attente de validation</td>
                      <td>
                        Une fois votre demande validée aller dans l'onglet
                        "Demandes de RDV en attente pour le paiement"
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <h5>
                        Aucunde demnande en attente de validaion trouvée...
                      </h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="container caviar_dreams">
          <h2>
            Vous n'êtes pas connecté. Vous ne pouvez pas accéder à cette page.
          </h2>
        </div>
      )}
    </>
  );
}

export default DemandeService;
