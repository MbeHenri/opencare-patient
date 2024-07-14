/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "./PatientAppointement.css";
import DescriptionPatient from "../../components/description_patient/DescriptionPatient";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import RoomButton from "../../components/RoomButton";

interface Meeting {
  uuid: string;
  service: string;
  price: number;
  startDateTime: string;
  endDateTime: string;
  statusProgress: string;
  linkRoom: string;
  patient: number;
  idInvoice: number;
  statusPayment: string;
}

const NOT_PAID = '1';

function PatientAppointement() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [O3ID, setO3ID] = useState("");

  const [meetingNotPaid, setMeetingNotPaid] = useState<Meeting[]>([]);
  const [incomingMeeting, setIncomingMeeting] = useState<Meeting[]>([]);
  const [todayMeeting, setTodayMeeting] = useState<Meeting[]>([]);
  const [passedMeeting, setPassedMeeting] = useState<Meeting[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingIncoming, setIsLoadingIncomming] = useState<boolean>(false);
  const [isLoadingToday, setIsLoadingToday] = useState<boolean>(false);
  const [isLoadingPassed, setIsLoadingPassed] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    //.get(`demand?status=${VALIDATED}`, { params: { patient_id: O3ID } })
    //const meetings: Meeting[] = [];
    if(O3ID) {
    	const today_date = new Date();
    const func = async () => {
      await api
        .get(`/patient/${O3ID}/appointment`)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.results;
            
            const incoming: Meeting[] = [];
            const today: Meeting[] = [];
            const past: Meeting []= [];
            const notpaid: Meeting [] = [];
              
            data.map((appointment: Meeting) => {
              const dateMeeting = new Date(appointment.startDateTime);
              
              const appt:Meeting = {
                uuid: appointment.uuid,
                service: appointment.service,
                price: appointment.price,
                startDateTime: getFormattedDate(

                  new Date(appointment.startDateTime)
                ),
                endDateTime: getFormattedDate(
                  new Date(appointment.endDateTime)
                ),
                statusProgress: appointment.statusProgress,
                linkRoom: appointment.linkRoom,
                patient: appointment.patient,
                idInvoice: appointment.idInvoice,
                statusPayment: appointment.statusPayment,
              };
              
              if (appointment.statusPayment === NOT_PAID) {
              	notpaid.push(appt);
              } else {
                if (dateMeeting > today_date) {
                  incoming.push(appt);
                } else {
                  if (
                    dateMeeting.getDay() === today_date.getDay() &&
                    dateMeeting.getMonth() === today_date.getMonth() &&
                    dateMeeting.getFullYear() === today_date.getFullYear()
                  ) {
                    today.push(appt);
                  } else {
                    past.push(appt);
                  }
                }
              }
            });

            
            setMeetingNotPaid(notpaid);
            setIncomingMeeting(incoming);
            setTodayMeeting(today);
            setPassedMeeting(past);
            

            setIsLoadingIncomming(true);
            setIsLoadingToday(true);

            setIsLoadingPassed(true);
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();
    }
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

  const handlePayement = (
    appointment_uuid: any,
    idInvoice: any,
    service_name: any
  ) => {
    //navigate(`/paiement/${uuidAppointment}`);
    navigate(
      `/details_invoice/${appointment_uuid}/${idInvoice}/${service_name}`
    );
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
      const demand_id = "668e296051559ed8d3c956b6";
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

  const handleTeleconsultation = (linkRoom: any) => {
    navigate(`/teleconsultation/${linkRoom}`);
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
        <ul className="nav nav-tabs" id="myTab" role="tabList">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Demandes de RDV en attente de paiement
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              A venir
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Aujourd'hui
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="passe-tab"
              data-bs-toggle="tab"
              data-bs-target="#passe"
              type="button"
              role="tab"
              aria-controls="passe"
              aria-selected="false"
            >
              Passé
            </button>
          </li>
        </ul>
        {/*---- Tabs Content ---*/}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="table-responsive">
              <table className="table mt-2">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Note</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {isLoading ? (
                    meetingNotPaid.map((m) => (
                      <tr key={m.uuid}>
                        <td>Pas encore enregistrée</td>
                        <td>{m.service}</td>
                        <td>En attente de paiement</td>
                        <td width={300}>
                          Cliquez sur le bouton payer le RDV afin de confirmer
                          votre RDV par l'hôpital
                        </td>
                        <td>
                          <button
                            className="mt-3 btn btn-success btn-sm rounded rounded-3"
                            onClick={() =>
                              handlePayement(m.uuid, m.idInvoice, m.service)
                            }
                          >
                            Payer le RDV
                          </button>
                          <h5 className="py-2">{m.price} Fcfa</h5>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <h6>Aucun RDV en attente de paiement trouvé...</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="table-responsive">
              <table className="table mt-2">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th className="text-center">Service</th>
                  <th>Statut</th>
                  <th className="text-center">Note</th>
                </thead>
                <tbody>
                  {isLoadingIncoming ? (
                    incomingMeeting.map((m) => (
                      <tr key={m.uuid}>
                        <td width={300}>{m.startDateTime}</td>
                        <td width={200}>{m.service}</td>
                        <td>Payé</td>
                        <td className="text-center">
                          Vous êtes enregistré auprès d'un médécin.
                          Connectez-vous le jour de votre rendez-vous.
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h6>Aucun RDV à venir trouvé...</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="table-responsive">
              <table className="table mt-2">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th className="text-center">Service</th>
                  <th>Statut</th>
                  <th className="text-center">Note</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {isLoadingPassed ? (
                    todayMeeting.map((m) => (
                      <tr key={m.uuid}>
                        <td className="text-success">{m.startDateTime}</td>
                        <td className="text-success">{m.service}</td>
                        <td className="text-success">Payé</td>
                        <td className="text-success text-center">
                          Ne manquez pas à votre RDV aujourd'hui, connectez-vous
                          à l'heure.
                        </td>
                        {new Date(m.endDateTime).getHours() >=
                          new Date().getHours() &&
                        new Date(m.endDateTime).getMinutes() >=
                          new Date().getMinutes() ? (
                          <td className="text-success">
                            <button
                              className="btn btn-success"
                              onClick={() => handleTeleconsultation(m.linkRoom)}
                            >
                              Teleconsultation
                            </button>
                          </td>
                        ) : (
                          <td className="text-success">
                            La téléconsultation est terminée
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <h6>Aucun RDV ajourd'hui trouvé...</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="passe"
            role="tabpanel"
            aria-labelledby="passe-tab"
          >
            <div className="table-responsive">
              <table className="table mt-2">
                <thead>
                  <th>Date prévue pour le RDV</th>
                  <th className="text-center">Service</th>
                  <th>Statut</th>
                  <th className="text-center">Note</th>
                </thead>
                <tbody>
                  {isLoadingPassed ? (
                    passedMeeting.map((m) => (
                      <tr key={m.uuid}>
                        <td>{m.startDateTime}</td>
                        <td className="text-center">{m.service}</td>
                        <td>Payé</td>
                        <td className="text-center">
                          Votre RDV a déjà eu lieu
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h6>Aucun RDV passé trouvé...</h6>
                      </td>
                    </tr>
                  )}
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
