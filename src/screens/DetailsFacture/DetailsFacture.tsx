import React, { useEffect, useState } from "react";
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
  const { demande_id } = useParams();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [invoiceID, setInvoiceID] = useState("");
  const [service, setService] = useState("");
  const [uuidAppointment, setUuidAppointment] = useState("");
  const [invoice, setInvoice] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const func = async () => {
      await api
        .get(`/appointment/${demande_id}/details`)
        .then(function (response) {
          if (response.status === 200) {
            setInvoiceID(response.data.idInvoice);
            setService(response.data.service_name);
            setUuidAppointment(response.data.uuidAppointment);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();
    return () => {};
  }, [demande_id]);

  useEffect(() => {
    const facture: Invoice[] = [];
    const func = async () => {
      await api
        .get(`/invoice/${invoiceID}`)
        .then(function (response) {
          if (response.status === 200) {
            facture.push({
              service: service,
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
    return () => {};
  }, [invoiceID, service]);

  const handlePayement = () => {
    navigate(`/paiement/${uuidAppointment}`);
  };

  return (
    <div className="container caviar_dreams">
      <h2>Détails de votre facture</h2>
      {invoice.map((item) => (
        <>
          <p>
            <strong>Service:</strong>
            &nbsp;{item.service}
          </p>
          <p>
            <strong>Montant résiduel:</strong>
            {item.amount_residual}&nbsp;{item.currency}
          </p>
          <p>
            <strong>Montant total:</strong>
            {item.amount_total}&nbsp;{item.currency}
          </p>
          <p>
            <strong>Etat:</strong>&nbsp;
            {item.state}
          </p>
          <br />
          <button className="btn btn-success" onClick={handlePayement}>
            Valider le paiement
          </button>
        </>
      ))}
    </div>
  );
}

export default DetailsFacture;
