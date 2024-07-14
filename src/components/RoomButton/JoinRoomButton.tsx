import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import DoctorService from "../../service/doctor";
import Room from "../../models/Room";

interface Props {
  callback: Function;
}

const JoinRoomButton: React.FC<Props> = ({
  callback = (url: string) => {
    window.open(url);
  },
}) => {
  const [loading, setLoading] = useState(false);

  const service = useMemo(() => DoctorService.getInstance(), []);

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      //await service.getRelatedRoom()
      //await service.then((url) => callback(url)).then(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [callback, service]);

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
