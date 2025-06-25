import React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { sendMessage } from "../../store/slices/messageSlice"
import { toast } from "react-toastify"

const MessageCenter = () => {
  const [newMessage, setNewMessage] = useState("")
  const [selectedReceiver, setSelectedReceiver] = useState("")
  const { user } = useSelector((state) => state.auth)
  const { employees } = useSelector((state) => state.employees)
  const { messages } = useSelector((state) => state.messages)
  const { darkMode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedReceiver) return

    const receiver = employees.find((emp) => emp.id === Number.parseInt(selectedReceiver))

    dispatch(
      sendMessage({
        senderId: user.id,
        senderName: user.name,
        receiverId: receiver.id,
        receiverName: receiver.name,
        content: newMessage,
      }),
    )

    setNewMessage("")
    toast.success("📨 Message sent successfully!")
  }

  const availableReceivers = employees.filter(
    (emp) => emp.id !== user.id && (user.role === "employee" ? emp.role === "manager" || emp.role === "admin" : true),
  )
console.log(availableReceivers);

  const userMessages = messages
    .filter((msg) => msg.senderId === user.id || msg.receiverId === user.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  const getMessageBubbleStyle = (message) => {
    const isSent = message.senderId === user.id
    return isSent
      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto"
      : darkMode
        ? "bg-gray-800 text-white mr-auto"
        : "bg-gray-100 text-gray-900 mr-auto"
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
          💬 Message Center
        </h1>
        <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Communicate with your team members
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {/* Send Message */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border ${
            darkMode
              ? "bg-gradient-to-br from-gray-900/50 to-slate-900/50 border-gray-700/50"
              : "bg-gradient-to-br from-white/70 to-blue-50/70 border-blue-200/50"
          } backdrop-blur-xl relative overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <PaperAirplaneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Send Message
                </h2>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Compose a new message</p>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  className={`block text-sm sm:text-base font-semibold mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  👤 To:
                </label>
                <select
                  value={selectedReceiver}
                  onChange={(e) => setSelectedReceiver(e.target.value)}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-600/50 text-white"
                      : "bg-white/80 border-gray-300/50 text-gray-900"
                  } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300`}
                  required
                >
                  <option value="">Select recipient...</option>
                  {availableReceivers.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role.toUpperCase()}) - {emp.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm sm:text-base font-semibold mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  ✉️ Message:
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={5}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                      : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500"
                  } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all duration-300`}
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border ${
            darkMode
              ? "bg-gradient-to-br from-gray-900/50 to-slate-900/50 border-gray-700/50"
              : "bg-gradient-to-br from-white/70 to-green-50/70 border-green-200/50"
          } backdrop-blur-xl relative overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl shadow-lg">
                <ChatBubbleLeftRightIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Recent Messages
                </h2>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {userMessages.length} conversations
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userMessages.length > 0 ? (
                userMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`max-w-[85%] ${getMessageBubbleStyle(message)} p-4 sm:p-5 rounded-2xl shadow-lg`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className="w-4 h-4 opacity-70" />
                        <span className="font-semibold text-sm">
                          {message.senderId === user.id ? "You" : message.senderName}
                        </span>
                      </div>
                      <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                    {message.senderId !== user.id && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <span className="text-xs opacity-70">To: {message.receiverName}</span>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold mb-2">No messages yet</p>
                  <p className="text-sm">Start a conversation with your team</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MessageCenter
