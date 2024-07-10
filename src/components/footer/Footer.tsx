import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="conatiner-fluid mb-5 pt-5">
      <div className="row bg-opencare-fonce py-5">
        <div className="d-flex justify-content-center text-opencare-clair">
          <p className="text-2xl">Suivez-nous sur : </p>
          <div className="d-flex align-items-center">
            <img
              src="/opencare/Faceboock-ico.png"
              alt=""
              height={32}
              width={32}
              className="img-circle mx-2"
            />
            <img
              src="/opencare/Instagram-ico.png"
              alt=""
              height={32}
              width={32}
              className="img-circle mx-2"
            />
            <img
              src="/opencare/Youtube-ico.png"
              alt=""
              height={32}
              width={32}
              className="img-circle mx-2"
            />
          </div>
        </div>
      </div>
      <footer className="py-1 my-4 text-body-secondary text-center">
        <p className="my-0 lead">
          &copy; 2024 OpenCare. Tous les droits sont réservés.
        </p>
        <p className="lead">
          Termes et conditions | Les politiques de confidentialité.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
