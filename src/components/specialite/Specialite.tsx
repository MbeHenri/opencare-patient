import React from "react";
import { useTranslation } from "react-i18next";
import "./Specialite.css";

function Specialite() {
  const { t } = useTranslation();
  return (
    <div id="specialite" className="text-white py-1 my-4">
      <h2 className="text-center pt-5">{t("specialite-title")}</h2>
      <div className="d-flex align-items-center mb-5 mt-5 px-5">
        <div>
          <img
            src="/opencare/generaliste.png"
            alt=""
            width="50%"
            className="img-fluid ms-5"
          />
          <p className="ms-5 ps-4 mt-3 h5">{t("specialite-title1")}</p>
        </div>
        <div>
          <img
            src="/opencare/pediatre.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-4 mt-3 h5">{t("specialite-title2")}</p>
        </div>
        <div>
          <img
            src="/opencare/gunecologue.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-3 mt-3 h5">{t("specialite-title3")}</p>
        </div>
        <div>
          <img
            src="/opencare/dentiste.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-4 ps-1 mt-3 h5">{t("specialite-title4")}</p>
        </div>
        <div>
          <img
            src="/opencare/optamologue.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-2 mt-3 h5">{t("specialite-title5")}</p>
        </div>
      </div>
    </div>
  );
}

export default Specialite;
