const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating ribbons */}
      <div className="absolute top-20 left-10 w-16 h-20 opacity-10 animate-float">
        <svg viewBox="0 0 100 120" fill="none">
          <path
            d="M50 10 C30 20, 20 40, 25 60 L25 100 L35 110 L35 70 C35 50, 45 40, 50 30 C55 40, 65 50, 65 70 L65 110 L75 100 L75 60 C80 40, 70 20, 50 10"
            fill="hsl(270, 60%, 70%)"
          />
        </svg>
      </div>
      
      <div className="absolute top-1/3 right-20 w-20 h-24 opacity-10 animate-float" style={{ animationDelay: "1s" }}>
        <svg viewBox="0 0 100 120" fill="none">
          <path
            d="M50 10 C30 20, 20 40, 25 60 L25 100 L35 110 L35 70 C35 50, 45 40, 50 30 C55 40, 65 50, 65 70 L65 110 L75 100 L75 60 C80 40, 70 20, 50 10"
            fill="hsl(280, 65%, 75%)"
          />
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/4 w-12 h-16 opacity-10 animate-float" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 100 120" fill="none">
          <path
            d="M50 10 C30 20, 20 40, 25 60 L25 100 L35 110 L35 70 C35 50, 45 40, 50 30 C55 40, 65 50, 65 70 L65 110 L75 100 L75 60 C80 40, 70 20, 50 10"
            fill="hsl(250, 70%, 85%)"
          />
        </svg>
      </div>

      {/* Floating circles */}
      <div className="absolute top-2/3 right-1/3 w-32 h-32 rounded-full bg-primary/5 animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-accent/5 animate-pulse-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-10 w-40 h-40 rounded-full bg-primary-light/5 animate-pulse-soft" style={{ animationDelay: "1s" }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tl from-accent/10 to-transparent blur-3xl" />
    </div>
  );
};

export default FloatingElements;