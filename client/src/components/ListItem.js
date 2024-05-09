import React from "react";
import TickIcon from "./TickIcon";
import { useState } from "react";
import Modal from "./Modal";

const Listitem = ({ task, getData }) => {
  const [showModal, setShowmodal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {}
  };

  return (
    <li className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom">
      <div className="title d-flex justify-content-start align-items-center ms-4  mb-4 mt-4 ">
        <TickIcon />
        <p className="m-0 ms-2">{task.title}</p>
      </div>
      <div className="progress-container">
        <div className="progress mb-2 ms-4 me-4">
          <div
            className="progress-bar progress-bar-striped bg-dark progress-bar-animated"
            role="progressbar"
            style={{ width: `${task.progress}%` }}
            aria-valuenow={task.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <div className="button-container d-flex justify-content-end me-4 mb-3 mt-3">
        <button
          className="btn btn-dark me-2"
          onClick={() => setShowmodal(true)}
        >
          EDIT
        </button>
        <button className="btn btn-danger" onClick={() => deleteItem()}>
          DELETE
        </button>
      </div>

      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowmodal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default Listitem;
