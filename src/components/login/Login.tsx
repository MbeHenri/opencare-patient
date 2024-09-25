import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const userRef = useRef<HTMLInputElement>(null);  // Référence pour l'input utilisateur
  const errRef = useRef<HTMLDivElement>(null);     // Référence pour l'affichage de l'erreur
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
    } catch (error: any) {
      // Vérifiez si l'erreur provient d'un code 404
      if (error.response && error.response.status === 404) {
        setErrorMessage("Utilisateur ou mot de passe incorrect");
        // Utilisez `userRef` pour se concentrer sur le champ de nom d'utilisateur
        userRef.current?.focus();
      } else {
        setErrorMessage((error as Error).message);
      }
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
            {/* Contenu si l'utilisateur est déjà connecté */}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <h1 className="text-center">{t("teleconsultion-title")}</h1>
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-md-10 mx-auto col-lg-6">
                <p className="text-center">
                  {errorMessage && (
                    <p ref={errRef} style={{ color: "red" }}>
                      {errorMessage}
                    </p>
                  )}
                </p>
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
                      ref={userRef}  // Référence utilisée ici
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
              {/* Contenu additionnel */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
