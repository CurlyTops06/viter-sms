import React from "react";
import { handleEscape } from "../../functions/functions-general";

// const ModalWrapperSide = ({
//   children,
//   handleClose,
//   className = "",
//   topPosition = "top-10",
//   title = "",
// }) => {
//   const ref = React.useRef();
//   handleEscape(() => handleClose());
//   return (
//     <>
//       <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center z-52">
//         {/* Overlay BG Black */}
//         <div
//           className="backdrop w-screen h-screen relative z-9"
//           onClick={handleClose}
//           ref={ref}
//         ></div>
//         {/* Modal Content with white bg */}
//         <div className={`fixed z-10 ${topPosition}`}>
//           <div
//             className={`bg-white border border-gray-200 shadow-xl transition-all ease-in-out transform duration-200 ${className}`}
//           >
//             {children}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const ModalWrapperSide = ({
  children,
  handleClose,
  className = "",
  width = "w-[420px]",
}) => {
  const ref = React.useRef();

  handleEscape(() => handleClose());

  return (
    <div className="fixed inset-0 z-52 flex">
      {/* Overlay */}
      <div
        className="flex-1 h-full bg-black/40"
        onClick={handleClose}
        ref={ref}
      />

      {/* Sidebar Panel — anchored to the right */}
      <div
        className={`
          fixed top-0 right-0 h-full ${width}
          bg-white border-l border-gray-200 shadow-2xl
          transition-transform ease-in-out duration-200
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapperSide;
