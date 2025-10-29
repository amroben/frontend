"use client"

import { useState } from "react"
import { ShoppingCart, Package, Calendar, CreditCard, Trash2, Plus, Minus, QrCode, X, Truck } from "lucide-react"

const Orders = () => {
  const [activeTab, setActiveTab] = useState("historique")
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'MacBook Pro 14"',
      price: 2499,
      quantity: 1,
      image: "/silver-macbook-on-desk.png",
      store: "Apple Store",
      storeShipping: 25,
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 1199,
      quantity: 2,
      image: "/modern-smartphone.png",
      store: "Apple Store",
      storeShipping: 25,
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 249,
      quantity: 1,
      image: "/wireless-earbuds.png",
      store: "TechMart",
      storeShipping: 15,
    },
  ])

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 1042,
      shipping: 15,
      items: [
        { name: "iPad Air", quantity: 1, price: 599 },
        { name: "Apple Pencil", quantity: 1, price: 129 },
        { name: "Smart Keyboard", quantity: 1, price: 299 },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      status: "Shipped",
      total: 509,
      shipping: 12,
      items: [
        { name: "Apple Watch Series 9", quantity: 1, price: 399 },
        { name: "Sport Band", quantity: 2, price: 49 },
      ],
    },
    {
      id: "ORD-003",
      date: "2023-12-20",
      status: "Delivered",
      total: 1387,
      shipping: 20,
      items: [
        { name: "MacBook Air M2", quantity: 1, price: 1199 },
        { name: "Magic Mouse", quantity: 1, price: 79 },
        { name: "USB-C Hub", quantity: 1, price: 89 },
      ],
    },
    {
      id: "ORD-004",
      date: "2024-01-20",
      status: "Preparation",
      total: 298,
      shipping: 10,
      items: [
        { name: "AirPods Pro", quantity: 1, price: 249 },
        { name: "iPhone Case", quantity: 1, price: 39 },
      ],
    },
  ]

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shippingTotal = Object.values(getItemsByStore()).reduce((total, store) => total + store.shipping, 0)
    return itemsTotal + shippingTotal
  }

  const getItemsTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalShipping = () => {
    return Object.values(getItemsByStore()).reduce((total, store) => total + store.shipping, 0)
  }

  const getItemsByStore = () => {
    const grouped = cartItems.reduce((acc, item) => {
      if (!acc[item.store]) {
        acc[item.store] = {
          items: [],
          shipping: item.storeShipping,
        }
      }
      acc[item.store].items.push(item)
      return acc
    }, {})
    return grouped
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100"
      case "Shipped":
        return "text-blue-600 bg-blue-100 cursor-pointer hover:bg-blue-200"
      case "Preparation":
        return "text-orange-600 bg-orange-100"
      case "Processing":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleStatusClick = (status, order) => {
    if (status === "Shipped") {
      setSelectedOrder(order)
      setShowInvoiceModal(true)
    }
  }

  const InvoiceModal = ({ order, onClose }) => {
    if (!order) return null

    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Facture</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-semibold">SWIFTDEX</h3>
                <p className="text-sm text-gray-600">123 Commerce Street</p>
                <p className="text-sm text-gray-600">City, State 12345</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Commande #</p>
                  <p className="text-gray-600">{order.id}</p>
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{new Date(order.date).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Articles</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Truck size={14} />
                    Livraison
                  </span>
                  <span>${order.shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${subtotal + order.shipping}</span>
                </div>
              </div>

              <div className="text-center border-t pt-4">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg mb-2">
                  <QrCode size={48} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-500">Code de suivi: {order.id}-TRACK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("historique")}
          className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 flex items-center gap-2 ${
            activeTab === "historique"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-indigo-600"
          }`}
        >
          <Package size={16} />
          Historique
        </button>
        <button
          onClick={() => setActiveTab("panier")}
          className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 flex items-center gap-2 ${
            activeTab === "panier"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-indigo-600"
          }`}
        >
          <ShoppingCart size={16} />
          Panier ({cartItems.length})
        </button>
      </div>

      <div>
        {activeTab === "historique" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package size={20} />
              Historique des commandes
            </h2>

            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Commande #{order.id}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={14} />
                        {new Date(order.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        onClick={() => handleStatusClick(order.status, order)}
                      >
                        {order.status}
                      </span>
                      <p className="text-lg font-semibold text-gray-900 mt-2">${order.total}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Articles commandés:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">${item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm border-t pt-2 mt-2">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Truck size={14} />
                          Livraison
                        </span>
                        <span className="font-medium">${order.shipping}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "panier" && (
          <div>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ShoppingCart size={20} />
              Panier ({cartItems.length} articles)
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <ShoppingCart size={48} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Votre panier est vide</p>
                <p className="text-gray-400 text-sm mt-2">Ajoutez des articles pour commencer vos achats</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(getItemsByStore()).map(([storeName, storeData]) => (
                  <div key={storeName} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
                    {/* Store Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Package size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{storeName}</h3>
                          <p className="text-sm text-gray-500">
                            {storeData.items.length} article{storeData.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Truck size={14} />
                          <span>Livraison: ${storeData.shipping}</span>
                        </div>
                      </div>
                    </div>

                    {/* Store Items */}
                    <div className="space-y-4">
                      {storeData.items.map((item) => (
                        <div
                          key={item.id}
                          className="group bg-gray-50 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-indigo-200 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <div className="relative mx-auto sm:mx-0">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-2 group-hover:scale-105 transition-transform duration-300">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-indigo-700 transition-colors duration-200 text-center md:text-left">
                                {item.name}
                              </h4>
                              <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                  ${item.price}
                                </span>
                                <span className="text-xs text-gray-500">par unité</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                              <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center hover:scale-110"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-center sm:text-right">
                                  <p className="text-xs text-gray-500 mb-1">Total</p>
                                  <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    ${item.price * item.quantity}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center hover:scale-110"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 rounded-2xl p-6 mt-8 border border-gray-100 shadow-sm">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sous-total articles</span>
                      <span className="font-semibold text-gray-900">${getItemsTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Truck size={14} />
                        Frais de livraison
                      </span>
                      <span className="font-semibold text-gray-900">${getTotalShipping()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">Total de la commande</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                        ${getTotalPrice()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      {cartItems.length} article{cartItems.length > 1 ? "s" : ""} •{" "}
                      {Object.keys(getItemsByStore()).length} magasin
                      {Object.keys(getItemsByStore()).length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] group/checkout">
                    <CreditCard
                      size={20}
                      className="group-hover/checkout:scale-110 transition-transform duration-200"
                    />
                    <span>Procéder au paiement</span>
                    <div className="w-2 h-2 bg-white/30 rounded-full group-hover/checkout:animate-pulse"></div>
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-3">
                    Paiement sécurisé • Livraison gratuite dès 50€
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showInvoiceModal && <InvoiceModal order={selectedOrder} onClose={() => setShowInvoiceModal(false)} />}
    </div>
  )
}

export default Orders
