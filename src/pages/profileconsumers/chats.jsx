"use client"

import { useState } from "react"
import { Paperclip, Smile, Send, Download, ArrowLeft } from "lucide-react"

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState("doris")
  const [newMessage, setNewMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Mock data for users and conversations
  const users = [
    { id: "patrick", name: "Patrick", avatar: "/patrick.jpg" },
    { id: "doris", name: "Doris", avatar: "/doris.jpg" },
    { id: "emily", name: "Emily", avatar: "/portrait-emily.png" },
    { id: "steve", name: "Steve", avatar: "/steve.jpg" },
  ]

  const conversations = [
    {
      id: "patrick",
      name: "Patrick Hendricks",
      lastMessage: "hey! there I'm available",
      time: "02:50 PM",
      avatar: "/patrick.jpg",
    },
    {
      id: "mark",
      name: "Mark Messer",
      lastMessage: "📷 Images",
      time: "10:30 AM",
      avatar: "/mark-text.png",
      unread: 2,
    },
    {
      id: "general",
      name: "General",
      lastMessage: "This theme is Awesome!",
      time: "2:06 min",
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "doris",
      name: "Doris Brown",
      lastMessage: "typing...",
      time: "10:05 PM",
      avatar: "/doris.jpg",
      typing: true,
    },
    {
      id: "designer",
      name: "Designer",
      lastMessage: "Next meeting tomorrow 10.00AM",
      time: "2:10 min",
      avatar: "/diverse-designers-brainstorming.png",
      unread: 1,
    },
    {
      id: "steve",
      name: "Steve Walker",
      lastMessage: "Admin-A.zip",
      time: "01:16 PM",
      avatar: "/steve.jpg",
    },
    {
      id: "albert",
      name: "Albert Rodarte",
      lastMessage: "typing...",
      time: "01:05 PM",
      avatar: "/albert.jpg",
      typing: true,
    },
    {
      id: "mirta",
      name: "Mirta George",
      lastMessage: "Yeah, Everything is fine 👍",
      time: "02:50 min",
      avatar: "/mirta.jpg",
    },
    {
      id: "paul",
      name: "Paul Haynes",
      lastMessage: "Good Morning 😊",
      time: "02:50 min",
      avatar: "/thoughtful-man-portrait.png",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "doris",
      content: "& Next meeting tomorrow 10.00AM",
      time: "10:05",
      type: "text",
    },
    {
      id: 2,
      sender: "me",
      content: "Wow that's great",
      time: "10:06",
      type: "text",
    },
    {
      id: 3,
      sender: "doris",
      content: "Images",
      time: "10:30",
      type: "images",
      images: ["/man-with-sunglasses.jpg", "/workspace-desk.jpg"],
    },
    {
      id: 4,
      sender: "me",
      content: "admin_v1.0.zip",
      time: "01:30",
      type: "file",
      fileSize: "12.5 MB",
    },
    {
      id: 5,
      sender: "doris",
      content: "typing...",
      time: "",
      type: "typing",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId)
    setIsChatOpen(true)
  }

  const handleBackToList = () => {
    setIsChatOpen(false)
  }

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  return (
    <div className="flex h-screen max-h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${isChatOpen ? "hidden md:flex" : "flex"}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Chats</h1>

          {/* Search */}
        </div>

        {/* User Avatars */}

        {/* Recent Conversations */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleChatSelect(conversation.id)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === conversation.id ? "bg-indigo-50" : "hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate ${
                          conversation.typing ? "text-indigo-600 italic" : "text-gray-600"
                        }`}
                      >
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${!isChatOpen ? "hidden md:flex" : "flex"}`}>
        {/* Chat Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <button
              onClick={handleBackToList}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 mr-2 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={selectedConversation?.avatar || "/placeholder.svg"}
              alt={selectedConversation?.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-3 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{selectedConversation?.name}</h3>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              {message.sender !== "me" && (
                <img
                  src={selectedConversation?.avatar || "/placeholder.svg"}
                  alt={selectedConversation?.name}
                  className="w-8 h-8 rounded-full object-cover mr-3 mt-1 flex-shrink-0"
                />
              )}

              <div className={`max-w-xs lg:max-w-md ${message.sender === "me" ? "order-1" : "order-2"}`}>
                {message.type === "typing" ? (
                  <div className="bg-indigo-500 text-white px-4 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : message.type === "images" ? (
                  <div className="bg-indigo-500 p-3 rounded-2xl rounded-bl-sm">
                    <p className="text-white text-sm mb-2">{message.content}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {message.images?.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Shared image"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <p className="text-white text-xs mt-2 opacity-75">{message.time}</p>
                  </div>
                ) : message.type === "file" ? (
                  <div
                    className={`p-3 rounded-2xl ${
                      message.sender === "me"
                        ? "bg-indigo-500 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${message.sender === "me" ? "bg-white/20" : "bg-indigo-100"}`}
                      >
                        <Paperclip
                          className={`w-4 h-4 ${message.sender === "me" ? "text-white" : "text-indigo-600"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{message.content}</p>
                        <p className={`text-xs ${message.sender === "me" ? "text-white/75" : "text-gray-500"}`}>
                          {message.fileSize}
                        </p>
                      </div>
                      <button
                        className={`p-1 rounded flex-shrink-0 ${message.sender === "me" ? "hover:bg-white/20" : "hover:bg-gray-200"}`}
                      >
                        <Download className={`w-4 h-4 ${message.sender === "me" ? "text-white" : "text-gray-600"}`} />
                      </button>
                    </div>
                    <p className={`text-xs mt-2 ${message.sender === "me" ? "text-white/75" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                ) : (
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender === "me"
                        ? "bg-indigo-500 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/75" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                )}
              </div>

              {message.sender === "me" && (
                <img
                  src="/user-avatar.jpg"
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover ml-3 mt-1 order-2 flex-shrink-0"
                />
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 relative min-w-0">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter Message..."
                className="w-full px-4 py-3 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors pr-12"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              className="flex-shrink-0 p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
