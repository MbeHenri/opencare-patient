import Patient from "../../models/Patient";
import User from "../../models/User";

class HospitalRepository {

    async getPatientDetail(patient_id: string): Promise<Patient> {
        return {
            o3_id: "44588",
            names: "Sarah Taylor",
            gender: "F",
            age: 61,
            birthdate: new Date("1962-09-09T00:00:00.000+0000"),
            birthdateEstimated: false,
        }
    }

    async getUser(user_id: string): Promise<User> {

        return {
            id: "454588",
            names: "Jake Doctor",
        };
    }
}

export default HospitalRepository;