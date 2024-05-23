import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Notation from "../notation/Notation";

function Medecin() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h2 className="text-uppercase text-center mt-4 text-blue-500">
            royal clinique
          </h2>
          <h4 className="text-center text-blue-400">Nos médécins</h4>
          <hr className="mb-5" />
        </div>
        <div className="row my-4">
          <div className="col-md-3">
            <div className="card rounded-4">
              {/*<div className="card-body">
                <div className="h-50 grid grid-cols-2 gap-2 content-end">
                  <div>
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="text-end">
                    <p className="card-text text-sm my-0 font-bold">
                      Dr. Yoning François
                    </p>
                    <p className="card-text my-0">Chirugien dentiste</p>
                    <p className="card-text my-0">Yaoundé</p>
                    <p className="card-text my-0">
                      <Notation />
                    </p>
                    <p className="card-text my-0">Voir profil</p>
                    <p className="card-text">
                      <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                        Prendre rendez-vous
                      </button>
                    </p>
                  </div>
                </div>
              </div>*/}

              <div className="card-body">
                <div className="row g-0">
                  <div className="col-md-4 py-12">
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="text-end">
                      <p className="card-text text-sm my-0 font-bold">
                        Dr. Yoning François
                      </p>
                      <p className="card-text my-0">Chirugien dentiste</p>
                      <p className="card-text my-0">Yaoundé</p>
                      <p className="card-text my-0">
                        <Notation />
                      </p>
                      <p className="card-text my-0">
                        <a href="/profilmedecin">Voir profil</a>
                      </p>
                      <p className="card-text">
                        <a
                          href="/appointement"
                          className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs"
                        >
                          Prendre rendez-vous
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-4">
              {/*<div className="card-body">
                <div className="h-50 grid grid-cols-2 gap-2 content-end">
                  <div>
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="text-end">
                    <p className="card-text text-sm my-0 font-bold">
                      Dr. Yoning François
                    </p>
                    <p className="card-text my-0">Chirugien dentiste</p>
                    <p className="card-text my-0">Yaoundé</p>
                    <p className="card-text my-0">
                      <Notation />
                    </p>
                    <p className="card-text my-0">Voir profil</p>
                    <p className="card-text">
                      <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                        Prendre rendez-vous
                      </button>
                    </p>
                  </div>
                </div>
              </div>*/}

              <div className="card-body">
                <div className="row g-0">
                  <div className="col-md-4 py-12">
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="text-end">
                      <p className="card-text text-sm my-0 font-bold">
                        Dr. Yoning François
                      </p>
                      <p className="card-text my-0">Chirugien dentiste</p>
                      <p className="card-text my-0">Yaoundé</p>
                      <p className="card-text my-0">
                        <Notation />
                      </p>
                      <p className="card-text my-0">
                        <a href="/profilmedecin">Voir profil</a>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                            Prendre rendez-vous
                          </button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-4">
              {/*<div className="card-body">
                <div className="h-50 grid grid-cols-2 gap-2 content-end">
                  <div>
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="text-end">
                    <p className="card-text text-sm my-0 font-bold">
                      Dr. Yoning François
                    </p>
                    <p className="card-text my-0">Chirugien dentiste</p>
                    <p className="card-text my-0">Yaoundé</p>
                    <p className="card-text my-0">
                      <Notation />
                    </p>
                    <p className="card-text my-0">Voir profil</p>
                    <p className="card-text">
                      <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                        Prendre rendez-vous
                      </button>
                    </p>
                  </div>
                </div>
              </div>*/}

              <div className="card-body">
                <div className="row g-0">
                  <div className="col-md-4 py-12">
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="text-end">
                      <p className="card-text text-sm my-0 font-bold">
                        Dr. Yoning François
                      </p>
                      <p className="card-text my-0">Chirugien dentiste</p>
                      <p className="card-text my-0">Yaoundé</p>
                      <p className="card-text my-0">
                        <Notation />
                      </p>
                      <p className="card-text my-0">
                        <a href="/profilmedecin">Voir profil</a>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                            Prendre rendez-vous
                          </button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-4">
              {/*<div className="card-body">
                <div className="h-50 grid grid-cols-2 gap-2 content-end">
                  <div>
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="text-end">
                    <p className="card-text text-sm my-0 font-bold">
                      Dr. Yoning François
                    </p>
                    <p className="card-text my-0">Chirugien dentiste</p>
                    <p className="card-text my-0">Yaoundé</p>
                    <p className="card-text my-0">
                      <Notation />
                    </p>
                    <p className="card-text my-0">Voir profil</p>
                    <p className="card-text">
                      <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                        Prendre rendez-vous
                      </button>
                    </p>
                  </div>
                </div>
              </div>*/}

              <div className="card-body">
                <div className="row g-0">
                  <div className="col-md-4 py-12">
                    <img
                      src="/opencare/Img_medecin.png"
                      alt=""
                      className="img-fluid items-center"
                      width="100%"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="text-end">
                      <p className="card-text text-sm my-0 font-bold">
                        Dr. Yoning François
                      </p>
                      <p className="card-text my-0">Chirugien dentiste</p>
                      <p className="card-text my-0">Yaoundé</p>
                      <p className="card-text my-0">
                        <Notation />
                      </p>
                      <p className="card-text my-0">
                        <a href="/profilmedecin">Voir profil</a>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <button className="bg-blue-500 hover::bg-blue-700 text-white font-bold py-2 px-4 rounded-4 text-xs">
                            Prendre rendez-vous
                          </button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Medecin;
