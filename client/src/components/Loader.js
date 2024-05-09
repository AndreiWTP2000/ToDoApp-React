import React from "react";
import { useState } from "react";

const Loading = () => {
  const [infotext1, setInfoText1] = useState("");
  const [infotext2, setInfoText2] = useState("");
  const [infoContainer, setInfoContainer] = useState(false);
  setTimeout(() => {
    setInfoContainer(true);
    setInfoText1(
      "If this is the first time opening the app, it might take some time to load as I use a free server that spins down with inactivity. Please give it a minute, and the app should load as expected."
    );
  }, 5000);

  setTimeout(() => {
    setInfoText2(
      "If you have been waiting for a while and the app is still not responsive, just reload the page."
    );
  }, 30000);
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="spinner-border text-" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      {infoContainer && (
        <div className="info">
          <p className="text-light">
            <strong>{infotext1}</strong>
          </p>
          <p className="text-light">
            <strong>{infotext2}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Loading;
