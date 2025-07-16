import React from "react";
import Modal from "react-modal";

const SearchModal = ({ visitFoundModal, setVisitFoundModal, selectedVisit }) => {
  return (
    <Modal
      isOpen={visitFoundModal}
      onRequestClose={() => setVisitFoundModal(false)}
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
          maxWidth: "600px", // larger
          width: "90%",
          padding: "2rem",
        },
      }}
    >
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold text-[#2E2E2E]">Visit Details</h2>

        <div className="bg-[#FFF4ED] p-6 rounded-2xl shadow border border-gray-200 text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-gray-600 text-sm">Visitor Name</p>
            <p className="font-semibold text-lg">{selectedVisit?.personName}</p>
          </div>
          <div>
            <p className="mb-1 text-gray-600 text-sm">Host</p>
            <p className="font-semibold text-lg">
              {selectedVisit?.hostName} ({selectedVisit?.department})
            </p>
          </div>
          <div>
            <p className="mb-1 text-gray-600 text-sm">Date</p>
            <p className="font-semibold text-lg">{selectedVisit?.date || "N/A"}</p>
          </div>
          <div>
            <p className="mb-1 text-gray-600 text-sm">Time</p>
            <p className="font-semibold text-lg">{selectedVisit?.time || "N/A"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="mb-1 text-gray-600 text-sm">Purpose</p>
            <p className="font-semibold text-lg">{selectedVisit?.purpose}</p>
          </div>
          <div>
            <p className="mb-1 text-gray-600 text-sm">Code</p>
            <p className="font-semibold text-lg">{selectedVisit?.code}</p>
          </div>
          <div>
            <p className="mb-1 text-gray-600 text-sm">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                selectedVisit?.status === "Checked In"
                  ? "bg-green-100 text-green-700"
                  : selectedVisit?.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {selectedVisit?.status || "Pending"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setVisitFoundModal(false)}
          className="mt-2 bg-[#F97316] hover:bg-[#3A3D46] text-white font-semibold px-8 py-3 rounded-xl cursor-pointer transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SearchModal;
