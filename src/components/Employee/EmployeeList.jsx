import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
} from "../../store/slices/employeeSlice";
import EmployeeModal from "../Modals/EmployeeModal";
import { toast } from "react-toastify";
import axios from "axios";

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { employees } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const canManageEmployees = user?.role === "admin" || user?.role === "manager";

  const token = localStorage.getItem("token") || isCookie("token");
  console.log("Token:", token);

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "https://rwt-emp-backend.onrender.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // setIsLoading(true);
        const response = await api.get("/admin/users");
        console.log("Fetched Employees:", response.data);

        if (response.status === 200) {
          dispatch(setEmployees(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          // You might want to dispatch a logout action here
        } else {
          toast.error("Failed to fetch employees. Please try again later.");
        }
      } finally {
        // setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  const filteredEmployees = (employees || []).filter(
    (employee) =>
      (employee?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (employee?.department || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Employees:", employees);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const response = dispatch(deleteEmployee(employeeId));
      toast.success("Employee deleted successfully!");
    }
  };

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      dispatch(updateEmployee({ ...employeeData, id: editingEmployee.id }));
      toast.success("Employee updated successfully!");
    } else {
      dispatch(addEmployee({ ...employeeData, id: Date.now() }));
      toast.success("Employee added successfully!");
    }
    setShowModal(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Manager":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ";
      default:
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
    }
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      : "bg-gradient-to-r from-red-500 to-pink-500 text-white";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
      >
        <div className="space-y-1">
          <h1
            className={`text-3xl font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            👥 Employee Management
          </h1>
          <p
            className={`text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Manage your team members and their information
          </p>
        </div>
        {canManageEmployees && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddEmployee}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 shadow-md hover:shadow-emerald-500/30 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Employee</span>
          </motion.button>
        )}
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          />
        </div>
        <input
          type="text"
          placeholder="Search employees by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border text-base ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
        />
      </motion.div>

      {/* Employee Cards - Mobile View */}
      <div className="block lg:hidden space-y-4">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`rounded-xl p-5 shadow-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start space-x-4">
              <img
                src={employee.profilePic || "/placeholder.svg"}
                alt={employee.name}
                className="w-14 h-14 rounded-xl border-2 border-white/20 shadow"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} truncate`}
                >
                  {employee.name}
                </h3>
                <p
                  className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} truncate`}
                >
                  {employee.email}
                </p>
                <p
                  className={`text-sm font-medium  ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {employee.department}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getRoleColor(employee.role)}`}
                  >
                    {employee.role}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(employee.status)}`}
                  >
                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
            {canManageEmployees && (
              <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/30">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleEditEmployee(employee)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200"
                >
                  Delete
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Employee Table - Desktop View */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`hidden lg:block rounded-xl shadow-md border overflow-hidden ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-5 border-b border-gray-200/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2
                className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Employee Directory
              </h2>
              <p
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {filteredEmployees.length} employees found
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
              <tr>
                <th
                  className={`py-3 px-5 font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  } text-left`}
                >
                  Employee
                </th>
                <th
                  className={`py-3 px-5 font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  } text-left`}
                >
                  Contact
                </th>
                <th
                  className={`py-3 px-5 font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  } text-left`}
                >
                  Role
                </th>
                <th
                  className={`py-3 px-5 font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  } text-left`}
                >
                  Department
                </th>
                <th
                  className={`py-3 px-5 font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  } text-left`}
                >
                  Status
                </th>
                {canManageEmployees && (
                  <th
                    className={`py-3 px-5 font-semibold text-sm ${
                      darkMode ? "text-white" : "text-gray-900"
                    } text-left`}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700/20"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition-colors duration-150`}
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={employee.profilePic || "/placeholder.svg"}
                        alt={employee.name}
                        className="w-10 h-10 rounded-lg border border-white/20"
                      />
                      <div>
                        <span
                          className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {employee.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`py-3 px-5 text-sm font-medium  ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {employee.email}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase ${getRoleColor(employee.role)}`}
                    >
                      {employee.role}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-5 text-sm font-medium  ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {employee.department}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase ${getStatusColor(employee.status)}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  {canManageEmployees && (
                    <td className="py-3 px-5">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditEmployee(employee)}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {showModal && (
        <EmployeeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEmployee}
          employee={editingEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
