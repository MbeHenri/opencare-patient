import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

interface Manifestation {
  text: string;
}

interface AllergieType {
  allergen: string;
  severity: string;
  reaction: Manifestation[];
  onset_date_comment: any;
}

function Allergie() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [O3ID, setO3ID] = useState("");
  const [allergies, setAllergies] = useState<AllergieType[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const allergie: AllergieType[] = [];
      const func = async () => {
        await api
          .get(`/patient/${O3ID}/allergie`)
          .then((response) => {
            if (response.status === 200) {
              const res = response.data.results;
              res.forEach((element: any, i: number) => {
                allergie.push({
                  allergen: element.code.text,
                  severity: element.reaction[0].severity,
                  reaction: element.reaction[0].manifestation,
                  onset_date_comment: element.note[0].text,
                });
              });
              setAllergies(allergie);
            }
          })
          .catch((error) => {
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
        <Onglets O3ID={O3ID} page="allergie" valide={true} />
        <div className="row my-5">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              {t("allergy-page-title")}
            </span>
          </h5>
          <table className="table table-sm border border-secondary">
            <thead className="table-info text-start">
              <tr>
                <th>{t("allergy-page-table-td-title1")}</th>
                <th>{t("allergy-page-table-td-title2")}</th>
                <th>{t("allergy-page-table-td-title3")}</th>
                <th>{t("allergy-page-table-td-title4")}</th>
              </tr>
            </thead>
            <tbody>
              {allergies.map((allergie) => (
                <tr key={allergie.allergen}>
                  <td>{allergie.allergen}</td>
                  <td className="text-capitalize">{allergie.severity}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {allergie.reaction.map((el) => (
                        <p className="mx-2" key={el.text}>
                          {el.text}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td>{allergie.onset_date_comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Allergie;
