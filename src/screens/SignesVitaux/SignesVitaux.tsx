import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Onglets from "../../components/onglets/Onglets";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { format, parseISO } from "date-fns";
import { Container } from "react-bootstrap";

interface Observation {
  date: string;
  temperature: number | null;
  bloodPressureSystolic: string | null;
  bloodPressureDiastolic: string | null;
  spo2: number | null;
  respiratoryRate: number | null;
  pulse: number | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  muac: number | null;
}

function SignesVitaux() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [observations, setObservations] = useState<Observation[]>([]);

  //const [filterText, setFilterText] = useState("");
  //const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //const [showAlert, setShowAlert] = useState(false);


  /*const filteredItems = data.filter(
    (item) =>
      item.specialite &&
      item.specialite.toLowerCase().includes(filterText.toLowerCase())
  );*/

  /*const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Filtrer par spécialité"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="me-2"
        />
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Form>
    );
  }, [filterText, resetPaginationToggle]);*/

  const handleRdvRequest = (row: any) => {
    // Logique pour gérer la demande de RDV
    //setShowAlert(true);
    //setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (O3ID) {
      const fetchObservations = async () => {
        await api
          .get(`/patient/${O3ID}/observation`)
          .then((response) => {
            if (response.status === 200) {
              const obsArray = response.data?.results.map(
                (entry: any) => entry.resource
              );
              const extracted = extractObservations(obsArray);
              setObservations(extracted);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchObservations();
    }
    return () => {};
  }, [O3ID]);

  const extractObservations = (observations: any[]): Observation[] => {
    const groupedObservations: { [key: string]: Observation } = {};

    observations.forEach((obs) => {
      const date = getFormattedDateFR(new Date(obs.effectiveDateTime));

      if (!groupedObservations[date]) {
        groupedObservations[date] = {
          date: obs.effectiveDateTime,
          temperature: null,
          bloodPressureSystolic: null,
          bloodPressureDiastolic: null,
          spo2: null,
          respiratoryRate: null,
          pulse: null,
          height: null,
          weight: null,
          bmi: null,
          muac: null,
        };
      }

      const coding = obs.code.coding.find((code: any) =>
        [
          "http://loinc.org",
          "http://snomed.info/sct/",
          "https://cielterminology.org",
        ].includes(code.system)
      );

      if (coding) {
        if (coding.code === "5088") {
          // CIEL code for body temperature
          groupedObservations[date].temperature = obs.valueQuantity.value;
        } else if (coding.code === "5085") {
          // CIEL code for systolic blood pressure
          groupedObservations[date].bloodPressureSystolic =
            obs.valueQuantity.value;
        } else if (coding.code === "5086" || coding.code === "35094-2") {
          // CIEL code for systolic blood pressure
          groupedObservations[date].bloodPressureDiastolic =
            obs.valueQuantity.value;
        } else if (coding.code === "5092") {
          // CIEL code for oxygen saturation
          groupedObservations[date].spo2 = obs.valueQuantity.value;
        } else if (coding.code === "5242") {
          // CIEL code for Respiratory rate
          groupedObservations[date].respiratoryRate = obs.valueQuantity.value;
        } else if (coding.code === "5087") {
          // CIEL code for Pulse
          groupedObservations[date].pulse = obs.valueQuantity.value;
        } else if (coding.code === "1343") {
          // CIEL code for Mid-upper arm circumference
          groupedObservations[date].muac = obs.valueQuantity.value;
        } else if (coding?.code === "5089" && obs.valueQuantity.unit === "kg") {
          // CIEL code for Weight
          groupedObservations[date].weight = obs.valueQuantity.value;
        } else if (coding?.code === "5090" && obs.valueQuantity.unit === "cm") {
          // CIEL code for Height
          groupedObservations[date].height = obs.valueQuantity.value;
        }
        // CIEL code for Karnofsky performance score 5283 units = %
      }
    });

    // Calculate Body Mass Indice (BMI) after all observations are grouped
    for (let date in groupedObservations) {
      const obs = groupedObservations[date];
      if (obs.weight && obs.height) {
        obs.bmi = Math.abs(obs.weight / (obs.height / 100) ** 2);
      }
    }

    return Object.values(groupedObservations);
  };

  const getFormattedDateFR = (date: Date): string => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  const getFormattedDateEN = (date: string): string => {
    const isoDateString = "1976-01-01T00:00:00.00Z"; // Exemple de date ISO

    // Parse la date ISO en objet Date
    const parsedDate = parseISO(date);

    // Formatte la date en utilisant le format anglais
    const englishDate = format(parsedDate, "MMMM dd, yyyy, hh:mm a");

    return englishDate;
  };

  return (
    <>
      <Container className="flex-grow-1">
        {/*<DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />*/}
      </Container>

      {user ? (
        <Container fluid>
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              {t("dossier-medical")}
            </h2>
          </div>
          <hr className="mb-5" />
          <Onglets O3ID={O3ID} page="vitals" valide={true} />
          <div className="row my-5">
            <h5 className="mb-4">
              <span className="border-b-4 border-sky-500">
                {t("vital-page-title1")}
              </span>
            </h5>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-info text-start">
                  <tr>
                    <th>{t("vital-page-table-td-title1")}</th>
                    <th className="text-center">
                      {t("vital-page-table-td-title2")}
                    </th>
                    <th className="text-center">
                      {t("vital-page-table-td-title3")}
                    </th>
                    <th className="text-center">
                      {t("vital-page-table-td-title4")}
                    </th>
                    <th className="text-center">
                      {t("vital-page-table-td-title5")}
                    </th>
                    <th className="text-center">
                      {t("vital-page-table-td-title6")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((obs, index) => (
                    <tr key={index}>
                      {i18n.language === "en" ? (
                        <td>{getFormattedDateEN(obs.date)}</td>
                      ) : (
                        <td>{getFormattedDateFR(new Date(obs.date))}</td>
                      )}
                      <td>
                        {obs.temperature !== null ? obs.temperature : "-"}
                      </td>
                      <td>
                        {obs.bloodPressureSystolic !== null &&
                        obs.bloodPressureDiastolic !== null
                          ? `${obs.bloodPressureSystolic}/${obs.bloodPressureDiastolic}`
                          : "-"}
                      </td>
                      <td>{obs.pulse !== null ? obs.pulse : "-"}</td>
                      <td>{obs.respiratoryRate}</td>
                      <td>{obs.spo2 !== null ? obs.spo2 : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row my-5">
            <h5 className="mb-4">
              <span className="border-b-4 border-sky-500">
                {t("vital-page-title2")}
              </span>
            </h5>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-info text-start">
                  <tr>
                    <th>{t("vital-page-table-td-title1")}</th>
                    <th>{t("vital-page-table-td-title7")}</th>
                    <th>{t("vital-page-table-td-title8")}</th>
                    <th>{t("vital-page-table-td-title9")}</th>
                    <th>{t("vital-page-table-td-title10")}</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((obs, index) => (
                    <tr key={index}>
                      {i18n.language === "en" ? (
                        <td>{getFormattedDateEN(obs.date)}</td>
                      ) : (
                        <td>{getFormattedDateFR(new Date(obs.date))}</td>
                      )}
                      <td>{obs.weight !== null ? obs.weight : "-"}</td>
                      <td>{obs.height !== null ? obs.height : "-"}</td>
                      <td>{obs.bmi !== null ? obs.bmi.toFixed(1) : "-"}</td>
                      <td>{obs.muac !== null ? obs.muac : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      ) : (
        <Container fluid>
          <div className="row">
            <h2 className="text-center mt-4 text-blue-400 mb-4">
              {t("dossier-medical")}
            </h2>
          </div>
          <hr className="mb-5" />
          <h6>{t("no-authorized")}</h6>
        </Container>
      )}
    </>
  );
}

export default SignesVitaux;
