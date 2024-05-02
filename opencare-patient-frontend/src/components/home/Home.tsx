import React, { useCallback, useEffect, useState } from "react";
/* import PatientService from "../../services/patient";
import Doctor from "../../models/Doctor";
import JoinRoomButton from "../RoomButton/JoinRoomButton";
import Patient from "../../models/Patient"; */
import RoomButton from "../RoomButton";
import PatientService from "../../services/patient";
import Patient from "../../models/Patient";
import Doctor from "../../models/Doctor";
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

  const o3_id = "f91940a8-bd8e-495b-8cbf-2a01da8ec8e9";
  const patient_service = PatientService.getInstance();
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [doctors, setDoctors] = useState<Array<Doctor> | null>(null);

  useEffect(() => {
    const func = async () => {
      await patient_service.getPatient(o3_id).then((patient) => {
        setPatientDetails(patient);
      });
      await patient_service.getRelatedDoctors(o3_id).then((doctors) => {
        setDoctors(doctors);
      });
    };
    func();
    return () => {};
  }, []);
  
  const handleClick = useCallback(
    (url:string) => {
      setUrl(url)
    },
    [],
  )
  
  return (
    <div className="container">
      <h2 className="text-center text-white mt-5">Home page</h2>
      <div className="row">{JSON.stringify(patientDetails)}</div>
      <br />
      <div className="row">{JSON.stringify(doctors)}</div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white my-4">Liste des rendez-vous</h4>
          <table className="table table-sm table-striped">
            <thead>
              <tr className="text-white">
                <th>#</th>
                <th>Nom - prénom</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            
              {
                doctors ? doctors.map((doctor) => {
                  
                  return <tr className="text-white">
                  <td>
                    <b>1</b>
                  </td>
                  <td>{doctor.names}</td>
                  <td>
                    <RoomButton
                      doctor={doctor}
                      callback={handleClick}
                    />
                  </td>
                </tr>
                }) : <p>Loading ... </p>
              }
              
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <iframe src={url} width="100%" height="500px" title="Room"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;
