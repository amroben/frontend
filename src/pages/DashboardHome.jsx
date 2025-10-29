import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Menu,
  MoreHorizontal,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

// بيانات تشارت
const lineChartData = [
  { name: "Jan", consumer: 65, craftsman: 45, merchants: 35, services: 38 },
  { name: "Feb", consumer: 75, craftsman: 52, merchants: 42, services: 32 },
  { name: "Mar", consumer: 85, craftsman: 48, merchants: 55, services: 58 },
  { name: "Apr", consumer: 70, craftsman: 61, merchants: 38, services: 75 },
  { name: "May", consumer: 95, craftsman: 55, merchants: 65, services: 25 },
  { name: "Jun", consumer: 88, craftsman: 58, merchants: 52, services: 33 },
  { name: "Jul", consumer: 92, craftsman: 60, merchants: 55, services: 22 },
]

export default function DashboardHome() {
  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Consumer */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-b-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">150</p>
              <p className="text-sm text-gray-600">Consumer Users</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Menu className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm text-green-500">+2.65%</span>
            <span className="text-sm text-gray-500">last month</span>
          </div>
        </div>

        {/* Merchants */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-b-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">250</p>
              <p className="text-sm text-gray-600">Merchant Users</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Menu className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm text-green-500">+3.48%</span>
            <span className="text-sm text-gray-500">last month</span>
          </div>
        </div>

        {/* Craftsman */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-b-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">109</p>
              <p className="text-sm text-gray-600">Craftsman Users</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Menu className="text-red-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="text-red-500" size={16} />
            <span className="text-sm text-red-500">-2.65%</span>
            <span className="text-sm text-gray-500">last month</span>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-b-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">500</p>
              <p className="text-sm text-gray-600">Services Users</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm text-green-500">+5.48%</span>
            <span className="text-sm text-gray-500">last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Users Charts</h3>
            <MoreHorizontal className="text-gray-400 cursor-pointer" size={20} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="consumer" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="craftsman" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="merchants" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="services" stroke="#9710b9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3D Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">3D Analytics</h3>
            <MoreHorizontal className="text-gray-400 cursor-pointer" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg transform rotate-12 shadow-lg"></div>
              <p className="text-sm text-gray-600">3D Visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
