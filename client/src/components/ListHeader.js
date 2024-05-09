import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="bg-dark text-light p-3 d-flex flex-wrap justify-content-between align-items-center">
      <div className="d-flex justify-content-start align-items-center">
        <h1 className="mb-3 ">{listName}</h1>
        {showModal && (
          <Modal
            mode={"create"}
            setShowModal={setShowModal}
            getData={getData}
          />
        )}
      </div>
      <div className="button-container  mb-3">
        <button
          className="btn btn-outline-light me-2"
          onClick={() => setShowModal(true)}
        >
          ADD NEW
        </button>
        <button className="btn btn-outline-danger" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
