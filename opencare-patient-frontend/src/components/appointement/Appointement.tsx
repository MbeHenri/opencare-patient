import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Calendrier from "../calendrier/Calendrier";
import Notation from "../notation/Notation";

function Appointement() {
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
              <h3>Prendre rendez-vous avec Dr. Yoning François</h3>
              <p>Chirugien dentiste</p>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <p>Ville : Yaoundé</p>
                <p>
                  Prix de la consultation: <b>4 000 Fcfa</b>
                </p>
              </div>
            </div>
            <div className="row">
              <Notation />
            </div>
            <div className="row">
              <Calendrier />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Appointement;
