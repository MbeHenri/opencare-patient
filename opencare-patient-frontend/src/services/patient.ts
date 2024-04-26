import Doctor from "../models/Doctor";
import Patient from "../models/Patient";
import { getHospitalRepository } from "../repositories/Hospital";
import HospitalRepository from "../repositories/Hospital/repository";
import { getRoomRepository } from "../repositories/Room";
import RoomRepository from "../repositories/Room/repository";

class PatientService {
  static instance: PatientService | null = null;

  hospital_rep: HospitalRepository;
  room_rep: RoomRepository;

  constructor() {
    this.hospital_rep = getHospitalRepository();
    this.room_rep = getRoomRepository();
  }

  /**
   * 
   * @returns patient service
   */
  static getInstance(): PatientService {
    if (PatientService.instance) {
      return PatientService.instance;
    } else {
      PatientService.instance = new PatientService();
      return PatientService.instance;
    }

  }

  /**
   * 
   * @param patient_id O3 identifier of a patient
   * @param doctor_id O3 identifier of a related doctor
   * @returns URL of the meeting
   */
  getMeetingURL(patient_id: string, doctor_id: string): string {
    return "https://www.youtube.com/watch?v=SD_FQzN0n3A";
  }

  /**
   * 
   * @param patient_id O3 identifier of a patient
   * @returns array of related Doctors
   */
  getRelatedDoctors(patient_id: string): Array<Doctor> {
    return [];
  }

  /**
   * 
   * @param patient_id patient app identifier of a patient
   * @returns details of a patient
   */
  async getPatient(patient_id: string): Promise<Patient> {
    return await this.hospital_rep.getPatientDetail(patient_id);
  }

}

export default PatientService;
