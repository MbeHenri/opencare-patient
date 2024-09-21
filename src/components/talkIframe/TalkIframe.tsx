import React, { useEffect, useState } from "react";

interface MeetIframeProps {
  url: string;
}

const TalkIframe: React.FC<MeetIframeProps> = ({ url }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch("http://localhost:8013/talk");
        console.log(response);
        if (response.ok) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };
    authenticate();
  }, []);
  return (
    <div>
      {authenticated ? <iframe src={url}></iframe> : <div>Loading...</div>}
    </div>
  );
};

export default TalkIframe;
