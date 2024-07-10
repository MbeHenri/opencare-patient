import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Profile() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            Vos informations personnelles
          </h2>
        </div>
        <hr className="mb-5" />
        <div className="row">
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Nom(s)</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mbah</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Prénom(s)</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Danielle</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Numéro CNI</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;041689</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Sexe</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Féminin</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Date de naissance</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20/01/1992</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Pays de résidence</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cameroun</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Quartier de résidence</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Damas</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Ville de résidence</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yaoundé</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Numéro de téléphone</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+237 699 77 77 77</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Nom d'un parent</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mbah Michelle</p>
            </div>
            <div className="d-flex justify-between mb-2">
              <label htmlFor="">
                <b>Relation avec le parent</b>
              </label>
              <p>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mère</p>
            </div>
            <hr />
            <h3 className="mb-5">Changer votre mot de passe</h3>
            <div className="d-flex justify-content-start mb-4">
              <label htmlFor="" className="pe-5 w-100">
                <b>Ancien mot de passe</b>
              </label>
              <input type="text" className="form-control rounded-4" />
            </div>
            <div className="d-flex justify-content-start mb-4">
              <label htmlFor="" className="pe-5 w-100">
                <b>Nouveau mot de passe</b>
              </label>
              <input type="text" className="form-control rounded-4" />
            </div>
            <div className="d-flex justify-content-start mb-4">
              <label htmlFor="" className="pe-5 w-100">
                <b>Resaisir le nouveau mot de passe</b>
              </label>
              <input type="text" className="form-control rounded-4" />
            </div>
            <button className="btn btn-primary rounded-4 px-3">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
