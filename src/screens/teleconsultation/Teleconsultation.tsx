import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {MeetIframe} from "../../components/MeetIframe";
import { useAuth } from "../../context/AuthContext";

interface User {
  username: string;
  display: string;
}

function Teleconsultation(): JSX.Element {
  const navigate = useNavigate();
  const { url } = useParams();
  const { user, logout } = useAuth();
  const [O3ID, setO3ID] = useState("");


	useEffect(() => {
	    async function fetchData() {
	      if (user) setO3ID(user.uuid);
	    }
	    fetchData();
	  }, [user]);


	const handleClick = () => {
	navigate('/patient_appointment')
	}

 if (!user)
    return (
      <div className="container caviar_dreams">
        <h6>
          Vous n'êtes pas connecté. Veillez vous connecter pour accéder à la Teleconsultation
        </h6>
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            Salle de Téléconsultation
          </h2>
        </div>
        <hr className="mb-5" />

        {url ? (
          <MeetIframe url={url}/>
        ) : (
          <>
            <div className="container caviar_dreams">
		<h6>
		  Aucune salle de reunion trouver
		  <button className="btn btn-primary" onClick={handleClick}>Retour au dossier medical</button>
		</h6>
	      </div>
          </>
        )}
      </div>
    </>
  );
}

export default Teleconsultation;
