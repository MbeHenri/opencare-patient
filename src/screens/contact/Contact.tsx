import React from "react";
import "./Contact.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Contact() {
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mt-4 text-blue-400 mb-4">Nous contacter</h2>
        <hr className="mb-5" />
      </div>
      <div className="row mb-4">
        <p className="text-center my-0">
          Pour tout besoin concernant nos services,
        </p>
        <p className="text-center my-0">
          veuillez s'il vous plaît remplir le formulaire ci-dessous et nous
          l'envoyer.
        </p>
        <p className="text-center">Nous vous répondrons sous peu.</p>
      </div>
      <div className="row bg-blue-400">
        <form
          action=""
          className="form w-50 mx-auto bg-light my-3 rounded-5 text-center"
        >
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
            <button className="btn rounded-4 w-25 bg-primary text-white my-4">
              Envoyez
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Contact;
