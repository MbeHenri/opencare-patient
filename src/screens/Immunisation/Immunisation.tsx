import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Immunization {
  vaccine: string;
  dose: number;
  //recent_vaccination_dose: number;
  recent_vaccination_date: string;
  vaccination_date: string;
  expiration_date: string;
}

function Immunisation() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [O3ID, setO3ID] = useState("");

  const [immunizations, setImmunizations] = useState<Immunization[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const immunization: Immunization[] = [];
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/immunization`)
          .then(function (response) {
            if (response.status === 200) {
              response.data.results.map((item: any) => {
                immunization.push({
                  vaccine: item.resource.vaccineCode.text,
                  dose: item.resource.protocolApplied[0].doseNumberPositiveInt,
                  recent_vaccination_date: formattedDate(
                    new Date(item.resource.meta.lastUpdated)
                  ),
                  vaccination_date: formattedTime(
                    new Date(item.resource.occurrenceDateTime)
                  ),
                  expiration_date: formattedDate(
                    new Date(item.resource.expirationDate)
                  ),
                });
              });
              setImmunizations(immunization);
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

    return `${day} ${month} ${year}`;
  };
  const formattedTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // L'heure 0 doit être 12
    const heure = String(hours).padStart(2, "0");

    return `Aujourd'hui, ${heure}:${minutes} ${period}`;
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
        <Onglets O3ID={O3ID} page="immunisation" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("immunisation-page-title")}
            </span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th colSpan={3}>{t("immunisation-page-table-th1")}</th>
              </tr>
            </thead>
            {immunizations.map((immunization) => (
              <>
                <thead
                  className="table-secondary text-start"
                  key={immunization.vaccine}
                >
                  <tr>
                    <th>{immunization.vaccine}</th>
                    <th colSpan={2}>
                      &nbsp;{t("immunisation-page-table-td-title1")}{" "}
                      {immunization.recent_vaccination_date}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>
                      <p>{t("immunisation-page-table-td-title2")}</p>
                      <p>{immunization.dose}</p>
                    </td>
                    <td>
                      <p>{t("immunisation-page-table-td-title3")}</p>
                      <p>{immunization.vaccination_date}</p>
                    </td>
                    <td>
                      <p>{t("immunisation-page-table-td-title4")}</p>
                      <p>{immunization.expiration_date}</p>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Immunisation;
