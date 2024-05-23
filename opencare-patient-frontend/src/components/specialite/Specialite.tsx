import React from "react";
import "./Specialite.css";

function Specialite() {
  return (
    <div id="specialite" className="text-white py-1 my-4">
      <h2 className="text-center pt-5">Nos spécialistés</h2>
      <div className="d-flex align-items-center mb-5 mt-5 px-5">
        <div>
          <img
            src="/opencare/img_generaliste.png"
            alt=""
            width="50%"
            className="img-fluid ms-5"
          />
          <p className="ms-5 ps-4 mt-3 h5">Généraliste</p>
        </div>
        <div>
          <img
            src="/opencare/img_pediatre.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-4 mt-3 h5">Pédiatrie</p>
        </div>
        <div>
          <img
            src="/opencare/Img_gunecologue.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-3 mt-3 h5">Gynécologue</p>
        </div>
        <div>
          <img
            src="/opencare/img_dentiste.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-4 ps-1 mt-3 h5">Dentiste</p>
        </div>
        <div>
          <img
            src="/opencare/Img_optamologue.png"
            alt=""
            width="55%"
            className="img-fluid mx-0 px-0"
          />
          <p className="ms-2 mt-3 h5">Ophtamologue</p>
        </div>
      </div>
    </div>
  );
}

export default Specialite;
