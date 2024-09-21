import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface PatientDetails {
  nom: string;
  prenom: string;
  cni: string;
  sexe: string;
  date_naissance: string;
  adresse1: string;
  pays_residence: string;
  quartier_residence: string;
  ville_residence: string;
  tel: string;
  nom_parent: string;
  relation_parent: string;
}

function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [O3ID, setO3ID] = useState("");
  const [patient_details, setPatient_details] = useState<PatientDetails[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const func = async () => {
        const patient: PatientDetails[] = [];
        await api
          .get(`patient/${O3ID}`)
          .then(function (response) {
            if (response.status === 200) {
              const data = response.data;
              patient.push({
                nom: data.preferredName.familyName,
                prenom: data.preferredName.givenName,
                date_naissance: data.birthdate,
                adresse1: data.preferredAddress.Address1,
                pays_residence: "",
                quartier_residence: "",
                ville_residence: "",
                tel: "",
                sexe: data.gender,
                cni: "",
                nom_parent: "",
                relation_parent: "",
              });
              setPatient_details(patient);
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
    <div className="container-fluid">
      <div className="row">
        <h2 className="text-center mt-4 text-blue-400 mb-4">
          {t("profile-title")}
        </h2>
      </div>
      <hr className="mb-5" />
      <div className="row">
        {patient_details &&
          patient_details.map((patient) => (
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title1")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>:&nbsp;{patient.nom}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title2")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>:&nbsp;{patient.prenom}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title3")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>:&nbsp;{patient.cni}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title4")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>:&nbsp;{patient.sexe}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title5")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {format(new Date(patient.date_naissance), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title6")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {patient.pays_residence}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title7")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {patient.ville_residence}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title8")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {patient.tel}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title9")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {patient.nom_parent}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">
                        <b>{t("profile-title10")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <p>
                        :&nbsp;
                        {patient.relation_parent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h3 className="mb-5">{t("profile-title11")}</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="row form-group mb-3">
                    <div className="col-md-6">
                      <label htmlFor="" className="pe-5 w-100">
                        <b>{t("profile-title12")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <input type="text" className="form-control rounded-4" />
                    </div>
                  </div>
                  <div className="row form-group mb-3">
                    <div className="col-md-6">
                      <label htmlFor="" className="pe-5 w-100">
                        <b>{t("profile-title13")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <input type="text" className="form-control rounded-4" />
                    </div>
                  </div>
                  <div className="row form-group mb-3">
                    <div className="col-md-6">
                      <label htmlFor="" className="pe-5 w-100">
                        <b>{t("profile-title14")}</b>
                      </label>
                    </div>
                    <div className="col">
                      <input type="text" className="form-control rounded-4" />
                    </div>
                  </div>
                  <button className="btn btn-primary rounded-4 px-3">
                    {t("profile-btn-text")}
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Profile;
