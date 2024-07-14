import React from "react";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid caviar_dreams">
      <header className="py-3 mb-4 border-bottom shadow">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
          <div className="col-md-3 mb-2 mb-md-0"></div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"></ul>

          <div className="col-md-3 ">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                role="switch"
                id="flexSwitchCheckChecked"
                defaultChecked
              />
              <label
                htmlFor="flexSwitchCheckChecked"
                className="form-check-label"
              >
                Français
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img
                src="/opencare/Logo-texte.png"
                alt=""
                width="80%"
                height="72"
                className="bi ms-5"
              />
            </a>
          </div>
          {user ? (
            <>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 active">
                    Acceuil
                  </a>
                </li>
                <li>
                  <a href="/services" className="nav-link px-2 text-body">
                    Les services
                  </a>
                </li>
                <li>
                  <a
                    href="/dossier_medical"
                    className="nav-link px-2 text-body"
                  >
                    Mon dossier médical
                  </a>
                </li>
                <li>
                  <a href="/contact" className="nav-link px-2 text-body">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <p className="mx-1 mt-4">Vous êtes connecté</p>
                  <img
                    src="/opencare/user-img-connected.png"
                    alt=""
                    height="42"
                    width="10%"
                    className="img-fluid mx-1"
                  />
                  <div className="nav-item dropdown mt-4 mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    ></a>
                    <ul className="dropdown-menu text-center">
                      <li>
                        <a className="dropdown-item" href="/profile">
                          Mon profil
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Mes factures
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleLogout}
                        >
                          Déconnexion
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 active">
                    Acceuil
                  </a>
                </li>
                <li>
                  <a href="/contact" className="nav-link px-2 text-body">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <p className="mx-1 mt-4">Vous êtes déconnecté</p>
                  <img
                    src="/opencare/user-img-disconnect.png"
                    alt=""
                    height="42"
                    width="10%"
                    className="img-fluid mx-1"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
