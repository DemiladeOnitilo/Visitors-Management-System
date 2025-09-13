import React from "react";
import Modal from "react-modal";
import { FiX as IconX, FiAlertTriangle as IconAlert, FiTrash2 as IconTrash, FiUser as IconUser } from "react-icons/fi";

const DeleteModal = ({ confirmDelete, confirmDeleteModal, visitToDelete, cancelDelete }) => {
  return (
    <Modal
      isOpen={confirmDeleteModal}
      onRequestClose={cancelDelete}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 99999, 
        },
        content: {
          position: "static",
          inset: "unset",
          margin: "auto",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          maxWidth: "min(460px, 92vw)",
          maxHeight: "min(92vh, 100vh)",
          width: "100%",
          padding: "0",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2)",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col max-h-[92vh] h-full">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 relative flex-shrink-0 text-center">
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-2">
              <IconAlert className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Revoke Record Log</h2>
            <p className="text-white/90 text-xs font-medium mt-0.5">Warning: Deletion is absolute and permanent</p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow font-semibold">
          <div className="text-slate-600 text-sm leading-relaxed text-center py-2">
            Are you completely certain you want to permanently clean out the active appointment token logged for:
            <p className="font-bold text-base text-gray-800 mt-2 bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 truncate max-w-xs mx-auto">
              {visitToDelete?.personName}
            </p>
          </div>

          {visitToDelete && (
            <div className="bg-slate-50/50 rounded-xl p-4 border border-gray-200/60 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Host Assigned:</span>
                <span className="font-bold text-gray-800 truncate max-w-[200px]">{visitToDelete.hostName}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200/40">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Registration Code:</span>
                <span className="font-mono font-bold text-orange-600 bg-white px-2 py-0.5 border border-orange-100 rounded">{visitToDelete.code}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 text-sm mt-4 mt-auto">
            <button
              onClick={cancelDelete}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Discard Action
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer"
            >
              Confirm Purge
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;