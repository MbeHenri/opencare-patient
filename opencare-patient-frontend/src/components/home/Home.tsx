import React, { useState } from "react";
/* import PatientService from "../../services/patient";
import Doctor from "../../models/Doctor";
import JoinRoomButton from "../RoomButton/JoinRoomButton";
import Patient from "../../models/Patient"; */
import RoomButton from "../RoomButton";
//import { useNavigate } from "react-router-dom";

function Home() {
  /*   const patient_service = useMemo(() => {
    return PatientService.getInstance();
  }, []); */

  const [url, setUrl] = useState("");

  /*   const patient: Patient = {
    o3_id: "44588",
    names: "Sarah Taylor",
    gender: "F",
    age: 61,
    birthdate: new Date("1962-09-09T00:00:00.000+0000"),
    birthdateEstimated: false,
  }; */

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
                  <RoomButton
                    doctor={{
                      id: "id1",
                      names: "Jacques",
                      related_room: {
                        name: "id1#id2",
                        token: "sdsdfdf",
                      },
                    }}
                    callback={setUrl}
                  />
                </td>
              </tr>
              <tr className="text-white">
                <td>
                  <b>2</b>
                </td>
                <td>Doe John</td>
                <td>Généraliste</td>
                <td>
                  <RoomButton
                    doctor={{
                      id: "id3",
                      names: "Roland",
                      related_room: {
                        name: "id3#id2",
                        token: "sdsdfdf",
                      },
                    }}
                    callback={setUrl}
                  />
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
