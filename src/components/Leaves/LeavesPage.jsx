// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import moment from "moment";
// import {
//   CalendarDaysIcon,
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";
// import {
//   fetchLeaves,
//   addLeave,
//   updateLeave,
//   deleteLeave,
// } from "../../store/slices/leaveSlice";
// import LeaveModal from "../Modals/LeaveModel";
// import { toast } from "react-toastify";

// const LeavesPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingLeave, setEditingLeave] = useState(null);
//   const { leaves } = useSelector((state) => state.leaves);
//   const { darkMode } = useSelector((state) => state.theme);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchLeaves());
//   }, [dispatch]);

//   const handleAddLeave = () => {
//     setEditingLeave(null);
//     setShowModal(true);
//   };

//   const handleEditLeave = (leave) => {
//     setEditingLeave(leave);
//     setShowModal(true);
//   };

//   const handleDeleteLeave = (id) => {
//     if (window.confirm("Are you sure you want to delete this leave request?")) {
//       dispatch(deleteLeave(id));
//       toast.success("Leave deleted successfully");
//     }
//   };

//   const handleSaveLeave = (leaveData) => {
//     if (editingLeave) {
//       dispatch(updateLeave({ ...leaveData, id: editingLeave._id }));
//       toast.success("Leave updated successfully!");
//     } else {
//       dispatch(addLeave(leaveData));
//       toast.success("Leave added successfully!");
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="flex justify-between items-center"
//       >
//         <div>
//           <h1
//             className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
//           >
//             🗓️ Leaves Management
//           </h1>
//           <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//             Manage employee leave requests
//           </p>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={handleAddLeave}
//           className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-lg font-medium flex items-center space-x-2"
//         >
//           <PlusIcon className="w-5 h-5" />
//           <span>Add Leave</span>
//         </motion.button>
//       </motion.div>

//       {/* Table */}
//       <div
//         className={`rounded-xl overflow-hidden shadow-md border ${
//           darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//         }`}
//       >
//         <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
//           <div className="flex items-center space-x-3">
//             <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
//               <CalendarDaysIcon className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h2
//                 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
//               >
//                 Leave Requests
//               </h2>
//               <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                 {leaves.length} total requests
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className={`${darkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
//               <tr>
//                 {[
//                   "Employee",
//                   "Reason",
//                   "From",
//                   "To",
//                   "Duration",
//                   "Status",
//                   "Actions",
//                 ].map((header) => (
//                   <th
//                     key={header}
//                     className={`py-3 px-5 text-sm font-semibold text-left ${
//                       darkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {leaves.map((leave, index) => {
//                 const start = moment(leave.startDate);
//                 const end = moment(leave.endDate);
//                 const duration = end.diff(start, "days") + 1;

//                 return (
//                   <motion.tr
//                     key={leave._id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className={`border-t ${
//                       darkMode
//                         ? "border-gray-700 hover:bg-gray-700/20"
//                         : "border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     <td className="py-3 px-5">{leave.employeeName}</td>
//                     <td className="py-3 px-5">{leave.reason}</td>
//                     <td className="py-3 px-5">{start.format("DD-MM-YYYY")}</td>
//                     <td className="py-3 px-5">{end.format("DD-MM-YYYY")}</td>
//                     <td className="py-3 px-5">{duration} days</td>
//                     <td className="py-3 px-5">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           leave.status === "approved"
//                             ? "bg-green-500 text-white"
//                             : leave.status === "pending"
//                               ? "bg-yellow-400 text-white"
//                               : "bg-red-500 text-white"
//                         }`}
//                       >
//                         {leave.status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-5">
//                       <div className="flex space-x-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => handleEditLeave(leave)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
//                         >
//                           <PencilIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => handleDeleteLeave(leave._id)}
//                           className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
//                         >
//                           <TrashIcon className="w-4 h-4" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <LeaveModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onSave={handleSaveLeave}
//           leave={editingLeave}
//         />
//       )}
//     </div>
//   );
// };

// export default LeavesPage;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import moment from "moment";
import {
  CalendarDaysIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  fetchLeaves,
  addLeave,
  updateLeave,
  deleteLeave,
} from "../../store/slices/leaveSlice";
import LeaveModal from "../Modals/LeaveModel";
import { toast } from "react-toastify";

const LeavesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const { leaves } = useSelector((state) => state.leaves);
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const handleAddLeave = () => {
    setEditingLeave(null);
    setShowModal(true);
  };

  const handleEditLeave = (leave) => {
    if (user.role === "admin" || user.role === "manager") {
      setEditingLeave(leave);
      setShowModal(true);
    } else {
      toast.warning("You are not authorized to edit leave status.");
    }
  };

  const handleDeleteLeave = (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      dispatch(deleteLeave(id));
      toast.success("Leave deleted successfully");
    }
  };

  const handleSaveLeave = (leaveData) => {
    if (editingLeave) {
      dispatch(updateLeave({ ...leaveData, id: editingLeave._id }));
      toast.success("Leave updated successfully!");
    } else {
      dispatch(addLeave(leaveData));
      toast.success("Leave added successfully!");
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-12 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
      >
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            🗓️ Leaves Management
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Manage employee leave requests
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddLeave}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-lg font-medium flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Leave</span>
        </motion.button>
      </motion.div>

      {/* Table */}
      <div
        className={`rounded-xl overflow-x-auto shadow-md border w-full max-w-full text-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <CalendarDaysIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2
                className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Leave Requests
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {leaves.length} total requests
              </p>
            </div>
          </div>
        </div>

        <table className="min-w-full">
          <thead className={`${darkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
            <tr>
              {["Employee", "Reason", "From", "To", "Duration", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className={`py-3 px-5 text-sm font-semibold text-left ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => {
              const start = moment(leave.startDate);
              const end = moment(leave.endDate);
              const duration = end.diff(start, "days") + 1;

              return (
                <motion.tr
                  key={leave._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-5">{leave.employeeName}</td>
                  <td className="py-3 px-5">{leave.reason}</td>
                  <td className="py-3 px-5">{start.format("DD-MM-YYYY")}</td>
                  <td className="py-3 px-5">{end.format("DD-MM-YYYY")}</td>
                  <td className="py-3 px-5">{duration} days</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        leave.status === "approved"
                          ? "bg-green-500 text-white"
                          : leave.status === "pending"
                          ? "bg-yellow-400 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex space-x-2">
                      {(user.role === "admin" || user.role === "manager") && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleEditLeave(leave)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleDeleteLeave(leave._id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <LeaveModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveLeave}
          leave={editingLeave}
          userRole={user.role}
        />
      )}
    </div>
  );
};

export default LeavesPage;
