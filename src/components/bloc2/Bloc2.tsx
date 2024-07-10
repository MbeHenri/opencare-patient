import React from "react";
import "./Bloc2.css";

function Bloc2() {
  return (
    <div className="container">
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-6 text-center text-lg-start mt-0 pt-0">
            <div className="list-group text-white">
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris1.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">
                    Consultation et suivi de vos patients en ligne
                  </p>
                </div>
              </div>
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris2.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">
                    Accès sécurisé aux dossiers médicaux de vos patients partout
                    et à tout moment
                  </p>
                </div>
              </div>
              <div className="liste">
                <img
                  src="/opencare/Cadre_gris3.png"
                  alt="twbs"
                  width="100%"
                  height="32"
                  className="img-fluid flex-shrink-0 my-2"
                />
                <div className="centered2">
                  <p className="my-0">
                    Commuication confidentielle et sécurisée
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10 mx-auto col-lg-6">
            <div className="text-center">
              <h2>Vous êtes médécin</h2>
              <p>Accédez à votre portail</p>
            </div>
            <p className="">
              <img
                src="/opencare/img_medecin.png"
                alt="twbs"
                width="180"
                height="32"
                className="img-fluid mx-auto d-block"
              />
            </p>
            <p className="">
              <a href="">
                <img
                  src="/opencare/Bouton_cliquez_ici.png"
                  alt="twbs"
                  width="180"
                  height="32"
                  className="img-fluid mx-auto d-block"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bloc2;
