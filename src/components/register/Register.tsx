import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const naviagte = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { ID, password })
      .then((res) => {
        naviagte("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2 className="text-center my-5 text-white">Register Page</h2>
      <form
        className="mx-auto w-25 border border-success rounded bg-secondary p-3"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-white mb-2">New Patient</h4>
        <div className="form-group px-4 mb-2">
          <label htmlFor="ID" className="text-white">
            <b>ID</b>
          </label>
          <input
            type="text"
            className="form-control border border-success border-lg"
            id="ID"
            autoComplete="off"
            onChange={(e) => setID(e.target.value)}
            value={ID}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <p className="text-end mt-3 px-4">
          <button className="btn btn-primary">Enregistrer</button>
        </p>
      </form>
    </div>
  );
}

export default Register;
