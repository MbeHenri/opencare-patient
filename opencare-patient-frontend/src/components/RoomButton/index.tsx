import Doctor from "../../models/Doctor";
import JoinRoomButton from "./JoinRoomButton";

interface Props {
  doctor: Doctor;
  callback: Function;
}

const RoomButton: React.FC<Props> = ({
  doctor,
  callback = (url: string) => {
    window.open(url);
  },
}) => {
  return (
    <JoinRoomButton room={doctor.related_room} callback={callback}/>
  );
};

export default RoomButton;
