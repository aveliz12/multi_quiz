import Link from "next/link";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import styleModal from "../styles/modal.module.scss";
function App({ header, children, footer }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Link href="" className={styleModal.btnAdd} onClick={openModal}>
        <FaIcons.FaPlus style={{ marginRight: "8px", marginLeft: "8px" }} />
        CREAR PREGUNTAS
      </Link>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{header}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <Link href="" className={styleModal.btnAdd} onClick={openModal}>
                  <FaIcons.FaSave
                    style={{ marginRight: "8px", marginLeft: "8px" }}
                  />
                  {footer}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default App;
