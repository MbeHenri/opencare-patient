/* eslint-disable array-callback-return */
import { O3_BASE64, O3_BASE_URL } from "../env";
import Personnel from "../../models/Personnel";
import EncounterRepository from "./repository";
import { BadResponse } from "../errors";

class ProdEncounterRepository extends EncounterRepository {
  async getPersonnelDetail(personnel_id: string): Promise<Personnel> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    //console.log(O3_BASE_URL);
    const result: Personnel = await fetch(
      `${O3_BASE_URL}/provider/${personnel_id}?v=full`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new BadResponse();
      })
      .then((result) => {
        const person = result.person;
        return {
          uuid: result.uuid,
          display: person.display,
          gender: person.gender,
          age: person.age,
          birthdate: new Date(person.birthdate),
        };
      });
    return result;
  }
  async getListOfDoctors(): Promise<Array<Personnel>> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    let doctors: Array<Personnel> = [];
    await fetch(`${O3_BASE_URL}/provider?q=doctor`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new BadResponse();
      })
      .then((result) => {
        const data: Array<any> = result.results;
        data.map(async (p) => {
          const detail_doctor = await this.getPersonnelDetail(p.uuid);
          doctors.push(
            {
              uuid: detail_doctor.uuid as string,
              display: detail_doctor.display as string,
              gender: detail_doctor.gender,
              age: detail_doctor.age,
              birthdate: detail_doctor.birthdate,
            },
            {
              uuid: detail_doctor.uuid as string,
              display: detail_doctor.display as string,
              gender: detail_doctor.gender,
              age: detail_doctor.age,
              birthdate: detail_doctor.birthdate,
            }
          );
        });
      });

    return doctors;
  }

  /**
   * create a new visit
   * uuid pour les Facility visit: 7b0f5697-27e3-40c4-8bae-f4049abfb4ed
   * uid pour la Community Outreach: 1ce1b7d4-c865-4178-82b0-5932e51503d6
   * @returns true or false
   */
  async createVisit(patient_uuid: any): Promise<boolean> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

    var formdata = new FormData();
    formdata.append("patient", patient_uuid);
    formdata.append("visitType", "7b0f5697-27e3-40c4-8bae-f4049abfb4ed");
    formdata.append("startDatetime", "2024-06-01T09:00:00.000+0000");
    formdata.append("location", "1ce1b7d4-c865-4178-82b0-5932e51503d6");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const new_visit = await fetch(`${O3_BASE_URL}/visit`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new BadResponse();
      })
      .then((result) => {
        return result;
      });

    return new_visit;
  }

  /**
   * create a new visit
   * uuid pour les Facility visit: 7b0f5697-27e3-40c4-8bae-f4049abfb4ed
   * uid pour la Community Outreach: 1ce1b7d4-c865-4178-82b0-5932e51503d6
   * @returns true or false
   */
  async createEncounter(
    patient_uuid: any,
    doctor_uuid: any,
    visit_uuid: any = ""
  ): Promise<boolean> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

    var formdata = new FormData();
    formdata.append("patient", patient_uuid);
    formdata.append("encounterType", "7b0f5697-27e3-40c4-8bae-f4049abfb4ed");
    //formdata.append("visit", visit_uuid);
    formdata.append("encounterDatetime", "2024-06-01T09:00:00.000+0000");
    formdata.append("provider", doctor_uuid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const new_encounter = await fetch(
      `${O3_BASE_URL}/encounter`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new BadResponse();
      })
      .then((result) => {
        return result;
      });

    return new_encounter;
  }
}

export default ProdEncounterRepository;
