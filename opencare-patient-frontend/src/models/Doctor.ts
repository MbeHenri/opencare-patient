import Room from "./Room";

interface Doctor {
    id: string,
    names: string,
    related_room: Room
}

export default Doctor;