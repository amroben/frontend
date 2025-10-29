"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [role, setRole] = useState("")
  const [providerType, setProviderType] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    setShowDropdown(false)
  }

  // ✅ دالة توجيه المستخدم عند الضغط على "حسابي"
  const handleAccountClick = () => {
    if (!user) return
    if (user.role === "admin") {
      navigate("/dashboard")
    } else if (user.role === "provider") {
      if (user.providerType === "merchant") navigate("/dashboard-marketplace")
      else if (user.providerType === "craftsman") navigate("/dashboard-craftsman")
      else if (user.providerType === "services") navigate("/dashboard-services")
    } else if (user.role === "consumer") {
      navigate("/profileconsumers")
    } else {
      navigate("/")
    }
  }

  const features = [
    { icon: "🛍️", title: "التسوق الذكي", description: "اكتشف منتجات مميزة من تجار محليين موثوقين مع تجربة تسوق سلسة وآمنة", color: "from-purple-500 to-pink-500", image: "/colorful-shopping-display.png" },
    { icon: "🔧", title: "الخدمات المهنية", description: "احصل على خدمات عالية الجودة من حرفيين ومقدمي خدمات معتمدين في منطقتك", color: "from-blue-500 to-cyan-500", image: "/professional-services-tools.png" },
    { icon: "📅", title: "الحجز والمواعيد", description: "احجز مواعيدك بسهولة مع مقدمي الخدمات المختلفين وإدارة جدولك الزمني بكفاءة", color: "from-green-500 to-emerald-500", image: "/calendar-booking-appointment-scheduling.png" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000000)
    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  // تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      const res = await fetch("https://server-uxqv.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)
        setIsLoggedIn(true)
        setShowPopup(false)
      } else {
        alert(data.message || "فشل تسجيل الدخول")
      }
    } catch {
      alert("خطأ في الاتصال بالخادم")
    }
  }

  // إنشاء حساب
  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      birthdate: e.target.birthdate.value,
      phone: e.target.phone.value,
      role,
      providerType: role === "provider" ? providerType : "",
    }
    try {
      const res = await fetch("https://server-uxqv.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)
        setIsLoggedIn(true)
        setShowPopup(false)
      } else {
        alert(data.message || "فشل إنشاء الحساب")
      }
    } catch {
      alert("خطأ في الاتصال بالخادم")
    }
  }

  const avatarCircle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    marginLeft: "0.5rem",
  }


   const styles = {
    container: {
        fontFamily: "'Cairo', 'Poppins', 'sans-serif'",
      lineHeight: "1.6",
      color: "#333",
      overflow: "hidden",
      direction: "rtl",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      zIndex: 1000,
      padding: "1rem 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    headerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1rem",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
    },
    logoText: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "24px",
      color: "#1f2937",
    },
    nav: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
    },
    navLink: {
      color: "#6b7280",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.3s",
      cursor: "pointer",
    },
    loginButton: {
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "opacity 0.3s",
    },
    heroSection: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    },
    heroContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
      width: "100%",
    },
    heroGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "center",
    },
    heroText: {
      color: "white",
    },
    heroTitle: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "3.5rem",
      marginBottom: "1.5rem",
      lineHeight: "1.2",
      animation: "fadeInUp 0.8s ease-out forwards",
    },
    heroSubtitle: {
      fontSize: "20px",
      marginBottom: "2rem",
      opacity: "0.9",
      animation: "fadeInUp 0.8s ease-out 0.2s forwards",
      animationFillMode: "both",
    },
    heroButtons: {
      display: "flex",
      gap: "1rem",
      animation: "fadeInUp 0.8s ease-out 0.4s forwards",
      animationFillMode: "both",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
      color: "#8b5cf6",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.3s",
      boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
    },
    secondaryButton: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      padding: "1rem 2rem",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      backdropFilter: "blur(10px)",
    },
    heroVisual: {
      position: "relative",
      animation: "slideIn 1s ease-out 0.6s forwards",
      animationFillMode: "both",
    },
    phoneFrame: {
      width: "300px",
      height: "600px",
      background: "linear-gradient(135deg, #1f2937, #374151)",
      borderRadius: "40px",
      padding: "20px",
      margin: "0 auto",
      position: "relative",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    },
    phoneScreen: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #f8fafc, #ffffff)",
      borderRadius: "30px",
      padding: "2rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    appHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "1rem",
      borderBottom: "1px solid #e5e7eb",
    },
    appLogo: {
      width: "32px",
      height: "32px",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    appTitle: {
      fontWeight: "bold",
      color: "#1f2937",
    },
    menuIcon: {
      width: "24px",
      height: "24px",
      background: "#e5e7eb",
      borderRadius: "4px",
    },
    appContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    appCard: {
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      borderRadius: "16px",
      padding: "1.5rem",
      color: "white",
      textAlign: "center",
    },
    appCardTitle: {
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
    appCardDesc: {
      fontSize: "12px",
      opacity: "0.8",
    },
    featuresSection: {
      padding: "5rem 0",
      backgroundColor: "#ffffff",
    },
    sectionContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: "4rem",
      animation: "fadeInUp 0.6s ease-out forwards",
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "2.5rem",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    sectionDescription: {
      color: "#6b7280",
      fontSize: "18px",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    featuresContainer: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "24px",
    },
    featuresSlider: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      transform: `translateX(-${currentSlide * 100}%)`,
    },
    featureCard: {
      minWidth: "100%",
      position: "relative",
      height: "500px",
      borderRadius: "24px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
      animation: "scaleIn 0.4s ease-out forwards",
    },
    featureBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.3,
    },
    featureGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    featureContent: {
      position: "relative",
      zIndex: 2,
      padding: "2rem",
      maxWidth: "600px",
    },
    featureIcon: {
      width: "80px",
      height: "80px",
      margin: "0 auto 2rem",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
    },
    featureTitle: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "600",
      fontSize: "2.5rem",
      marginBottom: "1rem",
    },
    featureDescription: {
      fontSize: "18px",
      lineHeight: "1.6",
      opacity: "0.9",
    },
    sliderDots: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginTop: "2rem",
    },
    dot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#d1d5db",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    activeDot: {
      backgroundColor: "#8b5cf6",
      transform: "scale(1.2)",
    },
    aboutSection: {
      padding: "5rem 0",
      backgroundColor: "#f8fafc",
    },
    aboutGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "center",
    },
    aboutText: {
      animation: "fadeInUp 0.6s ease-out forwards",
    },
    aboutTitle: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "2.5rem",
      color: "#1f2937",
      marginBottom: "1.5rem",
    },
    aboutDescription: {
      color: "#6b7280",
      fontSize: "18px",
      lineHeight: "1.8",
      marginBottom: "2rem",
    },
    statsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },
    avatarGroup: {
      display: "flex",
      marginRight: "1rem",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      marginLeft: "-8px",
      border: "2px solid white",
    },
    statsText: {
      color: "#6b7280",
      fontWeight: "500",
    },
    aboutButton: {
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      color: "white",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "opacity 0.3s",
    },
    statsCard: {
      position: "relative",
      background: "linear-gradient(135deg, #a855f7, #c084fc)",
      borderRadius: "24px",
      padding: "2rem",
      textAlign: "center",
      color: "white",
      animation: "float 3s ease-in-out infinite",
    },
    statNumber: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    statLabel: {
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "1.5rem",
    },
    contactSection: {
      padding: "5rem 0",
      backgroundColor: "#ffffff",
    },
    contactContainer: {
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center",
    },
    contactTitle: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "2.5rem",
      color: "#1f2937",
      marginBottom: "1rem",
      animation: "fadeInUp 0.6s ease-out forwards",
    },
    contactDescription: {
      color: "#6b7280",
      fontSize: "18px",
      marginBottom: "3rem",
      animation: "fadeInUp 0.6s ease-out forwards",
    },
    contactCard: {
      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      animation: "scaleIn 0.4s ease-out forwards",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
    },
    input: {
      padding: "0.75rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "16px",
      transition: "border-color 0.3s",
      outline: "none",
    },
    textarea: {
      padding: "0.75rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "16px",
      minHeight: "120px",
      resize: "vertical",
      transition: "border-color 0.3s",
      outline: "none",
    },
    submitButton: {
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      color: "white",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "opacity 0.3s",
    },
    footer: {
      backgroundColor: "#1f2937",
      color: "white",
      padding: "3rem 0 2rem",
      textAlign: "center",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    footerLogo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      marginBottom: "2rem",
    },
    footerLogoIcon: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
    },
    footerLogoText: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "24px",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    footerLink: {
      color: "#9ca3af",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    footerBottom: {
      borderTop: "1px solid #374151",
      paddingTop: "2rem",
      color: "#9ca3af",
    },
    popup: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 50,
      padding: "1rem",
    },
    popupCard: {
      width: "100%",overflow:"hidden",
      maxWidth: "400px",height:"600px",
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
      animation: "scaleIn 0.4s ease-out forwards",

    },
    popupHeader: {
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      padding: "1.5rem",
      borderRadius: "20px 20px 0 0",
      position: "relative",
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    popupLogoIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
      color: "white",
      fontWeight: "bold",
      fontSize: "24px",
    },
    popupTitle: {
      color: "white",
      fontFamily: "'Playfair Display', serif",
      fontWeight: "bold",
      fontSize: "20px",
    },
    popupContent: {
      padding: "1.5rem",
    },
    tabs: {
      display: "flex",
      marginBottom: "1.5rem",
      backgroundColor: "#f3f4f6",
      borderRadius: "12px",
      padding: "4px",
    },
    tab: {
      flex: 1,
      padding: "0.75rem",
      textAlign: "center",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      border: "none",
      backgroundColor: "transparent",
    },
    activeTab: {
      backgroundColor: "white",
      color: "#8b5cf6",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    inactiveTab: {
      color: "#6b7280",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
      color: "#374151",
    },

    popupInput: {
      width: "100%",
      padding: "0.75rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "border-color 0.3s",
      outline: "none",
      boxSizing: "border-box",
    },
    popupButton: {
      width: "100%",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      color: "white",
      border: "none",
      padding: "0.75rem",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "opacity 0.3s",
      marginTop: "1rem",
    },
    switchText: {
      textAlign: "center",
      marginTop: "1rem",
      color: "#6b7280",
    },
    switchLink: {
      color: "#8b5cf6",
      cursor: "pointer",
      fontWeight: "600",
    },
    mobileMenu: {
      backgroundColor: "rgba(248, 250, 252, 0.95)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid #e5e7eb",
      animation: "fadeInUp 0.3s ease-out forwards",
    },
    mobileMenuContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    menuButton: {
      backgroundColor: "transparent",
      border: "none",
      padding: "0.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      transition: "background-color 0.3s",
    },
  }

  const keyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInFromRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInFromLeft {
      from {
        opacity: 0;
        transform: translateX(-100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr !important;
        text-align: center !important;
      }

      .features-grid {
        grid-template-columns: 1fr !important;
      }

      .about-grid {
        grid-template-columns: 1fr !important;
      }

      .form-row {
        grid-template-columns: 1fr !important;
      }
    }
  `

  const getGradientColors = (colorClass) => {
    const colorMap = {
      "from-purple-500 to-pink-500": { start: "#8b5cf6", end: "#ec4899" },
      "from-blue-500 to-cyan-500": { start: "#3b82f6", end: "#06b6d4" },
      "from-green-500 to-emerald-500": { start: "#10b981", end: "#059669" },
      "from-red-500 to-orange-500": { start: "#ef4444", end: "#f97316" },
      "from-indigo-500 to-purple-500": { start: "#6366f1", end: "#8b5cf6" },
    }
    return colorMap[colorClass] || { start: "#8b5cf6", end: "#ec4899" }
  }


  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Header */}
<header style={styles.header}>
  <div style={styles.headerContent}>
    {/* الشعار */}
    <div style={styles.logo}>
      <div style={styles.logoIcon}>B</div>
      <span style={styles.logoText}>BAQAJ</span>
    </div>

    {/* زر تسجيل الخروج يظهر فقط إذا المستخدم مسجل دخول */}
    {isLoggedIn && (
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          background: "#fafafa02",
          border: "#dc2626 2px solid",
          borderRadius: "8px",
          color: "#dc2626",
          fontWeight: "600",
          fontFamily:"cairo",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        تسجيل الخروج
      </button>
    )}
  </div>
</header>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroGrid} className="hero-grid">
              <div style={styles.heroText}>
                <h1 style={styles.heroTitle}>مرحباً بك في BAQAJ</h1>
                <p style={styles.heroSubtitle}>منصتك الشاملة للمنتجات والخدمات والحجوزات. كل ما تحتاجه في مكان واحد، بسهولة وأمان.</p>
                <div style={styles.heroButtons}>
{isLoggedIn ? (
<div style={{ position: "relative", display: "inline-block" }}>
  <button
    style={styles.primaryButton}
    onClick={handleAccountClick} // ✅ عند الضغط، ينتقل حسب الدور
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    <div style={avatarCircle}>{user?.name?.charAt(0) || "U"}</div>
    حسابي
  </button>
</div>

) : (
  <button
    style={styles.primaryButton}
    onClick={() => setShowPopup(true)}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    ابدأ الآن
  </button>
)}


                  <button
                    style={styles.secondaryButton}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    شاهد العرض
                  </button>
                </div>
              </div>

        <div style={styles.heroVisual}>
                <div style={styles.phoneFrame}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.appHeader}>
                      <div style={styles.appLogo}>B</div>
                      <div style={styles.appTitle}>BAQAJ</div>
                      <div style={styles.menuIcon}></div>
                    </div>

                    <div style={styles.appContent}>
                      <div style={styles.appCard}>
                        <div style={styles.appCardTitle}>اكتشف المنتجات</div>
                        <div style={styles.appCardDesc}>تصفح آلاف المنتجات عالية الجودة</div>
                      </div>

                      <div style={{ ...styles.appCard, background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                        <div style={styles.appCardTitle}>احجز خدماتك</div>
                        <div style={styles.appCardDesc}>احجز مواعيدك بسهولة وسرعة</div>
                      </div>

                      <div style={{ ...styles.appCard, background: "linear-gradient(135deg, #10b981, #059669)" }}>
                        <div style={styles.appCardTitle}>تتبع طلباتك</div>
                        <div style={styles.appCardDesc}>راقب حالة طلباتك في الوقت الفعلي</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
       {/* Features Section */}
<section id="features" style={styles.featuresSection}>
  <div style={styles.sectionContent}>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>ميزات التطبيق</h2>
      <p style={styles.sectionDescription}>
        اكتشف كيف يمكن لـ BAQAJ أن يجعل حياتك أسهل من خلال مجموعة شاملة من الخدمات والميزات
      </p>
    </div>

    {/* شبكة البطاقات الثابتة */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {features.map((feature, index) => {
        const gradientColors = getGradientColors(feature.color)
        return (
          <div key={index} style={styles.featureCard}>
            <div
              style={{
                ...styles.featureBackground,
                backgroundImage: `url(${feature.image})`,
              }}
            />
            <div
              style={{
                ...styles.featureGradient,
                background: `linear-gradient(135deg, ${gradientColors.start}, ${gradientColors.end})`,
              }}
            />
            <div style={styles.featureContent}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>


        {/* About Section */}
        <section id="about" style={styles.aboutSection}>
          <div style={styles.sectionContent}>
            <div style={styles.aboutGrid} className="about-grid">
              <div style={styles.aboutText}>
                <h2 style={styles.aboutTitle}>من نحن</h2>

                <p style={styles.aboutDescription}>
                  نحن فريق BAQAJ، هدفنا تسهيل حياتك من خلال منصة واحدة تجمع بين المنتجات والخدمات والحجوزات. نؤمن بأن
                  التكنولوجيا يجب أن تكون في خدمة الإنسان وتجعل حياته أبسط وأكثر راحة.
                </p>

                <div style={styles.statsContainer}>
                  <div style={styles.avatarGroup}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} style={styles.avatar}></div>
                    ))}
                  </div>
                  <div style={styles.statsText}>+10,000 مستخدم راضٍ</div>
                </div>

                <button
                  style={styles.aboutButton}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  اعرف المزيد
                </button>
              </div>

              <div style={styles.statsCard}>
                <div style={styles.statNumber}>+50K</div>
                <div style={styles.statLabel}>مستخدم نشط</div>

                <div style={styles.statNumber}>+1000</div>
                <div style={styles.statLabel}>مزود خدمة</div>

                <div style={styles.statNumber}>99%</div>
                <div style={styles.statLabel}>رضا العملاء</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={styles.contactSection}>
          <div style={styles.sectionContent}>
            <div style={styles.contactContainer}>
              <h2 style={styles.contactTitle}>تواصل معنا</h2>
              <p style={styles.contactDescription}>لديك سؤال أو اقتراح؟ نحن هنا للمساعدة</p>

              <div style={styles.contactCard}>
                <form style={styles.form}>
                  <div style={styles.formRow} className="form-row">
                    <input
                      style={styles.input}
                      placeholder="اسمك الكامل"
                      onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                    <input
                      type="email"
                      style={styles.input}
                      placeholder="بريدك الإلكتروني"
                      onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>

                  <textarea
                    style={styles.textarea}
                    placeholder="رسالتك"
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />

                  <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerLogo}>
              <div style={styles.footerLogoIcon}>B</div>
              <span style={styles.footerLogoText}>BAQAJ</span>
            </div>

            <div style={styles.footerLinks}>
              <a href="#features" style={styles.footerLink}>
                الميزات
              </a>
              <a href="#about" style={styles.footerLink}>
                من نحن
              </a>
              <a href="#contact" style={styles.footerLink}>
                تواصل معنا
              </a>
              <a href="#" style={styles.footerLink}>
                الخصوصية
              </a>
              <a href="#" style={styles.footerLink}>
                الشروط
              </a>
            </div>

            <div style={styles.footerBottom}>
              <p>&copy; 2025 BAQAJ. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>


        {/* Popup */}
        {showPopup && (
          <div style={styles.popup} onClick={() => setShowPopup(false)}>
            <div style={styles.popupCard} onClick={(e) => e.stopPropagation()}>
              <div style={styles.popupHeader}>
                <button style={styles.closeButton} onClick={() => setShowPopup(false)}>×</button>
                <div style={styles.popupLogoIcon}>B</div>
                <h3 style={styles.popupTitle}>مرحباً بك في BAQAJ</h3>
              </div>

              <div style={styles.popupContent}>
                <div style={styles.tabs}>
                  <button style={{ ...styles.tab, ...(activeTab === "login" ? styles.activeTab : styles.inactiveTab) }} onClick={() => setActiveTab("login")}>تسجيل الدخول</button>
                  <button style={{ ...styles.tab, ...(activeTab === "register" ? styles.activeTab : styles.inactiveTab) }} onClick={() => setActiveTab("register")}>إنشاء حساب</button>
                </div>

                {activeTab === "login" ? (
                  <form onSubmit={handleLogin}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>البريد الإلكتروني</label>
                      <input name="email" type="email" style={styles.popupInput} required />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>كلمة المرور</label>
                      <input name="password" type="password" style={styles.popupInput} required />
                    </div>
                    <button type="submit" style={styles.popupButton}>تسجيل الدخول</button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} style={{ ...styles.form, overflowY: "scroll", height: "300px" }}>
                    <input name="name" type="text" placeholder="الاسم الكامل" style={styles.popupInput} required />
                    <input name="email" type="email" placeholder="البريد الإلكتروني" style={styles.popupInput} required />
                    <input name="password" type="password" placeholder="كلمة المرور" style={styles.popupInput} required />
                    <input name="birthdate" type="date" style={styles.popupInput} />
                    <input name="phone" type="tel" placeholder="رقم الهاتف" style={styles.popupInput} />
                    <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.popupInput}>
                      <option value="">اختر الدور</option>
                      <option value="consumer">مستهلك</option>
                      <option value="provider">مزود خدمة</option>
                    </select>
                    {role === "provider" && (
                      <select value={providerType} onChange={(e) => setProviderType(e.target.value)} style={styles.popupInput}>
                        <option value="">اختر نوع المزود</option>
                        <option value="merchant">تاجر</option>
                        <option value="craftsman">حرفي</option>
                        <option value="services">خدمات</option>
                      </select>
                    )}
                    <button type="submit" style={styles.popupButton}>إنشاء حساب</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default LandingPage
