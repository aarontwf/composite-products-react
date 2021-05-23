import React from "react";

const Dialog: React.FC = (props) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:pb-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-white rounded-lg text-center sm:text-left overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Dialog;
