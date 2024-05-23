import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault();
    const getResult = await login(user, pwd);
    if (getResult) {
      if (getResult.code === 400) {
        setErrMsg(getResult.message);
        setSuccess(false);
      }
      if (getResult.code === 201) {
        // Rediriger ou mettre à jour l'état de l'application pour afficher le contenu protégé
        console.log(getResult);
        setSuccess(true);
        navigate("/teleconsultation");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Vous êtes maintenant connecté</h1>
          <br />
          <p>
            <a href="/teleconsultation">
              Rendez-vous dans votre page d'accueil
            </a>
          </p>
        </section>
      ) : (
        <div className="container">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <h1 className="text-center">Téléconsultation avec un médécin</h1>
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-md-10 mx-auto col-lg-6">
                <p className="text-center">
                  <small
                    ref={errRef}
                    className={
                      errMsg ? "alert alert-danger text-danger" : "offscreen"
                    }
                  >
                    {errMsg}
                  </small>
                </p>
                <form className="p-4 p-md-5 border rounded-5 bg-blue-400 text-white">
                  <h3 className="text-center">Vous êtes patient</h3>
                  <h5 className="text-center mb-5">Accédez à votre portail</h5>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      ref={userRef}
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Utilisateur</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Mot de passe</label>
                  </div>
                  <div className="checkbox mb-3">
                    <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button
                    className="w-100 btn btn-lg bg-white"
                    onClick={handleLogin}
                  >
                    Se connecter
                  </button>
                  <hr className="my-4" />
                  <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                  </small>
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
                      <p className="my-0">Appel video et chat</p>
                      <p>confidentiel et sécurisé</p>
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
                      <p className="my-0">Accès sécurisé à votre dossier</p>
                      <p className="my-0">médical en ligne</p>
                      <p>partout et à tout moment</p>
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
                      <p className="my-0">Confidentialité </p>
                      <p>de vos données</p>
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
                    <div className="centered">Gain de temps</div>
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
