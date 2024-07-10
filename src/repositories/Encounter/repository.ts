import Personnel from "../../models/Personnel";

class EncounterRepository {
  async getPersonnelDetail(patient_id: string): Promise<Personnel> {
    return {
      uuid: "44588",
      display: "Sarah Taylor",
      gender: "F",
      age: 61,
      birthdate: new Date("1962-09-09T00:00:00.000+0000"),
    };
  }

  /**
   * get personnel
   * @returns personnels
   */
  async getListOfDoctors(): Promise<Array<Personnel>> {
    return [];
  }

  /**
   * create a new visit
   * @returns true or false
   */
  async createVisit(patient_uuid: any): Promise<boolean> {
    return false;
  }

  /**
   * create a new visit
   * @returns true or false
   */
  async createEncounter(
    patient_uuid: any,
    doctor_uuid: any,
    visit_uuid: any = ""
  ): Promise<boolean> {
    return false;
  }
}

export default EncounterRepository;
