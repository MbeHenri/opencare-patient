import React, { useCallback, useMemo, useState } from "react";
import PatientService from "../../services/patient";
//import { useNavigate } from "react-router-dom";

function Home() {
  const patient_service = useMemo(() => {
    return PatientService.getInstance();
  }, []);

  const [url, setUrl] = useState("");

  //const navigate = useNavigate();
  const handlePress = useCallback(async () => {
    // alert("commencer la consultation");
    const url = patient_service.getMeetingURL("11111");
    if (url) {
      // navigate(url);
      // window.open(url);
      setUrl(url);
    }
  }, [patient_service]);

  return (
    <div className="container">
      <h2 className="text-center text-white mt-5">Home page</h2>
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white my-4">Liste des rendez-vous</h4>
          <table className="table table-sm table-striped">
            <thead>
              <tr className="text-white">
                <th>#</th>
                <th>Nom - prénom</th>
                <th>Spécialité</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white">
                <td>
                  <b>1</b>
                </td>
                <td>Doe John</td>
                <td>Généraliste</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handlePress}
                  >
                    Joindre
                  </button>
                </td>
              </tr>
              <tr className="text-white">
                <td>
                  <b>2</b>
                </td>
                <td>Doe John</td>
                <td>Généraliste</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handlePress}
                  >
                    Joindre
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <iframe src={url} width="100%" height="75%" title="Room"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;
