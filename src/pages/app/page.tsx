"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Home, Wrench, Calendar, Stethoscope, BarChart3, Menu, X, Star, Download, Play, ArrowLeft } from "lucide-react"

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [role, setRole] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Home,
      title: "منتجات متنوعة",
      description: "اكتشف مجموعة واسعة من المنتجات عالية الجودة",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Wrench,
      title: "خدمات احترافية",
      description: "احصل على خدمات احترافية من خبراء متخصصين",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "حجوزات سهلة",
      description: "احجز مواعيدك بسهولة وسرعة",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Stethoscope,
      title: "خدمات طبية",
      description: "استشارات طبية وخدمات صحية موثوقة",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "تحليلات ذكية",
      description: "تتبع وتحليل احتياجاتك بذكاء",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-serif font-bold text-xl text-foreground">BAQAJ</span>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>

          <nav className="hidden md:flex space-x-6 space-x-reverse">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              الميزات
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              من نحن
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              تواصل معنا
            </a>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border animate-fade-in-up">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
                الميزات
              </a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                من نحن
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                تواصل معنا
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-purple-gradient.png')] opacity-10"></div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-white leading-tight">
              مرحباً بك في
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                BAQAJ
              </span>
            </h1>

            <p className="text-xl text-white/90 leading-relaxed">
              تطبيق شامل لكل احتياجاتك في مكان واحد
              <br />
              منتجات • خدمات • حجوزات
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowPopup(true)}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="ml-2 h-5 w-5" />
                انضم إلينا الآن
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm bg-transparent"
              >
                <Play className="ml-2 h-5 w-5" />
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>

          <div className={`relative ${isVisible ? "animate-float" : "opacity-0"}`}>
            <div className="relative mx-auto w-80 h-96 bg-gradient-to-br from-white/20 to-white/5 rounded-[3rem] p-2 backdrop-blur-sm border border-white/20 shadow-2xl">
              <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-07%20%C3%A0%2011.07.44_7f970180.jpg-b2F4RahoDoiVf37m6i22eWmurFK296.jpeg"
                  alt="BAQAJ App Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-80 animate-float"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-400 rounded-full opacity-80 animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">ميزات التطبيق</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              اكتشف كيف يمكن لـ BAQAJ أن يجعل حياتك أسهل من خلال مجموعة شاملة من الخدمات والميزات
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-card border-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="font-serif font-semibold text-xl text-foreground mb-3">{feature.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6">من نحن</h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                نحن فريق BAQAJ، هدفنا تسهيل حياتك من خلال منصة واحدة تجمع بين المنتجات والخدمات والحجوزات. نؤمن بأن
                التكنولوجيا يجب أن تكون في خدمة الإنسان وتجعل حياته أبسط وأكثر راحة.
              </p>

              <div className="flex items-center space-x-4 space-x-reverse mb-8">
                <div className="flex -space-x-2 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">أكثر من 10,000 مستخدم راضٍ</p>
                </div>
              </div>

              <Button className="bg-gradient-primary text-white hover:opacity-90 px-8 py-4 rounded-2xl font-semibold">
                اعرف المزيد عنا
              </Button>
            </div>

            <div className="relative animate-float">
              <div className="bg-gradient-secondary rounded-3xl p-8 text-center text-white">
                <div className="text-4xl font-bold mb-2">+50K</div>
                <div className="text-white/80 mb-6">مستخدم نشط</div>

                <div className="text-3xl font-bold mb-2">+1000</div>
                <div className="text-white/80 mb-6">مزود خدمة</div>

                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-white/80">رضا العملاء</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4 animate-fade-in-up">
              تواصل معنا
            </h2>

            <p className="text-muted-foreground text-lg mb-12 animate-fade-in-up">
              لديك سؤال أو اقتراح؟ نحن هنا للمساعدة
            </p>

            <Card className="bg-gradient-card border-0 shadow-xl animate-scale-in">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      placeholder="اسمك الكامل"
                      className="rounded-xl border-border/50 focus:border-primary bg-background/50"
                    />
                    <Input
                      type="email"
                      placeholder="بريدك الإلكتروني"
                      className="rounded-xl border-border/50 focus:border-primary bg-background/50"
                    />
                  </div>

                  <Textarea
                    placeholder="رسالتك"
                    rows={5}
                    className="rounded-xl border-border/50 focus:border-primary bg-background/50 resize-none"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white hover:opacity-90 py-4 rounded-xl font-semibold text-lg"
                  >
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="font-serif font-bold text-2xl text-foreground">BAQAJ</span>
          </div>

          <p className="text-muted-foreground mb-6">© 2025 BAQAJ. جميع الحقوق محفوظة.</p>

          <div className="flex justify-center space-x-6 space-x-reverse">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              الشروط والأحكام
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              الدعم الفني
            </a>
          </div>
        </div>
      </footer>

      {/* Login/Signup Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <Card className="w-full max-w-md bg-card border-0 shadow-2xl animate-scale-in">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-primary p-6 rounded-t-lg relative">
                <Button
                  onClick={() => setShowPopup(false)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">B</span>
                  </div>
                  <h3 className="text-white font-serif font-bold text-xl">انضم إلى BAQAJ</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Tabs */}
                <div className="flex mb-6 bg-muted rounded-xl p-1">
                  <button
                    className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all ${
                      activeTab === "login"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all ${
                      activeTab === "signup"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* Forms */}
                {activeTab === "login" ? (
                  <form className="space-y-4">
                    <Input type="email" placeholder="البريد الإلكتروني" className="rounded-xl" />
                    <Input type="password" placeholder="كلمة المرور" className="rounded-xl" />
                    <Button className="w-full bg-gradient-primary text-white hover:opacity-90 py-3 rounded-xl font-semibold">
                      تسجيل الدخول
                    </Button>
                  </form>
                ) : (
                  <form className="space-y-4">
                    <Input type="text" placeholder="الاسم الكامل" className="rounded-xl" />
                    <Input type="email" placeholder="البريد الإلكتروني" className="rounded-xl" />
                    <Input type="password" placeholder="كلمة المرور" className="rounded-xl" />
                    <Input type="date" placeholder="تاريخ الميلاد" className="rounded-xl" />
                    <Input type="tel" placeholder="رقم الهاتف" className="rounded-xl" />

                    <select
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">اختر الدور</option>
                      <option value="consumer">مستهلك</option>
                      <option value="provider">مزود خدمة</option>
                    </select>

                    {role === "provider" && (
                      <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground">
                        <option value="">اختر نوع المزود</option>
                        <option value="merchant">تاجر</option>
                        <option value="craftsman">حرفي</option>
                        <option value="services">خدمات</option>
                      </select>
                    )}

                    <Button className="w-full bg-gradient-secondary text-white hover:opacity-90 py-3 rounded-xl font-semibold">
                      إنشاء حساب
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
