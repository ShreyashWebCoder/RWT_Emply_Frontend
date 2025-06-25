import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: [],
  unreadCount: 0,
}

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        read: false,
      }
      state.messages.push(newMessage)
      if (action.payload.receiverId !== action.payload.senderId) {
        state.unreadCount += 1
      }
    },
    markAsRead: (state, action) => {
      const message = state.messages.find((m) => m.id === action.payload)
      if (message && !message.read) {
        message.read = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
})

export const { sendMessage, markAsRead, setMessages } = messageSlice.actions
export default messageSlice.reducer
