import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Login from "../login/Login";
import Specialite from "../specialite/Specialite";
import Medecin from "../medecin/Medecin";
import Contact from "../contact/Contact";
import "./Home.css";
import Bloc2 from "../bloc2/Bloc2";

function Home() {
  return (
    <>
      <Header />
      <div className="container font-family-sans-serif" id="home_container">
        <div className="bd-example m-0 border-0 bg-blue-500 py-4 text-white">
          <div className="row">
            <div className="col-md-6 ps-5">
              <h1 className="my-0">Plateforme de santé</h1>
              <h2 className="text-uppercase mb-5 display-3 my-0 py-0">
                numérique
              </h2>
              <h2 className="my-0 py-0">de la Royal Clinique</h2>
              <h4 className="my-5">
                Consultez votre médécin à distance en toute sérénité
              </h4>
              <p className="my-5">
                Connexion entre différents acteurs de la santé. Médécins,
                patients, hôpital et pharmacies
              </p>
            </div>
            <div className="col-md-6">
              <img src="/opencare/Cycle.png" alt="" width="80%" />
            </div>
          </div>
        </div>

        {/*<div className="bd-example m-0 border-0">
        <svg
          className="bd-placeholder-img bd-placeholder-img-lg img-fluid bg-blue-400"
          width="100%"
          height="480"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Responsive image"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#0d6efd" />
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
            OpenCare
          </text>
        </svg>
      </div>*/}
        <div className="row bg-secondary py-2 text-white bd-example m-0 border-0">
          <p className="text-center">
            Accédez à la plateforme via votre ordinateur et votre téléphone
          </p>
        </div>
        <div className="row">
          <Login />
        </div>
        <Specialite />
        <Bloc2 />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default Home;
