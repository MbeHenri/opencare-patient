import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import User from "../../models/User";
import Patient from "../../models/Patient";
import { useAuth } from "../../context/AuthContext";

interface Details {
  names: string;
  gender: string;
  age: number;
  birthdate: string;
}

function DescriptionPatient() {
  const { user, logout } = useAuth();
  //const [userData, setUserData] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [O3ID, setO3ID] = useState("");

  const [patientDetails, setPatientDetails] = useState<Details>();

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const func = async () => {
      await api
        .get(`/patient/${O3ID}`)
        .then(function (response) {
          if (response.status === 200) {
            const details: Details = {
              names: response.data.names,
              gender: response.data.gender,
              age: response.data.age,
              birthdate: formattedDate(new Date(response.data.birthdate)),
            };
            setPatientDetails(details);
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

    const day = date.getDay();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  };
  const getFormattedDate = (date: Date): string => {
    // Options pour formater la date en français
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    // Utilisation de Intl.DateTimeFormat pour formater la date
    const formattedDate: string = new Intl.DateTimeFormat(
      "fr-FR",
      dateOptions
    ).format(date);

    // Combinez la date et l'heure formatées
    //console.log(`${formattedDate} - ${formattedTime}`);
    return `${formattedDate}`;
  };

  return (
    <>
      {patientDetails ? (
        <div className="d-flex align-items-left">
          <img src="/opencare/img_profil.png" alt="" width="150" height="150" />
          <div className="mt-2">
            <h3>{patientDetails.names}</h3>
            <h5>{patientDetails.gender}</h5>
            <h5>
              {patientDetails.age} ans - {patientDetails.birthdate}
            </h5>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-left">
          <img src="/opencare/img_profil.png" alt="" width="150" height="150" />
          <div className="mt-2">
            <h3>Patient inconnu</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default DescriptionPatient;
