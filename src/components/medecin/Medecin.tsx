import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Notation from "../notation/Notation";

import PersonnelService from "../../service/Personnel";
import Personnel from "../../models/Personnel";

function Medecin() {
  const personnel_service = PersonnelService.getInstance();
  const [medecins, setMedecins] = useState<Personnel[] | []>([]);

  useEffect(() => {
    const func = async () => {
      await personnel_service.getAllPersonnel().then((medecin: any) => {
        console.log(medecin);
        setMedecins(medecin);
      });
    };
    func();
    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h2 className="text-uppercase text-center mt-4 text-blue-500">
            royal clinique
          </h2>
          <h4 className="text-center text-blue-400">Nos médécins</h4>
          <hr className="mb-5" />
        </div>
      </div>
    </>
  );
}

export default Medecin;
