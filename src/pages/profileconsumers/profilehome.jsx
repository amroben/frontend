import testImage from "./test.png"
import { useState } from "react"
import { Edit2, Crown } from "lucide-react"

export default function ProfileHome() {
  const [formData] = useState({
    username: "karim._.55",
    fullName: "karim cherki",
    birthday: "2002-02-16",
    email: "stephen@swiftdex.com",
    type: "BAQAJ pro",
  })

  return (
    <div className="max-w-10xl mx-auto ">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
          <p className="text-gray-600">Manage your public account information</p>
        </div>

        <div className="p-8">
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-100">
            <div className="relative">
              <img
                src={testImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Edit2 size={14} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{formData.fullName}</h3>
              <p className="text-gray-500 mb-3">@{formData.username}</p>
              <div className="flex items-center gap-2">
                <Crown size={16} className="text-amber-500" />
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200">
                  {formData.type}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow label="User Name" value={formData.username} />
            <InfoRow label="Full Name" value={formData.fullName} />
            <InfoRow label="Birthday" value={formData.birthday} />
            <InfoRow label="Email" value={formData.email} />
            <InfoRow label="Phone" value="0685963214" />
            <InfoRow label="City" value="Tarables" />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, editable = true }) {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <div className="relative">
        <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center group-hover:border-gray-300">
          <span className="text-gray-900 font-medium">{value}</span>
        </div>
      </div>
    </div>
  )
}
