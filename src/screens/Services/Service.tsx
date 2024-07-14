import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Service.css";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Service {
  uuid: string;
  name: string;
  price: number;
}

function Service() {
  const { user, logout } = useAuth();
  //const [userData, setUserData] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [O3ID, setO3ID] = useState("");

  const [services, setServices] = useState<Service[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
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
    return () => {};
  }, [user]);

  const handleClick = async (service_uuid: string) => {
    console.log(O3ID);
    await api
      .post(`/demand/new`, { service_id: service_uuid, patient_id: O3ID })
      .then((response) => {
        if (response.status === 201) {
          navigate(`/demande_service`);
        }
        if (response.status === 202) {
          alert("Cette demande est déjà en attente de validation");
          return;
        }
      });
  };

  return (
    <>
      {user ? (
        <div className="container">
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              Nos services médicaux
            </h2>
            <hr className="mb-5" />
          </div>
          {/*<div className="row my-4">
            <div className="col-md-4">
              <p>Filtre</p>
            </div>
            <div className="col-md-8">
              <div className="alert alert-success text-success">
                <h5 className="text-center">
                  Votre demande de rendez-vous a été envoyée à l'hôpital avec
                  succès.
                </h5>
              </div>
            </div>
          </div> */}
          <div className="row">
            {services.map((service) => (
              <div className="col-md-3 col-sm-6 col-lg-3" key={service.uuid}>
                <div className="card rounded-4">
                  <div className="row g-0 bg-blue-400 text-white rounded-4 pb-0">
                    <div className="col-md-4">
                      <img
                        src="/opencare/hopital.png"
                        alt=""
                        className="img-fluid mt-4"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title text-sm">{service.name}</h4>
                        <p className="my-0 card-text text-end">
                          Côut de la consultation
                        </p>
                        <h5 className="card-title text-end">
                          {service.price} FCFA
                        </h5>
                        <p>
                          <button
                            className="btn btn-light btn-sm rounded-4 text-primary py-2"
                            onClick={() => handleClick(service.uuid)}
                          >
                            <span className="text-xs">
                              Demander un rendez-vous
                            </span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <h2>
            Vous n'êtes pas connecté. Vous ne pouvez pas accéder à cette page.
          </h2>
        </div>
      )}
    </>
  );
}

export default Service;
