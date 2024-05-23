import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Notation from "../notation/Notation";

function ProfilMedecin() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="row">
              <img src="/opencare/Img_medecin.png" alt="" />
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              <h2 className="text-blue-500 text-uppercase">royal clinique</h2>
              <h3>Dr. Yoning François</h3>
              <p>Chirugien dentiste</p>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="presentation">Présentation</label>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={5}
                    className="form-control rounded-4 my-2"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="d-flex justify-content-between">
                  <p>Ville :</p>
                  <p>Yaoundé</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Avis :</p>
                  <p>
                    <Notation />
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Prix de la consultation :</p>
                  <p>
                    <strong>4 000 Fcfa</strong>
                  </p>
                </div>
                <p>
                  <button className="btn btn-primary rounded-2">
                    Prendre rendez-vous
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilMedecin;
