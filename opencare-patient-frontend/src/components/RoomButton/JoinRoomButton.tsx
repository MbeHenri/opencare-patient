import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import Room from "../../models/Room";
import PatientService from "../../services/patient";

interface Props {
  room: Room;
  callback: Function;
}

const JoinRoomButton: React.FC<Props> = ({
  room,
  callback = (url: string) => {
    window.open(url);
  },
}) => {
  const [loading, setLoading] = useState(false);

  const service = useMemo(() => PatientService.getInstance(), []);

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      await service
        .getRoomURL(room)
        .then((url) => callback(url))
        .then(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [callback, room, service]);

  return (
    <>
      {loading ? (
        <p className="btn btn-sm btn-primary">Joining ...</p>
      ) : (
        <button className="btn btn-sm btn-primary" onClick={handleClick}>
          Joining Room
        </button>
      )}
    </>
  );
};

export default JoinRoomButton;
