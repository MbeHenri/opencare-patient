import Room from "../../models/Room";

class RoomRepository {

    async createRoom(name: string ="ocare"): Promise<Room> {

        return new Promise<Room>((resolve) => {
            setTimeout(() => {
                resolve({
                    token: "sdfsdf",
                    name: "id1#id2"
                });
            }, 1000);
        });
    }

    async createUser(user_id: string, name: string, password: string): Promise<void> {

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    async addUserInRoom(token_room: string, user_id: string): Promise<void> {

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    async getRelatedRooms(user_id: string, password: string, filter_name = "ocare"): Promise<Array<Room>> {

        return new Promise<Array<Room>>((resolve) => {
            setTimeout(() => {
                resolve([]);
            }, 1000);
        });
    }

    async setRoomLinkable(token_room: string): Promise<void> {

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    async setPasswordLinkedRoom(token_room: string, password: string): Promise<void> {

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}

export default RoomRepository;