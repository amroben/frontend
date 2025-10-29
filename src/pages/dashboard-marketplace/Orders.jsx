import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  X,
  ChevronDown,
  RefreshCw,
  Trash2,
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]); // 🟢 الدليفريز
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openStatusId, setOpenStatusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [targetOrder, setTargetOrder] = useState(null);
  const token = localStorage.getItem("token");

  // ✅ تحميل الطلبات والدليفريز
  const fetchOrdersAndDeliveries = async () => {
    setLoading(true);
    try {
      const [ordersRes, delRes] = await Promise.all([
        fetch("https://server-uxqv.onrender.com/api/orders", {
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
      console.error(err);
      alert("Network error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersAndDeliveries();
  }, [token]);

  // ✅ حذف الطلب
  const deleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`https://server-uxqv.onrender.com/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setSelectedOrder(null);
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting order");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error deleting order");
    }
  };

  // ✅ تغيير الحالة (يفتح popup اختيار دليفري إن لزم)
  const handleStatusChange = (orderId, newStatus) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return;

    // إذا اختار shipping + نوع التوصيل delivery + بدون deliveryName → افتح popup اختيار دليفري
    if (newStatus === "shipping" && order.orderType === "delivery" && !order.deliveryName) {
      setTargetOrder(order);
      setShowDeliveryPopup(true);
      setOpenStatusId(null);
      return;
    }

    updateOrderStatus(orderId, { status: newStatus });
    setOpenStatusId(null);
  };

  // ✅ تنفيذ طلب PATCH لتحديث الطلب
  const updateOrderStatus = async (orderId, body) => {
    try {
      const res = await fetch(`https://server-uxqv.onrender.com/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, ...data.order } : o
          )
        );

        // إذا كان الطلب يحتوي على دليفري معين — حدّث العدادات
        if (body.status === "completed" || body.status === "cancelled") {
          const dName = data.order.deliveryName;
          if (dName) await updateDeliveryCount(dName, body.status);
        }
      } else {
        alert(data.message || "Error updating order");
      }
    } catch (err) {
      console.error("Network error updating order:", err);
    }
  };

  // ✅ تحديث عدادات دليفري (completed / cancelled)
  const updateDeliveryCount = async (deliveryName, status) => {
    try {
      const delivery = deliveries.find(
        (d) => `${d.firstName} ${d.lastName}` === deliveryName
      );
      if (!delivery) return;

      const field =
        status === "completed" ? "completedCount" : "cancelledCount";

      await fetch(`https://server-uxqv.onrender.com/api/deliveries/${delivery._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          [field]: delivery[field] + 1,
        }),
      });
      // تحديث اللوكال ستايت
      setDeliveries((prev) =>
        prev.map((d) =>
          d._id === delivery._id
            ? { ...d, [field]: d[field] + 1 }
            : d
        )
      );
    } catch (err) {
      console.error("Error updating delivery count:", err);
    }
  };

  // ✅ تأكيد اختيار دليفري للحالة shipping
  const handleDeliveryConfirm = async () => {
    if (!selectedDelivery) {
      alert("Please select a delivery person");
      return;
    }

    await updateOrderStatus(targetOrder._id, {
      status: "shipping",
      deliveryName: selectedDelivery,
    });

    setShowDeliveryPopup(false);
    setSelectedDelivery("");
    setTargetOrder(null);
  };

  // ✅ ألوان الحالات
  const getStatusColor = (status) => {
    switch (status) {
      case "prepared":
        return "bg-yellow-500/20 text-yellow-400";
      case "shipping":
        return "bg-blue-500/20 text-blue-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  // ✅ بحث بالاسم أو الهاتف
  const filteredOrders = orders.filter(
    (o) =>
      o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 🔹 العنوان + زر التحديث */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Orders
          </h2>
          <p className="text-slate-400">Track and manage customer orders</p>
        </div>
        <button
          onClick={fetchOrdersAndDeliveries}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
        >
          <RefreshCw className="w-4 h-4" /> Reload
        </button>
      </div>

      {/* 🔹 البحث + الطلبات */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">All Orders</h3>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white w-64"
            />
          </div>
        </div>

        {/* 🔹 الطلبات */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-400 text-center py-4">
              Loading orders...
            </p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-slate-400 text-center py-4">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors gap-3"
              >
                {/* يسار */}
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {order.productName}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {order.customerName}
                    </p>
                  </div>
                </div>

                {/* يمين */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end relative">
                  <p className="text-white font-bold">
                    ${order.productPrice + (order.shippingCost || 0)}
                  </p>

                  {/* الحالة */}
                  <button
                    onClick={() =>
                      setOpenStatusId(
                        openStatusId === order._id ? null : order._id
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* القائمة المنسدلة */}
                  {openStatusId === order._id && (
                    <div className="absolute right-0 top-10 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 w-40">
                      {["prepared", "shipping", "cancelled", "completed"].map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() =>
                              handleStatusChange(order._id, status)
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 text-slate-300"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popup التفاصيل */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-white mb-4">
              Order Details
            </h3>
            <div className="space-y-2 text-slate-300">
              <p>📦 Product: {selectedOrder.productName}</p>
              <p>
                💵 Price: ${selectedOrder.productPrice} + $
                {selectedOrder.shippingCost || 0} shipping
              </p>
              <p>🧍‍♂️ Customer: {selectedOrder.customerName}</p>
              <p>📞 Phone: {selectedOrder.customerPhone}</p>
              <p>🏠 Address: {selectedOrder.customerAddress}</p>
              <p>🚚 Delivery: {selectedOrder.deliveryName || "—"}</p>
              <p>
                🕒 Created:{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p>
                🚀 Shipped:{" "}
                {selectedOrder.shippedAt
                  ? new Date(selectedOrder.shippedAt).toLocaleString()
                  : "Not yet"}
              </p>
              <p>
                🔁 Status:{" "}
                <span className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => deleteOrder(selectedOrder._id)}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg w-full justify-center"
            >
              <Trash2 className="w-4 h-4" /> Delete Order
            </button>
          </div>
        </div>
      )}

      {/* Popup اختيار دليفري */}
      {showDeliveryPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg text-white font-semibold mb-3">
              Select Delivery Person
            </h3>
            <select
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white mb-4"
            >
              <option value="">Choose delivery person</option>
              {deliveries.map((d) => (
                <option
                  key={d._id}
                  value={`${d.firstName} ${d.lastName}`}
                >
                  {d.firstName} {d.lastName} ({d.city})
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeliveryPopup(false)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeliveryConfirm}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
