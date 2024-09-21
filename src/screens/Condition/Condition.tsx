import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { format, parseISO } from "date-fns";

interface ConditionType {
  libelle: string;
  date_debut: string;
  statut: string;
}

function Condition() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [O3ID, setO3ID] = useState("");
  const [conditions, setConditions] = useState<ConditionType[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const condition: ConditionType[] = [];
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/condition`)
          .then(function (response) {
            if (response.status === 200) {
              response.data.results.map((item: any) => {
                let date = "--";
                if (item.resource.onsetDateTime) {
                  date = item.resource.onsetDateTime;
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

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
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
        <Onglets O3ID={O3ID} page="condition" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("condition-page-title")}
            </span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th>{t("condition-page-th1")}</th>
                <th>{t("condition-page-th2")}</th>
                <th>{t("condition-page-th3")}</th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((condition) => (
                <tr key={condition.libelle}>
                  <td>{condition.libelle}</td>
                  {condition.date_debut !== "--" ? (
                    i18n.language === "en" ? (
                      <td>{getFormattedDateEN(condition.date_debut)}</td>
                    ) : (
                      <td>
                        {getFormattedDateFR(new Date(condition.date_debut))}
                      </td>
                    )
                  ) : (
                    <td>{condition.date_debut}</td>
                  )}
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
