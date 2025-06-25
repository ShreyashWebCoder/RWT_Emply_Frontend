// import React from "react";

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   XMarkIcon,
//   UserPlusIcon,
//   PencilIcon,
// } from "@heroicons/react/24/outline";

// import axios from "axios";
// import { isCookie } from "react-router-dom";
// const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
//   const { darkMode } = useSelector((state) => state.theme);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//     phone: "",
//     // department: "",
//     // birthday: "",
//     // status: "active",
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData(employee);
//     } else {
//       setFormData({
//         name: "",
//         email: "",
//         role: "employee",
//         phone: "",
//         password: "",
//         // department: "",
//         // birthday: "",
//         // status: "active",
//       });
//     }
//   }, [employee]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//  const token = localStorage.getItem("token") || isCookie("token");
//  console.log("Token:", token);
  
//     const url = employee
//       ? `https://rwt-emp-backend.onrender.com/admin/users/${employee._id}`
//       : "https://rwt-emp-backend.onrender.com/admin/users";
//     const method = employee ? "put" : "post";
  
//     try {
//       const response = await axios({
//         method,
//         url,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           ...formData,
//           avatar: "/placeholder.svg?height=40&width=40",
//         },
//       });
  
//       console.log("Form submitted successfully:", response.data);
//       onSave(response.data);
//       onClose();
//     } catch (error) {
//       console.error("Error saving employee:", error.response?.data || error.message);
//     }
//   };
  

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className=" fixed inset-0 bg-black/60 backdrop-blur-sm  disply-scrollbar"
//             onClick={onClose}
//           />

//           <motion.div
//             initial={{ scale: 0.8, opacity: 0, y: 50 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.8, opacity: 0, y: 50 }}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//             className={`relative ${
//               darkMode
//                 ? "bg-gradient-to-br from-gray-900/95 to-slate-900/95 border-gray-700/50"
//                 : "bg-gradient-to-br from-white/95 to-emerald-50/95 border-emerald-200/50"
//             } rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border backdrop-blur-xl overflow-hidden`}
//           >
//             {/* Background decoration */}
//             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
//             <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl"></div>

//             <div className="relative z-10">
//               <div className="flex justify-between items-center mb-6 sm:mb-8">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
//                     {employee ? (
//                       <PencilIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                     ) : (
//                       <UserPlusIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                     )}
//                   </div>
//                   <div>
//                     <h2
//                       className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
//                         darkMode ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {employee ? "✏️ Edit Employee" : "➕ Add Employee"}
//                     </h2>
//                     <p
//                       className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                     >
//                       {employee
//                         ? "Update employee information"
//                         : "Add new team member"}
//                     </p>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={onClose}
//                   className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
//                 >
//                   <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
//                 </motion.button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div className="sm:col-span-2">
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       👤 Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
//                           : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       placeholder="Enter full name"
//                       required
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       📧 Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
//                           : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       placeholder="Enter email address"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       🏷️ Role
//                     </label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white"
//                           : "bg-white/80 border-gray-300/50 text-gray-900"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                     >
//                       <option value="employee">👨‍💼 Employee</option>
//                       <option value="hr">👥 HR Manager</option>
//                       <option value="admin">⚡ Administrator</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       🏢 Department
//                     </label>
//                     <input
//                       type="text"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
//                           : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       placeholder="Enter department"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       🏢 Phone
//                     </label>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
//                           : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       placeholder="Enter phone number"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       🏢 Password
//                     </label>
//                     <input
//                       type="text"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
//                           : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       placeholder="Enter password"
//                       required
//                     />
//                   </div>
            
             
//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       🎂 Birthday
//                     </label>
//                     <input
//                       type="date"
//                       name="birthday"
//                       value={formData.birthday}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white"
//                           : "bg-white/80 border-gray-300/50 text-gray-900"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={`block text-sm sm:text-base font-semibold mb-3 ${
//                         darkMode ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       📊 Status
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                       className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
//                         darkMode
//                           ? "bg-gray-800/50 border-gray-600/50 text-white"
//                           : "bg-white/80 border-gray-300/50 text-gray-900"
//                       } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
//                     >
//                       <option value="active">✅ Active</option>
//                       <option value="inactive">❌ Inactive</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
//                   <motion.button
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2"
//                   >
//                     <span>
//                       {employee ? "💾 Update Employee" : "➕ Add Employee"}
//                     </span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     onClick={onClose}
//                     className={`flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${
//                       darkMode
//                         ? "bg-gray-700 text-white hover:bg-gray-600"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                   >
//                     ❌ Cancel
//                   </motion.button>
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default EmployeeModal;


import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  UserPlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const { darkMode } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    department: "",
    birthday: "",
    status: "active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        phone: employee.phone,
        department: employee.department || "",
        birthday: employee.birthday || "",
        status: employee.status || "active",
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "employee",
        phone: "",
        department: "",
        birthday: "",
        status: "active",
        password: "",
      });
    }
    setError("");
  }, [employee, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.department) {
      setError("All fields are required");
      return;
    }
    
    if (!employee && !formData.password) {
      setError("Password is required");
      return;
    }

    const token = localStorage.getItem("token") || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    const url = employee
      ? `https://rwt-emp-backend.onrender.com/admin/users/${employee._id}`
      : "https://rwt-emp-backend.onrender.com/admin/users";
    const method = employee ? "put" : "post";
  
    try {
      const dataToSend = {
        ...formData,
        ...(!employee && { password: formData.password }),
        avatar: "/placeholder.svg?height=40&width=40",
      };

      // For updates, remove password if empty
      if (employee && !formData.password) {
        delete dataToSend.password;
      }

      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dataToSend,
      });
  
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving employee:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to save employee");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative ${
              darkMode
                ? "bg-gradient-to-br from-gray-900/95 to-slate-900/95 border-gray-700/50"
                : "bg-gradient-to-br from-white/95 to-emerald-50/95 border-emerald-200/50"
            } rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border backdrop-blur-xl overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                    {employee ? (
                      <PencilIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    ) : (
                      <UserPlusIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {employee ? "✏️ Edit Employee" : "➕ Add Employee"}
                    </h2>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {employee
                        ? "Update employee information"
                        : "Add new team member"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
                </motion.button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      📧 Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      🏷️ Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white"
                          : "bg-white/80 border-gray-300/50 text-gray-900"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                      required
                    >
                      <option value="employee">👨‍💼 Employee</option>
                      <option value="manager">👥 HR Manager</option>
                      <option value="admin">⚡ Administrator</option>
                    </select>
                  </div>

                  <div> 
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      🏢 Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                      placeholder="Enter department"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      📱 Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      🎂 Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white"
                          : "bg-white/80 border-gray-300/50 text-gray-900"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm sm:text-base font-semibold mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      📊 Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600/50 text-white"
                          : "bg-white/80 border-gray-300/50 text-gray-900"
                      } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                    >
                      <option value="active">✅ Active</option>
                      <option value="inactive">❌ Inactive</option>
                      <option value="on_leave">🌴 On Leave</option>
                    </select>
                  </div>

                  {!employee && (
                    <div className="sm:col-span-2">
                      <label
                        className={`block text-sm sm:text-base font-semibold mb-3 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        🔑 Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                            : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`}
                        placeholder="Enter password"
                        required={!employee}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>
                      {employee ? "💾 Update Employee" : "➕ Add Employee"}
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className={`flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    ❌ Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeModal;