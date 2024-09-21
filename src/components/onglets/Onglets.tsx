import React from "react";
import DescriptionPatient from "../description_patient/DescriptionPatient";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PatientUUID {
  O3ID: string;
  page: string;
  valide: boolean;
}

const Onglets: React.FC<PatientUUID> = ({ page, valide }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (e: any) => {
    const value = e.target.id;
    if (value === "signes_vitaux") {
      navigate("/signes_vitaux");
    }
    if (value === "medicamentation") {
      navigate("/medicamentation");
    }
    if (value === "medicamentation") {
      navigate("/medicamentation");
    }
    if (value === "visite") {
      navigate("/visite");
    }
    if (value === "visionneuse") {
      navigate("/visionneuse");
    }
    if (value === "allergie") {
      navigate("/allergie");
    }
    if (value === "condition") {
      navigate("/condition");
    }
    if (value === "immunisation") {
      navigate("/immunisation");
    }
    if (value === "pieces_jointes") {
      navigate("/pieces_jointes");
    }
    if (value === "programme") {
      navigate("/programme");
    }
    if (value === "patient_appointement") {
      navigate(`/patient_appointement`);
    }
    if (value === "demande_service") {
      navigate("/demande_service");
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        <div className="col">
          {valide && page === "vitals" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="signes_vitaux"
              onClick={handleClick}
            >
              {t("onglet-title1")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="signes_vitaux"
              onClick={handleClick}
            >
              {t("onglet-title1")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "medicamentation" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="medicamentation"
              onClick={handleClick}
            >
              {t("onglet-title2")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="medicamentation"
              onClick={handleClick}
            >
              {t("onglet-title2")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "visionneuse" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="visionneuse"
              onClick={handleClick}
            >
              {t("onglet-title3")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="visionneuse"
              onClick={handleClick}
            >
              {t("onglet-title3")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "visite" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="visite"
              onClick={handleClick}
            >
              {t("onglet-title4")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="visite"
              onClick={handleClick}
            >
              {t("onglet-title4")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "allergie" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="allergie"
              onClick={handleClick}
            >
              {t("onglet-title5")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="allergie"
              onClick={handleClick}
            >
              {t("onglet-title5")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "condition" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="condition"
              onClick={handleClick}
            >
              {t("onglet-title6")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="condition"
              onClick={handleClick}
            >
              {t("onglet-title6")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "immunisation" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="immunisation"
              onClick={handleClick}
            >
              {t("onglet-title7")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="immunisation"
              onClick={handleClick}
            >
              {t("onglet-title7")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "pieces" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="pieces_jointes"
              onClick={handleClick}
            >
              {t("onglet-title8")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="pieces_jointes"
              onClick={handleClick}
            >
              {t("onglet-title8")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "programme" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="programme"
              onClick={handleClick}
            >
              {t("onglet-title9")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="programme"
              onClick={handleClick}
            >
              {t("onglet-title9")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "rdv" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="patient_appointement"
              onClick={handleClick}
            >
              {t("onglet-title10")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="patient_appointement"
              onClick={handleClick}
            >
              {t("onglet-title10")}
            </button>
          )}
        </div>
        <div className="col">
          {valide && page === "demande" ? (
            <button
              className="btn btn-primary rounded-4 w-100 text-white nav-button"
              id="demande_service"
              onClick={handleClick}
            >
              {t("onglet-title11")}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-4 w-100 text-white nav-button"
              id="demande_service"
              onClick={handleClick}
            >
              {t("onglet-title11")}
            </button>
          )}
        </div>
      </div>
      <hr className="my-5" />
      <DescriptionPatient />
    </div>
  );
};

export default Onglets;
