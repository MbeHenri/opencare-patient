import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function PiecesJointes() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");

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
          .get(`/patient/${O3ID}/attachment`)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
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
        <Onglets O3ID={O3ID} page="pieces" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("attachment-page-title")}
            </span>
          </h5>
          <div className="container border border-1">
            <div className="row p-5">
              <div className="col">
                <img
                  src="/opencare/Img_pediatre.png"
                  className="img-thumbnail"
                  alt=""
                />
                <small>camCapture.png 30 -Avr - 2024</small>
              </div>
              <div className="col">
                <img
                  src="/opencare/Img_pediatre.png"
                  className="img-thumbnail"
                  alt=""
                />
                <small>camCapture.png 30 -Avr - 2024</small>
              </div>
              <div className="col">
                <img
                  src="/opencare/Img_pediatre.png"
                  className="img-thumbnail"
                  alt=""
                />
                <small>camCapture.png 30 -Avr - 2024</small>
              </div>
              <div className="col">
                <img
                  src="/opencare/Img_pediatre.png"
                  className="img-thumbnail"
                  alt=""
                />
                <small>camCapture.png 30 -Avr - 2024</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PiecesJointes;
