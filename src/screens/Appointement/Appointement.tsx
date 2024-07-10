import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Appointement.css";

function Appointement() {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center mt-4 text-blue-400 mb-4">
            ROYAL CLINIQUE
          </h1>
          <hr className="mb-5" />
        </div>
        <div className="row">
          <h5 className="mb-4">
            <span className="border-b-4 border-sky-500">
              Liste des demandes de RDV
            </span>
          </h5>
          <table className="table table-sm border border-secondary">
            <thead className="table-info text-center">
              <tr>
                <th>Nom du patient</th>
                <th>Spécialité demandée</th>
                <th>Demande envoyée le</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mball Georges</td>
                <td>Dentisterie</td>
                <td>Lundi, 12 Mars 2024-08:14</td>
                <td>
                  <div className="btn-group d-flex align-items-center justify-content-center">
                    <button className="btn btn-danger rounded-4 w-25 mx-1">
                      Annulée
                    </button>
                    <button className="btn btn-success rounded-4 w-25 mx-1">
                      Acdeptée
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Kamdem Laurent</td>
                <td>Dermatologie</td>
                <td>Mardi, 19 Mai 2024-09:30</td>
                <td>
                  <div className="btn-group d-flex align-items-center justify-content-center">
                    <button className="btn btn-danger rounded-4 w-25 mx-1">
                      Annulée
                    </button>
                    <button className="btn btn-success rounded-4 w-25 mx-1">
                      Acdeptée
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Appointement;
