import React from "react";

interface MeetIframeProps {
  url: string;
}
export const MeetIframe: React.FC<MeetIframeProps> = ({ url }) => {
  return (
    <div className="">
      <iframe
        title="Web Meeting"
        src={url}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
