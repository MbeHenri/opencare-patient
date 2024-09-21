import React from "react";
import TalkIframe from "../../components/talkIframe/TalkIframe";

function Talk() {
  return (
    <div>
      <h2>TAL</h2>
      <TalkIframe url="http://192.168.0.10:8010/apps/spreed/" />
    </div>
  );
}

export default Talk;
