import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

interface Invoice {
  service: string;
  amount_residual: number;
  amount_total: number;
  currency: string;
  date: string;
  state: string;
}

function DetailsFacture() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appointment_uuid, idInvoice, service_name } = useParams();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [noFacture, setNoFacture] = useState("");
  const [invoice, setInvoice] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (idInvoice && O3ID) {
      const facture: Invoice[] = [];
      const func = async () => {
        await api
          .get(`/invoice/${idInvoice}`)
          .then(function (response) {
            if (response.status === 200) {
              setNoFacture(response.data.facture_name);
              facture.push({
                service: "",
                amount_residual: response.data.amount_residual,
                amount_total: response.data.amount_total,
                currency: response.data.currency,
                date: response.data.date,
                state: response.data.state,
              });
              setInvoice(facture);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      func();
    }
    return () => {};
  }, [O3ID, idInvoice]);

  const handlePayement = () => {
    navigate(`/paiement/${appointment_uuid}`);
  };

  return (
    <div className="container caviar_dreams">
      <h2>{t("invoice-title")}&nbsp;{noFacture}</h2>
      {invoice.map((item) => (
        <>
          <p>
            <strong>{t("invoice-title1")}</strong>
            &nbsp;&nbsp;{service_name}
          </p>
          <p>
            <strong>{t("invoice-title2")}</strong>&nbsp;&nbsp;
            {item.amount_residual}&nbsp;{item.currency}
          </p>
          <p>
            <strong>{t("invoice-title3")}</strong>&nbsp;&nbsp;
            {item.amount_total}&nbsp;{item.currency}
          </p>
          <p>
            <strong>{t("invoice-title4")}</strong>&nbsp;&nbsp;
            {item.state == "not_paid" ? (<span>{t("invoice-title5")}</span>) : (<span>{t("invoice-title6")}</span>)}
          </p>
          <br />
          <button className="btn btn-success" onClick={handlePayement}>
            {t("invoice-btn-text")}
          </button>
        </>
      ))}
    </div>
  );
}

export default DetailsFacture;


