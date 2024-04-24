import Patient from "../models/Patient";
import Room from "../models/Room";
import { O3_BASE64, O3_BASE_URL } from "./env";

type TypeRepository = "good" | "fake";

export class PatientRepository {

    getTalkRooms(name: string): Promise<Array<Room>> {

        return new Promise<Array<Room>>((resolve, reject) => {
            setTimeout(() => {
                resolve([]);
            }, 10000);
        })
    }

    async getO3PatientDetail(patient_id: string): Promise<Patient> {

        return new Promise<Patient>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    o3_id: "44588",
                    names: "Sarah Taylor",
                    gender: "F",
                    age: 61,
                    birthdate: new Date("1962-09-09T00:00:00.000+0000"),
                    birthdateEstimated: false,
                });
            }, 10000);
        });
    }
}

class RealPatientRepository extends PatientRepository {

    async getO3PatientDetail(patient_id: string): Promise<Patient> {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${O3_BASE64}`);
        myHeaders.append("Cookie", "JSESSIONID=E6732EC6DF45542211309327F6E98D29");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const result: Patient = await fetch(`${O3_BASE_URL}/patient/${patient_id}?v=full`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const person = result.person;
                return {
                    o3_id: person.uuid,
                    names: person.display,
                    gender: person.gender,
                    age: person.age,
                    birthdate: new Date(person.birthdate),
                    birthdateEstimated: person.birthdateEstimated,
                }
            })
            .then(() => {
                return {
                    o3_id: "44588",
                    names: "Sarah Taylor",
                    gender: "F",
                    age: 61,
                    birthdate: new Date("1962-09-09T00:00:00.000+0000"),
                    birthdateEstimated: false,
                };
            })

        return result;
    }
}

export function getPatientRepository(t: TypeRepository = "fake"): PatientRepository {
    if (t === "fake") {
        return new PatientRepository();
    }
    return new RealPatientRepository();
}
