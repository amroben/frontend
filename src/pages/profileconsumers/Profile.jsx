"use client"
import testImage from "./test.png"
import { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import {
  Home,
  Users,
  Settings,
  Edit2,
  FileText, ShoppingCart,
} from "lucide-react"

const ProfileDashboard = () => {
  const [formData] = useState({
    username: "karim._.55",
    fullName: "karim cherki",
    birthday: "2002-02-16",
    email: "stephenpowder@swiftdex.com",
    type: "BAQAJ pro",
  })

  const navigationItems = [
    { icon: Home, label: "Home", href: "/profileconsumers" },
    { icon: ShoppingCart, label: "Orders", href: "/profileconsumers/orders" },
    { icon: Users, label: "Chats", href: "/profileconsumers/chats" },
    { icon: Settings, label: "Settings", href: "/profileconsumers/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: "poppins,cairo,sans-serf,system-ui" }}>
      {/* Sidebar */}
      <div
        className="hidden lg:flex w-64 text-white flex-col"
        style={{ background: "linear-gradient(180deg, #585bf0ff 0%, #4338ca 100%)" }}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-white">BAQAJ</span>
          </div>
        </div>
 <div className="p-4 border-t border-white-500"></div>
        {/* Navigation */}
        <div className="p-4 space-y-2">
         {navigationItems.map((item, index) => (
  <NavLink
    key={index}
    to={item.href}
    end={item.href === "/profileconsumers"} // 👈 يوقف التفعيل الدائم
    className={({ isActive }) =>
      `flex items-center justify-between p-3 rounded-lg transition-colors text-white ${
        isActive ? "bg-indigo-500/30" : "hover:bg-indigo-500/20"
      }`
    }
  >
    <div className="flex items-center space-x-3">
      <item.icon size={20} className="text-white" />
      <span>{item.label}</span>
    </div>
  </NavLink>
))}

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 px-6 py-4 bg-indigo-700 lg:bg-white lg:border-gray-200">
          <div className="flex items-center justify-between">
            <div className="lg:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white lg:text-indigo-600">BAQAJ</span>
            </div>
          </div>
        </header>

        {/* Outlet (تتغير فيه الصفحات الداخلية) */}
        <div className="flex-1 p-6 overflow-auto pb-20 lg:pb-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navigationItems.map((item, index) => (
           <NavLink
  key={index}
  to={item.href}
  end={item.href === "/profileconsumers"} // 👈 نفس الفكرة
  className={({ isActive }) =>
    `flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative ${
      isActive
        ? "bg-indigo-100 text-indigo-600"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
    }`
  }
>
  <item.icon size={20} />
  <span className="text-xs mt-1 font-medium">{item.label}</span>
</NavLink>

          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileDashboard
