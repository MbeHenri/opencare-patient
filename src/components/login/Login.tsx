import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      const message = (error as Error).message;
      console.log(error)
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <div className="container">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <h1 className="text-center">{t("teleconsultion-title")}</h1>
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-md-6 d-flex align-items-center justify-content-center border rounded-5 bg-blue-400 text-white min-vh-100">
                <h2 className="text-uppercase text-center">
                  <strong>{t("login-title2")}</strong>
                </h2>
              </div>
              <div className="col-md-6 text-center text-lg-start mt-0 pt-0">
                <div className="list-group">
                  <div className="liste">
                    <img
                      src="/opencare/Cadre1.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">
                      <p className="my-0">{t("login-title3")}</p>
                      <p>{t("login-title4")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre2.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered my-1">
                      <p className="my-0">{t("login-title5")}</p>
                      <p className="my-0">{t("login-title6")}</p>
                      <p>{t("login-title7")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre3.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">
                      <p className="my-0">{t("login-title8")}</p>
                      <p>{t("login-title9")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre4.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">{t("login-title10")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <h1 className="text-center">{t("teleconsultion-title")}</h1>
            <div className="row align-items-center g-lg-5 py-5">
            <div className="col-md-10 mx-auto col-lg-6">
            {/* Div pour afficher les messages d'erreur */}
            <div className="alert alert-danger d-none" role="alert">
              {errorMessage}
            </div>
            <form
              className="p-4 p-md-5 border rounded-5 bg-blue-400 text-white"
              onSubmit={handleSubmit}
            >
              <h3 className="text-center">{t("login-form-title")}</h3>
              <h5 className="text-center mb-5">{t("login-title11")}</h5>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  ref={userRef}
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">
                  {t("login-form-username")}
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">
                  {t("login-form-password")}
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-100 btn btn-lg bg-white text-primary"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
              <div className="col-lg-6 text-center text-lg-start mt-0 pt-0">
                <div className="list-group">
                  <div className="liste">
                    <img
                      src="/opencare/Cadre1.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">
                      <p className="my-0">{t("login-title3")}</p>
                      <p>{t("login-title4")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre2.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">
                      <p className="my-0">{t("login-title5")}</p>
                      <p className="my-0">{t("login-title6")}</p>
                      <p>{t("login-title7")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre3.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">
                      <p className="my-0">{t("login-title8")}</p>
                      <p>{t("login-title9")}</p>
                    </div>
                  </div>
                  <div className="liste">
                    <img
                      src="/opencare/Cadre4.png"
                      alt="twbs"
                      width="100%"
                      height="32"
                      className="img-fluid flex-shrink-0"
                    />
                    <div className="centered">{t("login-title10")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
