import React from "react";
import Modal from "react-modal";

const DeleteModal = ({confirmDelete, confirmDeleteModal, visitToDelete, cancelDelete}) => {
  return (
    <Modal
      isOpen={confirmDeleteModal}
      onRequestClose={cancelDelete}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        },
        content: {
          position: "static",
          inset: "unset",
          border: "none",
          background: "white",
          borderRadius: "1.5rem",
          maxWidth: "480px",
          width: "90%",
          padding: "2rem",
        },
      }}
    >
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-2xl font-bold text-[#2E2E2E]">Confirm Delete</h2>
        <p>
          Are you sure you want to delete the visit for{" "}
          <strong>{visitToDelete?.personName}</strong>?
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={cancelDelete}
            className="px-5 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl text-[#2E2E2E] font-semibold cursor-pointer transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-5 py-3 bg-[#F97316] hover:bg-[#3A3D46] text-white rounded-xl font-semibold cursor-pointer transition-colors duration-300"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
