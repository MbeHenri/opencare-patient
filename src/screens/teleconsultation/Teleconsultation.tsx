import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { MeetIframe } from "../../components/MeetIframe";
import Bloc3 from "../../components/bloc3/Bloc3";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Teleconsultation(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query = useQuery();
  const url = query.get("url");
  const { user } = useAuth();
  //const [O3ID, setO3ID] = useState("");
  const [username, setUsername] = useState("");


  useEffect(() => {
    async function fetchData() {
      if (user){
        //setO3ID(user.uuid);
        setUsername(user.username);
      } 
    }
    fetchData();
  }, [user]);

  const handleClick = () => {
    navigate("/patient_appointment");
  };

  if (!user)
    return (
      <div className="container caviar_dreams">
        <h6>
          {t("no-authorized")}
        </h6>
      </div>
    );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h2 className="text-center mt-4 text-blue-400 mb-4">
            {t("teleconsultation-page-title1")}
          </h2>
        </div>
        <hr className="mb-5" />
        {url ? (
        <div className="container caviar_dreams">
	    <div className="row mb-5">
	    <h2 className="text-uppercase text-center mt-4 text-blue-500">
		{t("teleconsultation-page-title2")}
	      </h2>
	      <h4 className="text-center">
		{t("teleconsultation-page-title3")} {t("teleconsultation-page-title6")}
	      </h4>
	      <p className="text-center">{t("teleconsultation-page-title4")}</p>
	      <hr />
	      <div className="col-md-8">
	         <MeetIframe url={url} username={username} />
	      </div>
	      <div className="col-md-4 border">
		<Bloc3 />
	      </div>
	    </div>
	 </div>
        ) : (
          <>
            <div className="container caviar_dreams">
              <h6>
                {t("teleconsultation-page-title5")}
                <button className="btn btn-primary" onClick={handleClick}>
                  {t("teleconsultation-page-btn-text")}
                </button>
              </h6>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Teleconsultation;
