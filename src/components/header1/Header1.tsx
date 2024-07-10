import React from "react";

function Header1() {
  return (
    <div className="container-fluid">
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
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/" className="nav-link px-2 active">
                Acceuil
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
        </div>
      </header>
    </div>
  );
}

export default Header1;
