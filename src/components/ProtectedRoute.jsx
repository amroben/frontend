import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  allowedProviderTypes = [],
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return null; // أو spinner بسيط

  // المستخدم غير مسجل
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // تحقق من الدور العام
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // تحقق من نوع المزود (merchant / craftsman / services)
  if (
    user.role === "provider" &&
    allowedProviderTypes.length > 0 &&
    !allowedProviderTypes.includes(user.providerType)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
