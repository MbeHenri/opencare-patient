import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e:any) => {
        e.reventDefault()    
        alert('password changed')

        axios
      .post("http://localhost:3001/changepassword", { oldPassword, newPassword, confirmPassword })
      .then((res) => {
        if (res.data.changed) {
          navigate("/dashboard");
        } else {
          return
        }
        console.log(res.data);
        //naviagte("/login");
      })
      .catch((err) => console.log(err));
    }

  return (
    <div className="container">
      <h2 className="text-center my-5 text-white">Login Page</h2>
      <form
        className="mx-auto w-25 border border-success rounded bg-secondary p-3"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-white mb-2">Changer votre mot de passe</h4>
        <div className="form-group px-4">
          <label htmlFor="oldpassword" className="text-white ">
            <b>Ancien mot de passe</b>
          </label>
          <input
            type="password"
            className="form-control border border-successn border-lg"
            id="oldpassword"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeholder='Saisir votre mot de passe actuel'
            required
          />
        </div>
        <div className="form-group px-4">
          <label htmlFor="newpassword" className="text-white ">
            <b>Nouveau mot de passe</b>
          </label>
          <input
            type="password"
            className="form-control border border-successn border-lg"
            id="newpassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder='Saisir votre nouveau de passe'
            required
          />
        </div>
        <div className="form-group px-4">
          <label htmlFor="password" className="text-white ">
            <b>Confirmation du nouveau mot de passe</b>
          </label>
          <input
            type="password"
            className="form-control border border-successn border-lg"
            id="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder='Saisir a nouveau votre nouveau mot de passe'
            required
          />
        </div>
        <p className="text-end mt-3 px-4">
          <button className="btn btn-primary">Valider</button>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword