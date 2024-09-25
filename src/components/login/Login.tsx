import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

const LoginForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    // Validation simple
    if (!username || !password) {
      setErrorMessage('Tous les champs sont requis');
      return;
    }

    // Réinitialiser le message d'erreur
    setErrorMessage('');
    setLoading(true);

    try {
      // Remplacez l'URL par l'URL de votre API
      const response = await login(username, password);

      console.log('Réponse de l\'API:', response);

      // Vous pouvez traiter la réponse ici (par exemple, stocker le token, rediriger, etc.)
      
      // Réinitialiser les champs
      if (usernameRef.current) usernameRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
      
    } catch (error) {
      console.log(error)
        // Gérer les erreurs de réponse de l'API
        setErrorMessage((error as Error).message|| 'Une erreur s\'est produite lors de la connexion.');
      
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
                <p className="text-center">
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                        placeholder="name@example.com"
                        id="username"
                        ref={usernameRef}
                        required
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
                        ref={passwordRef}
                        required
                      />
                      <label htmlFor="floatingPassword">
                        {t("login-form-password")}
                      </label>
                    </div>
                    <button type="submit" disabled={loading} className="w-100 btn btn-lg bg-white text-primary">
                      {loading ? 'Loading...' : 'Login'}
                    </button>
                  </form>
              </div>
            </div>
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
      ) }
    </>
  );
};

export default LoginForm;
