"use client"

import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Home, Package, ShoppingCart, Settings, Menu, X, TrendingUp, User } from "lucide-react"

export default function DashboardMarketplace() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const menuItems = [
    { name: "Home", icon: Home, path: "/dashboard-marketplace" },
    { name: "Products", icon: Package, path: "/dashboard-marketplace/products" },
    { name: "Orders", icon: ShoppingCart, path: "/dashboard-marketplace/orders" },
    { name: "Settings", icon: Settings, path: "/dashboard-marketplace/settings" },
  ]

  // ✅ تحميل بيانات المستخدم من localStorage عند فتح الصفحة
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      navigate("/") // إذا لم يكن هناك مستخدم، يرجع إلى الصفحة الرئيسية
    }
  }, [navigate])

  // ✅ تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/") // العودة إلى الصفحة الرئيسية
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-600 via-purple-700 to-pink-600 shadow-2xl z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 sm:p-6 relative">
          {/* Close Button - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BAQAJ</span>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 mb-8 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              {/* Avatar */}
              <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* User Details */}
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-purple-200 truncate max-w-[120px]">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/dashboard-marketplace"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/20 text-white border-l-4 border-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">
                    {item.name}
                  </span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white hover:bg-slate-700/50 p-2 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-white font-semibold text-lg hidden sm:block">
                Dashboard Marketplace
              </h1>
            </div>

            {/* Header Right */}
            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:block text-right mr-3">
                  <p className="text-white font-medium text-sm truncate max-w-[140px]">
                    {user.name}
                  </p>
                  <p className="text-purple-300 text-[11px] truncate max-w-[140px]">
                    {user.email}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
