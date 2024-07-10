/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "./PatientAppointement.css";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Service {
  demande_id: string;
  idAppointment: string;
  service: string;
  price: number;
}

interface Meeting {
  service: string;
  dateMeeting: string;
  status: string;
  tokenRoom: string;
}

interface invoice {
  invoice_id: number;
  date: any;
  state: any;
  currency: any;
}

interface PageParams {
  uuid: string;
}

const VALIDATED = "0";

function PatientAppointement() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [tokenRoom, setTokenRoom] = useState("");
  
  const [requestValidated, setRequestValidated] = useState<Service[]>([]);
  const [requestPayed, setRequestPayed] = useState<Meeting[]>([]);
  const [incomingMeeting, setIncomingMeeting] = useState<Meeting[]>([]);
  const [todayMeeting, setTodayMeeting] = useState<Meeting[]>([]);
  const [passedMeeting, setPassedMeeting] = useState<Meeting[]>([]);
  const [requestRejected, setRequestRejected] = useState<Service[]>([]);

  //const { patient_uuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const services: Service[] = [];
    const func = async () => {
      await api
        .get(`/demand`, { params: { patient_id: O3ID } })
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.forEach(async (element: any, i: number) => {
              if (element.status === VALIDATED) {
                services.push({
                  demande_id: data[i].id,
                  idAppointment: data[i].idAppointment,
                  service: data[i].service,
                  price: data[i].price,
                });
                setRequestValidated(services);
              }
              if (element.status === "payed") {
                const meeting: any[] = [];
                await api.get(`/service/room/list`).then((response) => {
                  if (response.status === 200) {
                    const today_date = new Date();

                    response.data.forEach((element: any) => {
                      meeting.push({
                        dateMeeting: getFormattedDate(
                          new Date(element.dateMeeting)
                        ),
                        service: element.service.name,
                      });
                      if (
                        today_date.getDate() <
                        new Date(element.dateMeeting).getDate()
                      ) {
                        setIncomingMeeting(meeting);
                      }
                      if (
                        today_date.getDate() ===
                        new Date(element.dateMeeting).getDate()
                      ) {
                        setTodayMeeting(meeting);
                        setTokenRoom(element.tokenRoom)
                      }
                      if (
                        today_date.getDate() >
                        new Date(element.dateMeeting).getDate()
                      ) {
                        setPassedMeeting(meeting);
                      }
                    });
                  }
                });
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

  const getFormattedDate = (date: Date): string => {
    // Options pour formater la date en français
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    // Options pour formater l'heure
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // Utilisation de Intl.DateTimeFormat pour formater la date
    const formattedDate: string = new Intl.DateTimeFormat(
      "fr-FR",
      dateOptions
    ).format(date);
    // Utilisation de Intl.DateTimeFormat pour formater l'heure
    const formattedTime: string = new Intl.DateTimeFormat(
      "fr-FR",
      timeOptions
    ).format(date);

    // Combinez la date et l'heure formatées
    //console.log(`${formattedDate} - ${formattedTime}`);
    return `${formattedDate} - ${formattedTime}`;
  };

  const handlePayement = (demande_id: any) => {
    //navigate(`/paiement/${uuidAppointment}`);
    navigate(`/details_invoice/${demande_id}`);
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
      navigate(`/patient_appointement/${O3ID}`);
    }
    if (value === "demande_service") {
      navigate("/demande_service");
    }
  };

  const handleValidate = () => {
    const func = async () => {
      const date_meeting: Date = new Date(2024, 7, 6, 10, 30);

      /*date.setFullYear(2024, 6, 25);
      date.setHours(9);
      date.setMinutes(30);*/

      const doctor_id = "705f5791-07a7-44b8-932f-a81f3526fc98"; // uuid provider et pas uuid person
      const demand_id = "6688edbecfa3fcb276236e62";
      await api
        .post(`/demand/${demand_id}/validate`, {
          doctor_id: doctor_id,
          date_meeting: date_meeting,
          duration: 30,
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();
    return () => {};
  };
  
  const handleTeleconsultation = () => {
  	console.log('Teleconsultation', tokenRoom)
  }

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
              className="btn btn-primary rounded-4 mx-1 p-2"
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
            <span className="border-b-4 border-sky-500">Rendez-vous</span>
          </h5>

          <button className="btn btn-danger w-25 my-4" onClick={handleValidate}>
            Valider les demandes
          </button>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id="tab1-tab"
                data-bs-toggle="tab"
                href="#tab1"
                role="tab"
                aria-controls="tab1"
                aria-selected="false"
              >
                Demandes de RDV en attente de paiement
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="tab3-tab"
                data-bs-toggle="tab"
                href="#tab3"
                role="tab"
                aria-controls="tab3"
                aria-selected="false"
              >
                A venir
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="tab4-tab"
                data-bs-toggle="tab"
                href="#tab4"
                role="tab"
                aria-controls="tab4"
                aria-selected="false"
              >
                Aujourd'hui
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="tab5-tab"
                data-bs-toggle="tab"
                href="#tab5"
                role="tab"
                aria-controls="tab5"
                aria-selected="false"
              >
                Passé
              </a>
            </li>
          </ul>

          <div className="tab-content mt-3 w-100 fs-6" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
            >
              <table className="table">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Note</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {requestValidated.map((r) => (
                    <tr key={r.demande_id}>
                      <td>Pas encore enregistrée</td>
                      <td>{r.service}</td>
                      <td>En attente de paiement</td>
                      <td>
                        Cliquez sur le bouton payer le RDV afin de confirmer
                        votre RDV par l'hôpital
                      </td>
                      <td>
                        <button
                          className="mt-3 btn btn-success btn-sm rounded rounded-3"
                          onClick={() => handlePayement(r.demande_id)}
                        >
                          Payer le RDV
                        </button>
                        <h5 className="py-2">{r.price} Fcfa</h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="tab3-tab"
            >
              <table className="table border">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Note</th>
                </thead>
                <tbody>
                  {incomingMeeting.map((m) => (
                    <tr key={m.service}>
                      <td>{m.dateMeeting}</td>
                      <td>{m.service}</td>
                      <td>Payé</td>
                      <td>
                        Vous êtes enregistré auprès d'un médécin. Connectez-vous
                        le jour de votre rendez-vous.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="tab4"
              role="tabpanel"
              aria-labelledby="tab4-tab"
            >
              <table className="table border">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Note</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {todayMeeting.map((m) => (
                    <tr key={m.service}>
                      <td className="text-success">{m.dateMeeting}</td>
                      <td className="text-success">{m.service}</td>
                      <td className="text-success">Payé</td>
                      <td className="text-success">
                        Ne manquez pas à votre RDV auourd'hui, connectez-vous à
                        l'heure.
                      </td>
                      <td className="text-success">
                        <button className='btn btn-success' onClick={handleTeleconsultation}>Teleconsultation</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="tab5"
              role="tabpanel"
              aria-labelledby="tab5-tab"
            >
              <table className="table">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Note</th>
                </thead>
                <tbody>
                  {passedMeeting.map((m) => (
                    <tr key={m.service}>
                      <td>{m.dateMeeting}</td>
                      <td>{m.service}</td>
                      <td>Payé</td>
                      <td>Votre RDV a déjà eu lieu</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientAppointement;
