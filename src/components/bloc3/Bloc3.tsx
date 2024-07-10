import React from "react";

function Bloc3() {
  return (
    <div className="">
      <div className="row bg-blue-400 text-white p-2">
        <p className="text-center my-0">Mon dossier médical du patient</p>
        <p className="text-center my-0">Date: 15 mai 2024 - 14h</p>
      </div>
      <div className="row bg-secondary-subtle">
        <p className="h5 text-secondary px-5 py-2">
          Informations personnelles du patient
        </p>
      </div>
      <div className="text-center p-3">
        <p className="my-0">
          <b>Nom</b> : Danielle Mbah
        </p>
        <p className="my-0">
          <b>Âge</b> : 32 ans
        </p>
        <p className="my-0">
          <b>Genre</b> : Femme
        </p>
        <p className="my-0">
          <b>Nationalité</b> : Camerounaise
        </p>
        <p>
          <b>Adresse</b> : Yaoundé - Cameroun
        </p>
      </div>
      <div className="row bg-secondary-subtle">
        <p className="h5 text-secondary px-5 py-2">
          Informations médicales du patient
        </p>
      </div>

      <div className="">
        <h5 className="card-title bg-info-subtle my-2">Paramètres Vitaux</h5>
        <div className="row">
          <div className="col-md-7">
            <p className="mb-2">
              <b>Temp</b> :---C
            </p>
            <p className="mb-2">
              <b>Tension artériell</b> :--- / -- mmHg
            </p>
            <p className="mb-2">
              <b>Battements de coeur</b> :---beats/min
            </p>
          </div>
          <div className="col-md-5">
            <p className="my-0 text-end pe-3 mb-2">
              <b>Flux respiratiore</b> :---
            </p>
            <p className="my-0 text-end pe-3 mb-2">
              <b>SpO2</b> :--- %
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">
          Paramètres Biométriques
        </h5>
        <div className="row">
          <div className="col-md-7">
            <p className="mb-2">
              <b>Poids</b> :--- kg
            </p>
            <p className="mb-2">
              <b>Taille</b> :--- cm
            </p>
            <p className="my-0">
              <b>BMI(calc.)</b> :--- Kg/m2
            </p>
          </div>
          <div className="col-md-5">
            <p className="text-end mb-2 pe-3">
              <b>MUAC</b> :--- cm
            </p>
            <p className="text-end mb-2 pe-3">
              <b>Groupe Sanguin</b> : A
            </p>
            <p className="text-end mb-2 pe-3">
              <b>Rhésus</b> : +
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">Plaintes</h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">Bulletin d'examen</h5>
        <div className="row border mx-0">
          <button className="btn btn-primary rounded-4 mx-1 w-25 mt-2">
            Voir
          </button>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">
          Observations du médécin
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">
          Médicaments prescrits
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="">
        <h5 className="card-title bg-info-subtle my-2">
          Prescription du médécin
        </h5>
        <div className="row border mx-0">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="row text-center">
        <h4 className="mt-3 mb-0">Prochain rendez-vous</h4>
        <p className="text-center">Mardi le 24 Juin 2024 à 9h00</p>
        <p className="text-center my-5">
          <a href="">
            <img
              src="/opencare/Download-ico bleu.png"
              alt=""
              className="img-fluid mx-auto"
            />
            Télécharger votre dossier médical du jour
          </a>
        </p>
      </div>
    </div>
  );
}

export default Bloc3;
