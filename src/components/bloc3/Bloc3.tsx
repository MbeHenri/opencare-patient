import React from "react";
import { useTranslation } from "react-i18next";

function Bloc3() {
  const { t } = useTranslation();
  
  return (
    <div className="caviar_dreams">
      <div className="row bg-blue-400 text-white p-2">
        <p className="text-center my-0">{t("bloc3-page-title1")}</p>
        <p className="text-center my-0">Date: ---</p>
      </div>
      <div className="row bg-secondary-subtle">
        <p className="h5 text-secondary px-5 py-2">
          {t("bloc3-page-title2")}
        </p>
      </div>
      <div className="text-center p-3">
        <p className="my-0">
          <b>{t("bloc3-page-title3")}</b> : ---
        </p>
        <p className="my-0">
          <b>{t("bloc3-page-title4")}</b> : --- {t("bloc3-page-title5")}
        </p>
        <p className="my-0">
          <b>{t("bloc3-page-title6")}</b> : ---
        </p>
        <p className="my-0">
          <b>{t("bloc3-page-title8")}</b> : ---
        </p>
        <p>
          <b>{t("bloc3-page-title9")}</b> : ---
        </p>
      </div>
      <div className="row bg-secondary-subtle">
        <p className="h5 text-secondary px-5 py-2">
          {t("bloc3-page-title10")}
        </p>
      </div>

      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">{t("bloc3-page-title11")}</h5>
        <div className="row">
          <div className="col-md-7">
            <p className="mb-2">
              <b>Temp</b> :---C
            </p>
            <p className="mb-2">
              <b>{t("bloc3-page-title12")}</b> :--- / -- mmHg
            </p>
            <p className="mb-2">
              <b>{t("bloc3-page-title13")}</b> :---beats/min
            </p>
          </div>
          <div className="col-md-5">
            <p className="my-0 text-end pe-3 mb-2">
              <b>{t("bloc3-page-title14")}</b> :---
            </p>
            <p className="my-0 text-end pe-3 mb-2">
              <b>{t("bloc3-page-title15")}</b> :--- %
            </p>
          </div>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">
          {t("bloc3-page-title16")}
        </h5>
        <div className="row">
          <div className="col-md-7">
            <p className="mb-2">
              <b>{t("bloc3-page-title17")}</b> :--- kg
            </p>
            <p className="mb-2">
              <b>{t("bloc3-page-title18")}</b> :--- cm
            </p>
            <p className="my-0">
              <b>{t("bloc3-page-title19")}</b> :--- Kg/m2
            </p>
          </div>
          <div className="col-md-5">
            <p className="text-end mb-2 pe-3">
              <b>{t("bloc3-page-title20")}</b> :--- cm
            </p>
            <p className="text-end mb-2 pe-3">
              <b>{t("bloc3-page-title21")}</b> : ---
            </p>
            <p className="text-end mb-2 pe-3">
              <b>{t("bloc3-page-title22")}</b> : ---
            </p>
          </div>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">{t("bloc3-page-title23")}</h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">{t("bloc3-page-title24")}</h5>
        <div className="row border mx-0">
          <button className="btn btn-primary rounded-4 mx-1 w-25 mt-2">
           {t("bloc3-page-btn-text")}
          </button>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">
          {t("bloc3-page-title25")}
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">
          {t("bloc3-page-title26")}
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="caviar_dreams">
        <h5 className="card-title bg-info-subtle my-2">
          {t("bloc3-page-title27")}
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="row text-center">
        <h4 className="mt-3 mb-0">{t("bloc3-page-title28")}</h4>
        <p className="text-center">Mardi le 24 Juin 2024 à 9h00 </p>
        <p className="text-center my-5">
          <a href="">
            <img
              src="/opencare/Download-ico bleu.png"
              alt=""
              className="img-fluid mx-auto"
            />
            {t("bloc3-page-title29")}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Bloc3;
