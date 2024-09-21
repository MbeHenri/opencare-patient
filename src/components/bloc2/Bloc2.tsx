import React from "react";
import { useTranslation } from "react-i18next";
import "./Bloc2.css";

function Bloc2() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-6 text-center text-lg-start mt-0 pt-0">
            <div className="list-group text-white">
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris1.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">{t("bloc2-title")}</p>
                </div>
              </div>
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris2.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">{t("bloc2-title1")}</p>
                </div>
              </div>
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris3.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">{t("bloc2-title2")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10 mx-auto col-lg-6">
            <div className="text-center">
              <h2>{t("bloc2-title3")}</h2>
              <p>{t("login-title11")}</p>
            </div>
            <p className="">
              <img
                src="/opencare/medecin.png"
                alt="twbs"
                width="180"
                height="32"
                className="img-fluid mx-auto d-block"
              />
            </p>
            <p className="text-center my-3">
              <a
                href="https://doctor.backbone-corp.com"
                className="btn btn-info"
              >
                {/*<img
                  src="/opencare/Bouton_cliquez_ici.png"
                  alt="twbs"
                  width="180"
                  height="32"
                  className="img-fluid mx-auto d-block"
                />*/}
                 {t("bloc2-btn-text")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bloc2;
