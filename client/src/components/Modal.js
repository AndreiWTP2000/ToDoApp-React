import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {}
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div
      className="modal fade show text-black"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Let's {mode} your task</h3>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Your task goes here
                </label>
                <input
                  required
                  maxLength={30}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="range" className="form-label">
                  Drag to select your progress
                </label>
                <input
                  required
                  type="range"
                  className="form-range custom-progress"
                  id="range"
                  min="0"
                  max="100"
                  name="progress"
                  value={data.progress}
                  onChange={handleChange}
                />
              </div>
              <button
                className={`btn ${
                  mode === "edit" ? "btn-secondary" : "btn-dark"
                } w-100`}
                type="submit"
                onClick={editMode ? editData : postData}
              >
                {mode === "edit" ? "Edit" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
