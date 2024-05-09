const Progressbar = ({ progress }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%`, backgroundColor: "rgb(252, 126, 107)" }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default Progressbar;
