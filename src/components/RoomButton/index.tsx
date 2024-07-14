import React from "react";
import Doctor from "../../models/Doctor";
import JoinRoomButton from "./JoinRoomButton";

interface Props {
  callback: Function;
}

const RoomButton: React.FC<Props> = ({
  callback = (url: string) => {
    window.open(url);
  },
}) => {
  return <JoinRoomButton callback={callback} />;
};

export default RoomButton;
