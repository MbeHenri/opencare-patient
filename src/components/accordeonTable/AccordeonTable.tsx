import React, { useEffect, useState } from "react";
import "./AccordeonTable.css";
import api from "../../api/axios";

interface Provider {
  display: string;
  role: string;
}

interface Note {
  note: string;
  authorDisplay: string;
  authorRole: string;
}

interface EncounterRole {
  uuid: string;
  display: string;
}

interface EncounterProvider {
  provider: Provider;
  encounterRole: EncounterRole;
}

interface Encounter {
  uuid: string;
  display: string;
  encounterType: string;
  encounterProviders: EncounterProvider[];
}

interface Visit {
  uuid: string;
  visitType: string;
  startDateTime: string;
  stopDateTime: string;
  notes: Note[];
  providers: Provider[];
}

function AccordeonTable() {
  const [openRowId, setOpenRowID] = useState<any | null>(null);
  const [O3ID, setO3ID] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleRow = (uuid: any) => [
    setOpenRowID(openRowId === uuid ? null : uuid),
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        //setUserData("data");
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token manquant");
        }
        const response = await api.get("/protected", {
          headers: {
            Authorization: token,
          },
        });
        setO3ID(response.data.uuid);
        //setUserData(response.data);
      } catch (error) {
        console.error("Erreur de récupération des données protégées:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let provider = "";
    const visite: Visit[] = [];
    const fetchVisits = async () => {
      await api
        .get(`/patient/${O3ID}/visit`)
        .then(function (response) {
          if (response.status === 200) {
            response.data.results.map((visit: any) => {
              const providers: Provider[] = [];
              const notes: Note[] = [];

              visit.encounters.forEach((encounter: any) => {
                encounter.encounterProviders.forEach((provider: any) => {
                  providers.push({
                    display: provider.provider.person.display,
                    role: provider.encounterRole.display,
                  });
                });
                console.log(encounter);
                encounter.obs.forEach((observation: any) => {
                  notes.push({
                    note: observation.display,
                    authorDisplay:
                      observation.encounter.encounterProviders[0].display,
                    authorRole: "",
                  });
                });
              });

              visite.push({
                uuid: visit.uuid,
                visitType: visit.visitType.display,
                startDateTime: formattedDate(new Date(visit.startDatetime)),
                stopDateTime: formattedDate(new Date(visit.stopDatetime)),
                providers: providers,
                notes: notes,
              });
            });
            console.log(visite);
            setVisits(visite);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchVisits();
    return () => {};
  }, [O3ID]);

  const formattedDate = (date: Date): string => {
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

  return (
    <table className="table accordion-table">
      <thead className="table-info text-start">
        <tr>
          <th>Date et heure début</th>
          <th>Date et heure fin</th>
          <th>Type de visite</th>
          <th>Form name</th>
          <th>Fournisseur</th>
        </tr>
      </thead>
      <thead>
        {visits.map((item) => (
          <React.Fragment key={item.uuid}>
            <tr key={item.uuid}>
              <th>
                <button onClick={() => toggleRow(item.uuid)}>
                  {openRowId === item.uuid ? "\u25B2" : "\u25BC"}
                </button>
                &nbsp;{item.startDateTime}
              </th>
              <th>{item.stopDateTime}</th>
              <th>{item.visitType}</th>
              <th>--</th>
              <th>--</th>
            </tr>
            {openRowId === item.uuid && (
              <tr className="details-row">
                <td colSpan={6}>
                  <div className="details-content">
                    <p>
                      <strong>Description</strong>
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </thead>
    </table>
  );
}

export default AccordeonTable;
