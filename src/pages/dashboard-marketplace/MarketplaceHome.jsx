import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Plus,
  Trash2,
  X,
  RotateCcw,
} from "lucide-react";

export default function MarketplaceHome() {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });
  const [lastReset, setLastReset] = useState(
    localStorage.getItem("lastStatsReset")
      ? new Date(localStorage.getItem("lastStatsReset"))
      : null
  );

  const token = localStorage.getItem("token");

  // 🟢 جلب البيانات
  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, delRes] = await Promise.all([
        fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/deliveries", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const ordersData = await ordersRes.json();
      const delData = await delRes.json();

      if (ordersRes.ok) setOrders(ordersData.orders || []);
      if (delRes.ok) setDeliveries(delData.deliveries || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // 🟢 تصفية الطلبات بعد التصفير فقط
  const filteredOrders = lastReset
    ? orders.filter((o) => new Date(o.createdAt) > new Date(lastReset))
    : orders;

  // 🧮 الإحصائيات
  const completedOrders = filteredOrders.filter((o) => o.status === "completed");
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + (o.productPrice + (o.shippingCost || 0)),
    0
  );
  const activeUsers = new Set(filteredOrders.map((o) => o.customerName)).size;
  const ordersRate =
    filteredOrders.length > 0
      ? ((completedOrders.length / filteredOrders.length) * 100).toFixed(2)
      : 0;

  // 🧾 Recent Orders
  const recentOrders = filteredOrders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // 🏆 Top Products
  const productSales = {};
  filteredOrders.forEach((o) => {
    const key = o.productName;
    if (!productSales[key]) {
      productSales[key] = { count: 0, revenue: 0 };
    }
    productSales[key].count += 1;
    productSales[key].revenue += o.productPrice + (o.shippingCost || 0);
  });

  const topProducts = Object.entries(productSales)
    .map(([name, data]) => ({
      name,
      sales: data.count,
      revenue: `$${data.revenue}`,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // 🟢 Reset Stats
  const handleResetStats = () => {
    if (!confirm("Reset all statistics? This will start counting new data.")) return;
    const now = new Date();
    localStorage.setItem("lastStatsReset", now);
    setLastReset(now);
    alert("✅ Statistics reset. New data will be counted from now.");
  };

  // ➕ إضافة دليفري
  const addDelivery = async () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.city) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/deliveries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setDeliveries((prev) => [data.delivery, ...prev]);
        setShowAddPopup(false);
        setForm({ firstName: "", lastName: "", phone: "", city: "" });
      } else alert(data.message || "Error adding delivery");
    } catch (err) {
      console.error("Add delivery error:", err);
      alert("Network error while adding delivery");
    }
  };

  // 🗑️ حذف دليفري
  const deleteDelivery = async (id) => {
    if (!confirm("Delete this delivery?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/deliveries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeliveries((prev) => prev.filter((d) => d._id !== id));
        setSelectedDelivery(null);
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting delivery");
      }
    } catch (err) {
      alert("Network error deleting delivery");
    }
  };

  return (
    <>
      {/* 🧩 Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Overview</h2>
          <p className="text-slate-400">
            Welcome back! Here's your live business stats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetStats}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <RotateCcw className="w-4 h-4" /> Reset Stats
          </button>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
          >
            <Activity className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* 🧮 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: `$${totalRevenue}`, icon: DollarSign, color: "from-purple-500 to-pink-500" },
          { label: "Active Users", value: activeUsers, icon: Users, color: "from-cyan-500 to-blue-500" },
          { label: "Total Orders", value: filteredOrders.length, icon: ShoppingCart, color: "from-pink-500 to-purple-500" },
          { label: "Orders Rate", value: `${ordersRate}%`, icon: Activity, color: "from-blue-500 to-cyan-500" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-purple-500/50 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="text-white w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-2xl text-white font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* 🧾 Recent Orders */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-slate-400 text-center py-3">No recent orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{order.productName}</p>
                  <p className="text-slate-400 text-sm">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    ${order.productPrice + (order.shippingCost || 0)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "shipping"
                        ? "bg-blue-500/20 text-blue-400"
                        : order.status === "cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🏆 Top Sales */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Sales</h3>
        {topProducts.length === 0 ? (
          <p className="text-slate-400 text-center py-3">No products sold yet.</p>
        ) : (
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-purple-400 font-semibold">{product.revenue}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{
                        width: `${(product.sales / topProducts[0].sales) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-slate-400 text-sm">{product.sales} sales</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🚚 Delivery Team */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg">Delivery Team</h3>
          <button
            onClick={() => setShowAddPopup(true)}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add Delivery
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400 text-center py-4">Loading...</p>
        ) : deliveries.length === 0 ? (
          <p className="text-slate-400 text-center py-4">
            No delivery team added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">City</th>
                  <th className="py-2 px-3">Phone</th>
                  <th className="py-2 px-3 text-center">Completed</th>
                  <th className="py-2 px-3 text-center">Cancelled</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((d) => (
                  <tr
                    key={d._id}
                    onClick={() => setSelectedDelivery(d)}
                    className="hover:bg-slate-700/50 cursor-pointer transition"
                  >
                    <td className="py-2 px-3 font-medium">
                      {d.firstName} {d.lastName}
                    </td>
                    <td className="py-2 px-3">{d.city}</td>
                    <td className="py-2 px-3">{d.phone}</td>
                    <td className="py-2 px-3 text-center text-green-400 font-semibold">
                      {d.completedCount}
                    </td>
                    <td className="py-2 px-3 text-center text-red-400 font-semibold">
                      {d.cancelledCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ➕ Add Delivery Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAddPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg text-white font-semibold mb-4">
              Add New Delivery
            </h3>
            <div className="space-y-3">
              {["firstName", "lastName", "phone", "city"].map((f) => (
                <input
                  key={f}
                  type="text"
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f]: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              ))}
              <button
                onClick={addDelivery}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Add Delivery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👤 Delivery Details Popup */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedDelivery(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl text-white font-semibold mb-3">
              Delivery Details
            </h3>
            <div className="space-y-2 text-slate-300">
              <p>
                👤 <b>Name:</b> {selectedDelivery.firstName}{" "}
                {selectedDelivery.lastName}
              </p>
              <p>
                📞 <b>Phone:</b> {selectedDelivery.phone}
              </p>
              <p>
                🏙️ <b>City:</b> {selectedDelivery.city}
              </p>
              <p>
                ✅ <b>Completed:</b> {selectedDelivery.completedCount}
              </p>
              <p>
                ❌ <b>Cancelled:</b> {selectedDelivery.cancelledCount}
              </p>
            </div>

            <button
              onClick={() => deleteDelivery(selectedDelivery._id)}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
            >
              <Trash2 className="w-4 h-4" /> Delete Delivery
            </button>
          </div>
        </div>
      )}
    </>
  );
}
