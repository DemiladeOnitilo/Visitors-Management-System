import React from "react";
import Modal from "react-modal";
import { FiTrash2, FiAlertTriangle, FiX, FiUser } from "react-icons/fi";

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
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 99999,
        },
        content: {
          position: "static",
          inset: "unset",
          border: "none",
          background: "transparent",
          borderRadius: "2rem",
          maxWidth: "500px",
          width: "90%",
          padding: "0",
          overflow: "visible",
        },
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 relative">
          <button
            onClick={cancelDelete}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300"
          >
            <FiX size={18} />
          </button>
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <FiAlertTriangle size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Confirm Delete</h2>
              <p className="text-white/90">This action cannot be undone</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-2 rounded-xl flex-shrink-0">
                <FiTrash2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-red-800 text-lg mb-2">Delete Visit</h3>
                <p className="text-red-700 leading-relaxed">
                  Are you sure you want to permanently delete the visit for{" "}
                  <span className="font-bold bg-white/60 px-2 py-1 rounded-lg">
                    {visitToDelete?.personName}
                  </span>
                  ?
                </p>
              </div>
            </div>
          </div>

          {visitToDelete && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-gray-600 to-gray-700 text-white p-2 rounded-xl">
                  <FiUser size={18} />
                </div>
                <h4 className="font-bold text-gray-800">Visit Details</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Visitor:</span>
                  <span className="font-semibold text-gray-800">{visitToDelete.personName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Host:</span>
                  <span className="font-semibold text-gray-800">{visitToDelete.hostName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Code:</span>
                  <span className="font-semibold text-orange-600">{visitToDelete.code}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={cancelDelete}
              className="relative flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 text-lg">Cancel</span>
            </button>
            <button
              onClick={confirmDelete}
              className="relative flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                <FiTrash2 size={18} />
                Yes, Delete
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50/80 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-3">
              <FiAlertTriangle
                size={16}
                className="text-orange-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-1">
                  Permanent Action
                </h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                  This action will permanently remove the visit record from the system. 
                  The visitor will need to register again if they wish to visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;