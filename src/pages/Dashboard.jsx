import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, Home, Users, FileText, BarChart3, Database, Headphones, Settings } from "lucide-react";

function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-slate-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            {!sidebarCollapsed && <span className="text-xl font-bold">BAQAJ</span>}
          </div>
        </div>

        {/* Navigation */}
      <nav className="flex-1 p-4">
  <div className="space-y-2">
    <div className="text-xs text-slate-400 uppercase tracking-wider mb-4">
      {!sidebarCollapsed && "DASHBOARDS"}
    </div>

    {/* Dashboard */}
    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
        }`
      }
    >
      <Home size={20} />
      {!sidebarCollapsed && <span>Dashboard</span>}
    </NavLink>

    {/* Consumers */}
    <NavLink
      to="consumers"
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
        }`
      }
    >
      <BarChart3 size={20} />
      {!sidebarCollapsed && <span>Consumers</span>}
    </NavLink>

    {/* Merchants */}
    <NavLink
      to="merchants"
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
        }`
      }
    >
      <BarChart3 size={20} />
      {!sidebarCollapsed && <span>Merchants</span>}
    </NavLink>

    {/* Craftsman */}
    <NavLink
      to="craftsman"
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
        }`
      }
    >
      <BarChart3 size={20} />
      {!sidebarCollapsed && <span>Craftsman</span>}
    </NavLink>

    {/* Services */}
    <NavLink
      to="services"
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
        }`
      }
    >
      <BarChart3 size={20} />
      {!sidebarCollapsed && <span>Services</span>}
    </NavLink>

    <div className="mt-6">
      <div className="text-xs text-slate-400 uppercase tracking-wider mb-4">
        {!sidebarCollapsed && "ADMINISTRATION"}
      </div>

      {/* Admins */}
      <NavLink
        to="admins"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg ${
            isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
          }`
        }
      >
        <Users size={20} />
        {!sidebarCollapsed && <span>Admins</span>}
      </NavLink>

      {/* Complaints */}
      <NavLink
        to="complaints"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg ${
            isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
          }`
        }
      >
        <FileText size={20} />
        {!sidebarCollapsed && <span>Complaints</span>}
      </NavLink>

      {/* Operations */}
      <NavLink
        to="operations"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg ${
            isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
          }`
        }
      >
        <Database size={20} />
        {!sidebarCollapsed && <span>Operations</span>}
      </NavLink>

      {/* Supports */}
      <NavLink
        to="supports"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg ${
            isActive ? "bg-purple-600 text-white" : "hover:bg-slate-700"
          }`
        }
      >
        <Headphones size={20} />
        {!sidebarCollapsed && <span>Supports</span>}
      </NavLink>
    </div>
  </div>
</nav>


        {/* Bottom Settings */}
        <div className="p-4 border-t border-slate-700">
        <NavLink
  to="settings"
  className={({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 ${
      isActive ? "bg-purple-600 text-white" : "text-gray-300"
    }`
  }
>
  <Settings size={20} />
  {!sidebarCollapsed && <span>Settings</span>}
</NavLink>

        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
              <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content will change here */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
