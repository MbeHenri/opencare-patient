import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./DemandeService.css";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const PROCESSING = 2;

interface Service {
  uuid: string;
  service: string;
  price: number;
}

function DemandeService() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [O3ID, setO3ID] = useState("");

  const [request, setRequest] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const { patient_uuid } = useParams();

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
          .get(`patient/${O3ID}/demand?status=${PROCESSING}`)
          .then(function (response) {
            if (response.status === 200) {
              const data = response.data.results;
              //console.log(data);
              data.forEach((element: any) => {
                setRequest(data);
                setIsLoading(true);
              });
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

  return (
    <>
      {user ? (
        <div className="container-fluid">
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              {t("dossier-medical")}
            </h2>
          </div>
          <hr className="mb-5" />
          <Onglets O3ID={O3ID} page="demande" valide={true} />
          <div className="row my-5">
            <h5 className="mb-4">
              <span className="border-b-4 border-sky-500">
                {t("request-page-title1")}
              </span>
            </h5>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-primary text-start">
                  <tr>
                    <th colSpan={2}>{t("request-page-title2")}</th>
                  </tr>
                </thead>
                <thead className="table-secondary text-start">
                  <tr>
                    <th className="w-25">{t("request-page-table-th1")}</th>
                    <th className="text-opencare-gray">
                      {t("request-page-table-th2")}
                    </th>
                    <th className="w-25">{t("request-page-table-th3")}</th>
                    <th>{t("request-page-table-th4")}</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    request.map((r) => (
                      <tr className="p-4" key={r.uuid}>
                        <td>{t("request-page-table-td-title1")}</td>
                        <td>{r.service}</td>
                        <td>{t("request-page-table-td-title2")}</td>
                        <td>{t("request-page-table-td-title3")}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h5>{t("request-page-table-td-title4")}</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              {t("dossier-medical")}
            </h2>
          </div>
          <hr className="mb-5" />
          <h6>{t("no-authorized")}</h6>
        </div>
      )}
    </>
  );
}

export default DemandeService;
