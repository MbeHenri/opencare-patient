import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
const LOGIN_URL = "/auth";

function Login() {
  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    /*try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }*/

    /*alert("Form submitted");
    axios.post("http:///localhost:3001/login");*/
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Vous êtes maintenant connecté</h1>
          <br />
          <p>
            <a href="#">Rendez-vous dans votre page d'accueil</a>
          </p>
        </section>
      ) : (
        <div className="mt-5">
          <h2 className="text-center">Login Page</h2>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}></p>
          <form
            className="mx-auto w-25 border border-success rounded bg-secondary p-3"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center text-white mb-2">
              Formulaire de connexion
            </h4>
            <div className="form-group px-4 mb-2">
              <label htmlFor="username" className="text-white">
                <b>Username</b>
              </label>
              <input
                type="text"
                className="form-control border border-success border-lg"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div className="form-group px-4">
              <label htmlFor="password" className="text-white ">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control border border-successn border-lg"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
            <p className="text-end mt-3 px-4">
              <button className="btn btn-primary">Se connecter</button>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
