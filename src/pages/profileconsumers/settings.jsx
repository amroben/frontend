import testImage from "./test.png"

import { useState } from "react"

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "karim._.55", // Non-editable
    fullName: "karim cherki", // Non-editable
    birthday: "2002-02-16",
    email: "stephenpowder@swiftdex.com",
    type: "BAQAJ pro",
    phone: "0685963214",
    city: "Tarables",

  })

  const [originalData, setOriginalData] = useState(formData)

  const handleEdit = () => {
    setOriginalData(formData)
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(originalData)
    setIsEditing(false)
  }

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...")
    // Redirect to login page or clear session
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="max-w-12xl mx-auto ">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Account Settings</h2>
              <p className="text-sm sm:text-base text-gray-600">Manage your personal account information</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
            <div className="relative flex justify-center sm:justify-start">
              <img
                src={testImage}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-gray-100"
              />
              {isEditing && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{formData.fullName}</h3>
              <p className="text-gray-500 mb-2 sm:mb-3 text-sm sm:text-base">@{formData.username}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-3.4L10 12l-3.2-2.4L7.7 14z" />
                </svg>
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200">
                  {formData.type}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Non-editable fields */}
            <FormField label="Username" value={formData.username} isEditing={false} readOnly={true} />
            <FormField label="Full Name" value={formData.fullName} isEditing={false} readOnly={true} />

            {/* Editable fields */}
            <FormField
              label="Birthday"
              value={formData.birthday}
              isEditing={isEditing}
              onChange={(value) => handleInputChange("birthday", value)}
              type="date"
            />
            <FormField
              label="Email"
              value={formData.email}
              isEditing={isEditing}
              onChange={(value) => handleInputChange("email", value)}
              type="email"
            />
            <FormField
              label="Phone Number"
              value={formData.phone}
              isEditing={isEditing}
              onChange={(value) => handleInputChange("phone", value)}
              type="tel"
            />
            <FormField
              label="City"
              value={formData.city}
              isEditing={isEditing}
              onChange={(value) => handleInputChange("city", value)}
            />

          </div>


        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, isEditing, onChange, type = "text", readOnly = false, multiline = false }) {
  return (
    <div className={`${multiline ? "col-span-full" : ""}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">{label}</label>
      <div className="relative">
        {isEditing && !readOnly ? (
          multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-sm sm:text-base"
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
            />
          )
        ) : (
          <div
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl transition-colors duration-200 flex justify-between items-center ${
              readOnly
                ? "border-gray-200 bg-gray-50/50 text-gray-600"
                : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <span className="text-gray-900 font-medium text-sm sm:text-base break-words">{value}</span>
            {readOnly && (
              <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                Read Only
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
