import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { format, parseISO } from "date-fns";

interface Program {
  active_program: string;
  location: string;
  date_enrolled: string;
  statut: string;
}

function Programme() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const program: Program[] = [];
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/program`)
          .then(function (response) {
            if (response.status === 200) {
              response.data.results.map((item: any) => {
                let location = "--";
                if (item.location) {
                  location = item.location;
                }
                program.push({
                  active_program: item.program.name,
                  location: location,
                  date_enrolled: item.dateEnrolled,
                  statut: "Active",
                });
              });
              setPrograms(program);
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

  const getFormattedDateEN = (date: string): string => {
    //const isoDateString = "1976-01-01T00:00:00.00Z"; // Exemple de date ISO

    // Parse la date ISO en objet Date
    const parsedDate = parseISO(date);

    // Formatte la date en utilisant le format anglais
    const englishDate = format(parsedDate, "MMMM dd, yyyy, hh:mm a");

    return englishDate;
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
        <Onglets O3ID={O3ID} page="programme" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("programme-page-title")}
            </span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th>{t("programme-page-th1")}</th>
                <th>{t("programme-page-th2")}</th>
                <th>{t("programme-page-th3")}</th>
                <th>{t("programme-page-th4")}</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.active_program}>
                  <td>{program.active_program}</td>
                  <td>{program.location}</td>
                  {i18n.language === "en" ? (
                    <td>{getFormattedDateEN(program.date_enrolled)}</td>
                  ) : (
                    <td>
                      {getFormattedDateFR(new Date(program.date_enrolled))}
                    </td>
                  )}
                  <td>{program.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Programme;
