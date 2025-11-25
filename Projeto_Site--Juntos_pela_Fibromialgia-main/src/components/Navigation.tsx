import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "sobre", label: "O que é?" },
    { id: "sintomas", label: "Sintomas" },
    { id: "vivendo", label: "Vivendo com Fibromialgia" },
    { id: "apoio", label: "Apoio" },
    { id: "recursos", label: "Recursos" },
  ];

  return (
    <nav
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-foreground hover:bg-primary/10 hover:text-primary"
                    : "text-background/90 hover:text-background hover:bg-background/20"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;