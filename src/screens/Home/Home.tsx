import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Login from "../../components/login/Login";
import Specialite from "../../components/specialite/Specialite";
import Bloc2 from "../../components/bloc2/Bloc2";
import { Container } from "react-bootstrap";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Blue banner */}
      <div className="bg-blue-500 text-white py-2">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <div className="col-md-7 bd-example m-0 border-0 py-4 text-white">
            <div className="row">
              <h1 className="my-0">{t("home-page-title1")}</h1>
              <h2 className="text-uppercase mb-5 display-3 my-0 py-0">
                {t("home-page-title2")}
              </h2>
              <h2 className="my-0 py-0">{t("home-page-title3")}</h2>
              <h4 className="my-5">{t("home-page-title4")}</h4>
              <p className="my-5">{t("home-page-title5")}</p>
            </div>
          </div>
          <div className="col-md-5">
            <img src="/opencare/Cycle.png" alt="Hospital" height="30" />
          </div>
        </Container>
      </div>
      <div className="row bg-secondary py-2 text-white bd-example m-0 border-0">
        <p className="text-center">{t("home-page-title6")}</p>
      </div>

      <Login />

      <Specialite />
      <Bloc2 />
    </>
  );
}

export default Home;
