import { useState } from "react";
import { Menu, X } from "lucide-react";
import FibromyalgiaRibbon from "./FibromyalgiaRibbon";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { id: "sobre", label: "O que é?" },
    { id: "sintomas", label: "Sintomas" },
    { id: "vivendo", label: "Vivendo com Fibromialgia" },
    { id: "apoio", label: "Apoio" },
    { id: "recursos", label: "Recursos" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[100] p-3 bg-background/90 backdrop-blur-sm rounded-full shadow-soft lg:hidden"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-background border-l border-border shadow-2xl z-[95] transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <FibromyalgiaRibbon className="w-10 h-12" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Fibromialgia</h2>
              <p className="text-xs text-muted-foreground">Conscientização</p>
            </div>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-border">
            <a
              href="https://www.instagram.com/vivendo_comfibro?igsh=MXQ2cDV1czdoZmV2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-lg text-center font-medium"
            >
              Siga no Instagram
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;