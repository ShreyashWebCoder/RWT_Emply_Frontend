import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LeaveModal = ({ isOpen, onClose, onSave, leave }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "pending",
  });

  useEffect(() => {
    if (leave) {
      setFormData({ ...leave });
    } else {
      setFormData({
        employeeName: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        status: "pending",
      });
    }
  }, [leave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.employeeName ||
      !formData.leaveType ||
      !formData.reason ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.status
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl p-6 relative shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {leave ? "Edit Leave" : "Add Leave"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={formData.employeeName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />

          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Earned">Earned</option>
            <option value="Other">Other</option>
          </select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <textarea
            name="reason"
            placeholder="Reason for leave"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-md transition"
            >
              {leave ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LeaveModal;
