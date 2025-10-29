// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";

// 🔹 Dashboard Admin
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import ConsumersPage from "./pages/ConsumersPage";
import MerchantsPage from "./pages/MerchantsPage";
import CraftsmanPage from "./pages/CraftsmanPage";
import ServicesPage from "./pages/ServicesPage";
import AdminsPage from "./pages/AdminsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import OperationsPage from "./pages/OperationsPage";
import SupportsPage from "./pages/SupportsPage";
import SettingsPage from "./pages/SettingsPage";

// 🔹 ProfileConsumers
import Profile from "./pages/profileconsumers/Profile";
import ProfileHome from "./pages/profileconsumers/profilehome";
import ProfileSettings from "./pages/profileconsumers/settings";
import Chats from "./pages/profileconsumers/chats";
import Orders from "./pages/profileconsumers/orders";

// 🔹 Dashboard Marketplace (للتجار)
import DashboardMarketplace from "./pages/dashboard-marketplace/DashboardMarketplace";
import MarketplaceHome from "./pages/dashboard-marketplace/MarketplaceHome";
import Products from "./pages/dashboard-marketplace/Products";
import OrdersMarketplace from "./pages/dashboard-marketplace/Orders";
import SettingsMarketplace from "./pages/dashboard-marketplace/Settings";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard Admin - مسموح فقط للأدمن */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="consumers" element={<ConsumersPage />} />
            <Route path="merchants" element={<MerchantsPage />} />
            <Route path="craftsman" element={<CraftsmanPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="operations" element={<OperationsPage />} />
            <Route path="supports" element={<SupportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ProfileConsumers - مسموح فقط للمستهلك */}
          <Route
            path="/profileconsumers/*"
            element={
              <ProtectedRoute allowedRoles={["consumer"]}>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileHome />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="chats" element={<Chats />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Dashboard Marketplace - مسموح لمزود (provider) و admin */}
          <Route
            path="/dashboard-marketplace/*"
            element={
<ProtectedRoute allowedRoles={["provider"]} allowedProviderTypes={["merchant"]}>
                <DashboardMarketplace />
              </ProtectedRoute>
            }
          >
            <Route index element={<MarketplaceHome />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<OrdersMarketplace />} />
            <Route path="settings" element={<SettingsMarketplace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
