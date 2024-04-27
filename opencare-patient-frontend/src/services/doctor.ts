import Room from "../models/Room";
import { getRoomRepository } from "../repositories/Room";
import RoomRepository from "../repositories/Room/repository";
import { TALK_HOST, TALK_PASSWORD, TALK_PORT, TALK_USER } from "../repositories/env";

class DoctorService {
    static instance: DoctorService | null = null;

    room_rep: RoomRepository;

    constructor() {
        this.room_rep = getRoomRepository();
    }

    /**
     * 
     * @returns patient service
     */
    static getInstance(): DoctorService {
        if (DoctorService.instance) {
            return DoctorService.instance;
        } else {
            DoctorService.instance = new DoctorService();
            return DoctorService.instance;
        }

    }
    /**
     * create a room for the digital consultation for a patient
     * @param doctor_id doctor id
     * @param patient_id patient id
     * @returns 
     */
    async createRoom(doctor_id: string, patient_id: string): Promise<Room> {
        return await this.room_rep.createRoom(`${doctor_id}#${patient_id}`);
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
     * get a room related to a patient and a doctor
     * @param doctor_id 
     * @param patient_id 
     * @returns 
     */
    async getRelatedRoom(doctor_id: string, patient_id: string): Promise<Room | null> {
        const rooms = await this.room_rep.getRelatedRooms(`${TALK_USER}`, `${TALK_PASSWORD}`);
        const room = rooms.find((element) => {
            return element.name === `${doctor_id}#${patient_id}`
        })
        return room ? room : null;
    }

}

export default DoctorService;
