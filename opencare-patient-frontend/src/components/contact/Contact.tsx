import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div id="contact_form" className="pb-5 pt-3">
      <form
        action=""
        className="form border border rounded-5 mx-auto w-50 py-5 px-5 bg-white mt-5"
      >
        <h4 className="text-center mt-4">Nous contacter</h4>
        <p className="text-center mb-0">
          Pour tout besoin concernant nos service, veuillez s'il vous plaît
          remplir le formulaire ci-dessous et nous l'envoyer.
        </p>
        <p className="text-center">Nous vous repondrons sous peu.</p>
        <div className="form-group mb-3 mt-4">
          <h4 className="text-center">Vous êtes</h4>
          <select
            name=""
            id=""
            className="form-control rounded rounded-5 w-50 mx-auto"
          >
            <option value="">Un patient</option>
            <option value="">Un médécin</option>
            <option value="">Un centre de santé</option>
            <option value="">Une clinique</option>
            <option value="">Un hôpital</option>
          </select>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded rounded-4"
                placeholder="Nom"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control rounded rounded-4"
                placeholder="Prénom"
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control rounded rounded-4"
            placeholder="E-mail"
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            name=""
            id=""
            cols={5}
            rows={10}
            className="form-control rounded rounded-4 p-4"
            placeholder="Message"
          ></textarea>
        </div>
        <p className="text-center">
          <button className="btn rounded-3 w-25 bg-primary text-white">
            Envoyez
          </button>
        </p>
      </form>
    </div>
  );
}

export default Contact;
