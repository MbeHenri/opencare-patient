/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./PatientAppointement.css";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { format, parseISO } from "date-fns";

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

const NOT_PAID = "1";

function PatientAppointement() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
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
    if (O3ID) {
      const today_date = new Date();
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/appointment`)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.results;

              const incoming: Meeting[] = [];
              const today: Meeting[] = [];
              const past: Meeting[] = [];
              const notpaid: Meeting[] = [];

              data.map((appointment: Meeting) => {
                const dateMeeting = new Date(appointment.startDateTime);
                //const endMeeting = new Date(appointment.endDateTime);

                const appt: Meeting = {
                  uuid: appointment.uuid,
                  service: appointment.service,
                  price: appointment.price,
                  startDateTime: appointment.startDateTime,
                  endDateTime: appointment.endDateTime,
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
                      /*console.log(
                        "today Hour",
                        today_date.getUTCHours(),
                        "end Hour",
                        endMeeting.getUTCHours(),
                        "today Min",
                        today_date.getUTCMinutes(),
                        "End Min",
                        endMeeting.getUTCMinutes()
                      );*/
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

              if (notpaid.length !== 0) setIsLoading(true);
              if (incoming.length !== 0) setIsLoadingIncomming(true);
              if (today.length !== 0) setIsLoadingToday(true);
              if (past.length !== 0) setIsLoadingPassed(true);
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

  const getFormattedDateFR = (date: Date): string => {
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

  const getFormattedDateEN = (date: string): string => {
    //const isoDateString = "1976-01-01T00:00:00.00Z"; // Exemple de date ISO

    // Parse la date ISO en objet Date
    const parsedDate = parseISO(date);

    // Formatte la date en utilisant le format anglais
    const englishDate = format(parsedDate, "MMMM dd, yyyy, hh:mm a");

    return englishDate;
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

  /*const handleValidate = () => {
    const func = async () => {
      const date_meeting: Date = new Date(2024, 6, 15, 21, 37);

      //date.setFullYear(2024, 6, 25);
      //date.setHours(9);
      //date.setMinutes(30);

      const doctor_id = "705f5791-07a7-44b8-932f-a81f3526fc98"; // uuid provider et pas uuid person
      const demand_id = "669386da007a37273bc013c8";
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
  };*/

  const getAppointmentStatus = (
    appointmentDateTime: string,
    endDateTime: string
  ): string => {
    const startDate = new Date(appointmentDateTime);
    const endDate = new Date(endDateTime);
    const now = new Date();

    if (now < startDate) {
      return "Téléconsultation dans quelques instants";
    } else if (now >= startDate && now <= endDate) {
      return "Téléconsultation en cours";
    } else {
      return "Téléconsultation terminée";
    }
  };

  /*const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };*/

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Téléconsultation en cours":
        return "green";
      case "Téléconsultation terminée":
        return "red";
      case "Téléconsultation dans quelques instants":
        return "blue";
      default:
        return "black";
    }
  };

  const handleTeleconsultation = (linkRoom: any) => {
    navigate(`/teleconsultation?url=${encodeURIComponent(linkRoom)}`);
  };

  if (!user)
    return (
      <div className="container-fluid">
        <h6>{t("no-authorized")}</h6>
      </div>
    );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            {t("dossier-medical")}
          </h2>
        </div>
        <hr className="mb-5" />
        <Onglets O3ID={O3ID} page="rdv" valide={true} />
        {/*<button className="btn btn-danger my-5" onClick={handleValidate}>
          Valider les demandes
        </button>*/}
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
              {t("rdv-page-title1")}
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
              {t("rdv-page-title2")}
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
              {t("rdv-page-title3")}
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
              {t("rdv-page-title4")}
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
                  <th>{t("rdv-page-table-th1")}</th>
                  <th>{t("rdv-page-table-th2")}</th>
                  <th>{t("rdv-page-table-th3")}</th>
                  <th>{t("rdv-page-table-th4")}</th>
                  <th>{t("rdv-page-table-th5")}</th>
                </thead>
                <tbody>
                  {isLoading ? (
                    meetingNotPaid.map((m) => (
                      <tr key={m.uuid}>
                        <td>{t("rdv-page-table-td-title1")}</td>
                        <td>{m.service}</td>
                        <td>{t("rdv-page-table-td-title2")}</td>
                        <td width={300}>{t("rdv-page-table-td-title3")}</td>
                        <td>
                          <button
                            className="mt-3 btn btn-success btn-sm rounded rounded-3"
                            onClick={() =>
                              handlePayement(m.uuid, m.idInvoice, m.service)
                            }
                          >
                            {t("rdv-page-table-td-btn-text")}
                          </button>
                          <h5 className="py-2">{m.price} XAF</h5>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <h6>{t("rdv-page-table-td-title4")}</h6>
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
                  <th>{t("rdv-page-table-th1")}</th>
                  <th className="text-center">{t("rdv-page-table-th2")}</th>
                  <th>{t("rdv-page-table-th3")}</th>
                  <th className="text-center">{t("rdv-page-table-th4")}</th>
                </thead>
                <tbody>
                  {isLoadingIncoming ? (
                    incomingMeeting.map((m) => (
                      <tr key={m.uuid}>
                        {i18n.language === "en" ? (
                          <td width={300}>
                            {getFormattedDateEN(m.startDateTime)}
                          </td>
                        ) : (
                          <td width={300}>
                            {getFormattedDateFR(new Date(m.startDateTime))}
                          </td>
                        )}
                        <td width={200}>{m.service}</td>
                        <td>{t("rdv-page-table-td-title5")}</td>
                        <td className="text-center">
                          {t("rdv-page-table-td-title6")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h6>{t("rdv-page-table-td-title7")}</h6>
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
                  <th>{t("rdv-page-table-th1")}</th>
                  <th className="text-center">{t("rdv-page-table-th2")}</th>
                  <th>{t("rdv-page-table-th3")}</th>
                  <th className="text-center">{t("rdv-page-table-th4")}</th>
                  <th>{t("rdv-page-table-th5")}</th>
                </thead>
                <tbody>
                  {isLoadingToday ? (
                    todayMeeting.map((m) => {
                      const status = getAppointmentStatus(
                        m.startDateTime,
                        m.endDateTime
                      );
                      return (
                        <tr key={m.uuid}>
                          {i18n.language === "en" ? (
                            <td className="text-success">
                              {getFormattedDateEN(m.startDateTime)}
                            </td>
                          ) : (
                            <td className="text-success">
                              {getFormattedDateFR(new Date(m.startDateTime))}
                            </td>
                          )}
                          <td className="text-success">{m.service}</td>
                          <td className="text-success">
                            {t("rdv-page-table-td-title8")}
                          </td>
                          <td className="text-success text-center">
                            {t("rdv-page-table-td-title9")}
                          </td>
                          <td style={{ color: getStatusColor(status) }}>
                            <button
                              className="btn btn-success"
                              onClick={() => handleTeleconsultation(m.linkRoom)}
                            >
                              {status}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <h6>{t("rdv-page-table-td-title10")}</h6>
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
                  <th>{t("rdv-page-table-th1")}</th>
                  <th className="text-center">{t("rdv-page-table-th2")}</th>
                  <th>{t("rdv-page-table-th3")}</th>
                  <th className="text-center">{t("rdv-page-table-th4")}</th>
                </thead>
                <tbody>
                  {isLoadingPassed ? (
                    passedMeeting.map((m) => (
                      <tr key={m.uuid}>
                        {i18n.language === "en" ? (
                          <td>{getFormattedDateEN(m.startDateTime)}</td>
                        ) : (
                          <td>
                            {getFormattedDateFR(new Date(m.startDateTime))}
                          </td>
                        )}
                        <td className="text-center">{m.service}</td>
                        <td>{t("rdv-page-table-td-title11")}</td>
                        <td className="text-center">
                          {t("rdv-page-table-td-title12")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h6>{t("rdv-page-table-td-title13")}</h6>
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
