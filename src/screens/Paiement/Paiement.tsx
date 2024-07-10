import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { error } from "console";
import { useAuth } from "../../context/AuthContext";

interface Service {
  uuid: string;
  service: string;
  price: number;
}

interface invoice {
  invoice_id: number;
  date: any;
  state: any;
  currency: any;
}

function Paiement() {
  const navigate = useNavigate();
  const { uuidAppointment } = useParams();
  const { user, logout } = useAuth();
  const [O3ID, setO3ID] = useState("");

  const [modeReglement, setModeReglement] = useState<String>("");
  const [displayChoix, setDisplayChoix] = useState<String>("");
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState<String>("");
  const [mobile, setMobile] = useState<boolean>(false);
  const [defaultDisplay, setDefaultDisplay] = useState<boolean>(true);

  const [requestValidated, setRequestValidated] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  const handleChange = (e: any) => {
    const mode_reglement = e.target.value;
    if (mode_reglement === "") {
      setDisplayChoix("");
      setDefaultDisplay(true);
      setMobile(false);
    }
    if (mode_reglement === "MTN") {
      setDisplayChoix("MTN Mobil Money Cameroon");
      setDisplayPhoneNumber("Numéro de téléphone MoMo");
      setMobile(true);
      setDefaultDisplay(false);
      setModeReglement("MTN");
    }
    if (mode_reglement === "ORANGE") {
      setDisplayChoix("ORANGE Mobil Money Cameroon");
      setDisplayPhoneNumber("Numéro de téléphone Orange Money");
      setMobile(true);
      setDefaultDisplay(false);
      setModeReglement("ORANGE");
    }
    if (mode_reglement === "PAYPAL") {
      setDisplayChoix("Paypal");
      setMobile(false);
      setDefaultDisplay(false);
      setModeReglement("PAYPAL");
    }
  };

  const handlePayment = async (mode_reglement: String) => {
    const doctor_id = "705f5791-07a7-44b8-932f-a81f3526fc98";
    const success: boolean = true;

    // manage api payment and get success response
    if (success) {
      await api
        .put(`/appointment/${uuidAppointment}/pay`, {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
    console.log(`${formattedDate} - ${formattedTime}`);
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            Effectuez le paiement afin de confirmer votre rendez-vous
          </h2>
        </div>
        <hr className="mb-5" />
        <div className="row">
          <div className="col-md-7 col-sm-12 col-lg-7">
            <div className="d-flex justify-content-start mb-5">
              <h4 className="me-4">Modes de paiement</h4>
              <div className="form-group">
                <select
                  name=""
                  id="choix_mode"
                  className="w-100 rounded-4 form-control"
                  onChange={(e: any) => handleChange(e)}
                >
                  <option value="">Choisissez...</option>
                  <option value="MTN" className="h6 py-3">
                    MTN Mobil Money Cameroon
                  </option>
                  <option value="ORANGE" className="h6 py-3">
                    Orange Mobil Money Cameroon
                  </option>
                  <option value="PAYPAL" className="h6 py-3">
                    Paypal
                  </option>
                </select>
              </div>
            </div>
            {defaultDisplay ? (
              <div></div>
            ) : (
              <div className="d-flex justify-content-start mb-4">
                <h4 className="me-4">Modes de paiement</h4>
                <div className="form-group">
                  <p className="rounded-4 form-control w-100">
                    <b>{displayChoix}</b>
                  </p>
                </div>
              </div>
            )}

            {mobile ? (
              <div className="d-flex justify-content-start mb-4">
                <label htmlFor="" className="me-4">
                  <b>{displayPhoneNumber}</b>
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="rounded-4 form-control w-100"
                    placeholder="+237"
                  />
                </div>
                <button
                  className="btn btn-primary ms-4 rounded-4 w-25"
                  onClick={() => handlePayment(modeReglement)}
                >
                  Payer
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-start mb-4">
                <label htmlFor="" className="me-4">
                  <b>Entrez votre adresse e-mail</b>
                </label>
                <div className="form-group">
                  <input
                    type="email"
                    className="rounded-4 form-control w-100"
                    placeholder="@"
                  />
                </div>
                <button
                  className="btn btn-primary ms-4 rounded-4 w-25"
                  onClick={() => handlePayment(modeReglement)}
                >
                  Payer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Paiement;
