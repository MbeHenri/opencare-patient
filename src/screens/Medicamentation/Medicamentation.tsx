/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { format, parseISO } from "date-fns";

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
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [O3ID, setO3ID] = useState("");

  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const medication: Medication[] = [];
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/medication`)
          .then(function (response) {
            if (response.status === 200) {
              response.data.results.map((item: any) => {
                medication.push({
                  start_date: item.dateActivated,
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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            {t("dossier-medical")}
          </h2>
        </div>
        <hr className="mb-5" />
        <Onglets O3ID={O3ID} page="medicamentation" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("medicamentation-page-title1")}
            </span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th>{t("medicamentation-page-table-th1")}</th>
                <th>{t("medicamentation-page-table-th2")}</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication) => (
                <tr key={medication.drug_name}>
                  {i18n.language === "en" ? (
                    <td>{getFormattedDateEN(medication.drug_name)}</td>
                  ) : (
                    <td>
                      {getFormattedDateFR(new Date(medication.drug_name))}
                    </td>
                  )}
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
                        {t("medicamentation-page-page-td-title1")}&nbsp;
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
                        {t("medicamentation-page-table-td-title2")}&nbsp;
                        {medication.order_reason}&nbsp;{medication.dosage}
                      </p>
                      <p>&nbsp;-&nbsp;</p>
                      <p>
                        {t("medicamentation-page-table-td-title3")}&nbsp;
                        {medication.quantity}&nbsp;
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
              {t("medicamentation-page-title2")}
            </span>
          </h5>
          <table className="table">
            <thead className="table-info text-start">
              <tr>
                <th>{t("medicamentation-page-table-th1")}</th>
                <th>{t("medicamentation-page-table-th2")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>{t("medicamentation-page-title3")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Medicamentation;
