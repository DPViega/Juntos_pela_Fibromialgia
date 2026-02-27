import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { LogOut, LayoutGrid, User } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, isRoute: boolean = false) => {
    if (isRoute) {
      navigate(id);
    } else {
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const navItems = [
    { id: "sobre", label: "O que é?" },
    { id: "sintomas", label: "Sintomas" },
    { id: "vivendo", label: "Vivendo com Fibromialgia" },
    { id: "apoio", label: "Apoio" },
    { id: "recursos", label: "Recursos" },
    { id: "/blog", label: "Blog", isRoute: true },
  ];

  // Determine navbar style based on location and scroll
  const isHome = location.pathname === "/";
  // Se não for Home, sempre usa estilo "scrolled" (fundo sólido) para garantir contraste
  const showSolidNav = isScrolled || !isHome;

  return (
    <nav
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showSolidNav
        ? "bg-background/95 backdrop-blur-md shadow-soft py-4 border-b border-border/10"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 flex justify-center items-center relative">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id, item.isRoute)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${showSolidNav
                  ? "text-foreground hover:bg-primary/10 hover:text-primary"
                  : "text-white/90 hover:text-white hover:bg-white/20" // Assuming Home Hero is dark
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* User Controls */}
        <div className="flex items-center gap-2 ml-4">
          {user ? (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${showSolidNav ? "bg-muted/50" : "bg-white/10 backdrop-blur-sm"}`}>
              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="p-1.5 rounded-full transition-all duration-300 bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20 hover:scale-105 group"
                  title="Admin"
                >
                  <User className="w-4 h-4 text-white hover:scale-110 transition-transform duration-300" />
                </button>
              )}
              <div className={`h-4 w-px ${showSolidNav ? "bg-border" : "bg-white/20"}`} />

              <button
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-sm font-medium ${showSolidNav
                  ? "text-foreground hover:bg-primary/10 hover:text-primary"
                  : "text-white hover:bg-white/20"
                  }`}
                title="Meu Perfil"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Perfil" className="w-5 h-5 rounded-full object-cover border border-white/20" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="hidden md:inline">{user.username || "Perfil"}</span>
              </button>

              <div className={`h-4 w-px ${showSolidNav ? "bg-border" : "bg-white/20"}`} />
              <button
                onClick={handleLogout}
                className={`p-1.5 rounded-full transition-colors ${showSolidNav ? "text-red-500 hover:bg-red-50" : "text-white hover:bg-red-500/20"}`}
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`ml-2 px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300 ${showSolidNav
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                }`}
            >
              Entrar
            </button>
          )}
        </div>

        <div className="absolute right-4 scale-75 flex items-center gap-2">
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
};

export default Navigation;