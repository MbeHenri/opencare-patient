import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

interface Visit {
  uuid: string;
  startDatetime: string;
  stopDatetime: string;
  visiType: {
    uuid: string;
    name: string;
    display: string;
  };
  encounters: Encounter[];
}

interface Encounter {
  uuid: string;
  encounterDatetime: string;
  encounterType: {
    uuid: string;
    display: string;
  };
  diagnoses: Diagnosis[];
  orders: Order[];
  obs: Observation[];
}

interface Diagnosis {
  uuid: string;
  display: string;
  rank: number;
  diagnosis: string;
}

interface Order {
  uuid: string;
  display: string;
}

interface Observation {
  uuid: string;
  display: string;
}

function Visite() {
  const { user } = useAuth();
  const [O3ID, setO3ID] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (user) setO3ID(user.uuid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchVisits = async () => {
      //try {
      //const response = await api.get(`/patient/${O3ID}/visit`)
      await api
        .get(`/patient/${O3ID}/visit`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.results);
            setVisits(response.data.results);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    };
    fetchVisits();
  }, [O3ID]);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      {visits.map((visit) => (
        <div key={visit.uuid} className="container">
          <h3>Visit Type: {visit.visiType.display}</h3>
        </div>
      ))}
    </div>
  );
}

export default Visite;
