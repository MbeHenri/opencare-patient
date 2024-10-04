import React, { useEffect, useState } from "react";
import "./Service.css";
//import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";


interface ServiceType {
  uuid: string;
  name: string;
  price: number;
}

function Service() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [O3ID, setO3ID] = useState("");

  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const func = async () => {
        await api
          .get(`/service`)
          .then((response) => {
            if (response.status === 200) {
              setServices(response.data.results);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      func();
    }

    return () => {};
  }, [O3ID]);

  
  /*const handleClick = (service_uuid: string) => {
    setToast({
      type: 'success',
      message: 'Demande envoyée avec succès',
      position: 'bottom-left' // Choisissez la position ici
    });
  };*/

  const handleClick = async (service_uuid: string) => {
    if(i18n.language === "en"){
      if (window.confirm("Do you really want to make an appointment?")) {
        try {
          const response = await api.post(`/demand/new`, { service_id: service_uuid, patient_id: O3ID });
          
          if (response.status === 201) {
            //alert('Demande envoyée avec succès')
            toast.success("Request sent successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            navigate(`/demande_service`);
          } else if (response.status === 202) {
            //alert('Cette demande est déjà en attente de validation');
            toast.error('This request is already awaiting validation', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            return;
          }
        } catch (error) {
          //console.log('Une erreur est survenue lors de l\'envoi de la demande');
          toast.error('An error occurred while sending the request', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          }); 
        }
      }
    } else {
      if (window.confirm("Voulez-vous vraiment prendre un rendez-vous?")) {
        try {
          const response = await api.post(`/demand/new`, { service_id: service_uuid, patient_id: O3ID });
          
          if (response.status === 201) {
            //alert('Demande envoyée avec succès')
            toast.success("Demande envoyée avec succès", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            navigate(`/demande_service`);
          } else if (response.status === 202) {
            //alert('Cette demande est déjà en attente de validation');
            toast.error('Cette demande est déjà en attente de validation', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            return;
          }
        } catch (error) {
          //console.log('Une erreur est survenue lors de l\'envoi de la demande');
          toast.error('Une erreur est survenue lors de l\'envoi de la demande', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          }); 
        }
      }
    }
  };


  return (
    <>
      <div className="row">
        <h2 className="text-center mt-4 text-blue-400 mb-4">
          {t("service-page-title")}
        </h2>
        <hr className="mb-5" />
      </div>
      {user ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {services.map((service) => (
            <Col key={service.uuid}>
              <Card className="text-center h-100 rounded-4">
                <Card.Body className="g-0 bg-blue-400 text-white rounded-4 pb-0">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="/opencare/hopital.png"
                        alt=""
                        className="img-fluid mt-4"
                      />
                    </div>
                    <div className="col-md-8">
                      <h4 className="card-title text-sm">{service.name}</h4>
                      <p className="my-0 card-text text-end">
                        {t("service-page-title1")}
                      </p>
                      <h5 className="card-title text-end">
                        {service.price} XAF
                      </h5>
                      <p>
                        <button
                          className="btn btn-light btn-sm rounded-4 text-primary py-2"
                          onClick={() => handleClick(service.uuid)}
                        >
                          <span className="text-xs">
                            {t("service-page-title2")}
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="container">
          <h2>{t("no-authorized")}</h2>
        </div>
      )}
    </>
  );
}

export default Service;

