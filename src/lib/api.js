import axios from "axios";

// إعداد instance للاتصال مع الـ backend
const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // عدّل الرابط إذا كنت تستخدم عنوان آخر
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// تسجيل مستخدم جديد
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// تسجيل الدخول
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// جلب البروفايل
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

