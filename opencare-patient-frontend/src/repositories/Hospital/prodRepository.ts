import { O3_BASE64, O3_BASE_URL } from "../env";
import Patient from "../../models/Patient";
import User from "../../models/User";
import HospitalRepository from "./repository";
import { BadResponse } from "../errors";


class ProdHospitalRepository extends HospitalRepository {

    async getPatientDetail(patient_id: string): Promise<Patient> {
        
        
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${O3_BASE64}`);
        
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        
        //console.log(O3_BASE_URL);
        const result: Patient = await fetch(`${O3_BASE_URL}/patient/${patient_id}?v=full`, requestOptions)
        .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new BadResponse()
            })
            .then(result => {
                const person = result.person;
                return {
                    o3_id: result.uuid,
                    names: person.display,
                    gender: person.gender,
                    age: person.age,
                    birthdate: new Date(person.birthdate),
                    birthdateEstimated: person.birthdateEstimated,
                }
            })

        return result;
    }

    async getUser(user_id: string): Promise<User> {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const result: User = await fetch(`${O3_BASE_URL}/user/${user_id}?v=full`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new BadResponse()
            })
            .then(result => {
                const person = result.person;
                return {
                    id: person.uuid,
                    names: person.display,
                }
            })

        return result;
    }

}

export default ProdHospitalRepository