import Doctor from "../models/Doctor";
import Patient from "../models/Patient";
import Room from "../models/Room";
import { getHospitalRepository } from "../repositories/Hospital";
import HospitalRepository from "../repositories/Hospital/repository";
import { getRoomRepository } from "../repositories/Room";
import RoomRepository from "../repositories/Room/repository";
import { TALK_HOST, TALK_PORT } from "../repositories/env";

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
   * get a room link related to a doctor
   * @param doctor doctor
   * @returns 
   */
  async getMeetingURL(doctor: Doctor): Promise<string> {
    return await this.getRoomURL(doctor.related_room);
  }

  /**
    * get a room link
    * @param room room
    * @returns 
    */
  async getRoomURL(room: Room): Promise<string> {
    return `https://${TALK_HOST}:${TALK_PORT}/call/${room.token}`;
  }


  /**
   * get a list of doctors related to theirs rooms 
   * @param patient_id O3 identifier of a patient
   * @returns array of related Doctors
   */
  async getRelatedDoctors(patient_id: string): Promise<Array<Doctor>> {

    // on recupère la liste des conversations auquelles le patient est participant
    // en recupérant son mot de passe Talk
    const rooms = await this.getRelatedRooms(patient_id);

    // on récupère les docteurs réliés à chacune de ces conversations
    const doctors: Array<Doctor> = [];
    for (let i = 0; i < rooms.length; i++) {
      const doctor = await this.getRelatedDoctor(rooms[i]);
      doctors.push(doctor);
    }
    return doctors;
  }

  /**
   * get a related rooms of a patient
   * @param patient_id O3 identifier of a patient
   * @returns 
   */
  async getRelatedRooms(patient_id: string): Promise<Array<Room>> {

    // on recupère le mot de passe Talk du patient 
    const password = await this.room_rep.getPasswordUser(patient_id);

    // on recupère la liste des conversations auquelles le patient est participant
    return await this.room_rep.getRelatedRooms(patient_id, password);
  }

  /**
   * get a doctor related to a room
   * @param room room
   * @returns 
   */
  async getRelatedDoctor(room: Room): Promise<Doctor> {

    let id = "";
    let names = "";
    id = room.name.split("#")[0];
    names = (await this.hospital_rep.getUser(id)).names;

    return {
      id: id,
      names: names,
      related_room: room
    };
  }

  /**
   * get patient details 
   * @param patient_id patient app identifier of a patient
   * @returns details of a patient
   */
  async getPatient(patient_id: string): Promise<Patient> {
    return await this.hospital_rep.getPatientDetail(patient_id);
  }

}

export default PatientService;
