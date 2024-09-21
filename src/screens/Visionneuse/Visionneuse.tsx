import React, { useEffect, useState } from "react";
import "./Visionneuse.css";
import Accordeon from "../../components/accordeon/Accordeon";
import { useAuth } from "../../context/AuthContext";
import Onglets from "../../components/onglets/Onglets";
import { useTranslation } from "react-i18next";

function Visionneuse() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

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
        <Onglets O3ID={O3ID} page="visionneuse" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              Resultats des tests
            </span>
          </h5>

          <Accordeon
            title={"Hématologie"}
            content={"Contenu de la section 1"}
          />
          <Accordeon
            title={"Bloodwork"}
            content={
              <table className="table table-sm">
                <thead className="table-secondary p-4">
                  <tr className="">
                    <th className="p-2" colSpan={4}>
                      Numérotation globulaire complète
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th className="p-2">Type de test</th>
                    <th>Date</th>
                    <th>Résultats</th>
                    <th>Interval normal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Coproculture</td>
                    <td>15 février 2024, 09:24</td>
                    <td>
                      Appearance of brights and deposits aginst a blue
                      background
                    </td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td>Coproculture</td>
                    <td>15 février 2024, 09:24</td>
                    <td>
                      Appearance of brights and deposits aginst a blue
                      background
                    </td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            }
          />
          <Accordeon title={"Section 3"} content={"Contenu de la section 3"} />
        </div>
      </div>
    </>
  );
}

export default Visionneuse;
