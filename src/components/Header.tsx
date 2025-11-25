import { useState, useEffect } from "react";
import FibromyalgiaRibbon from "./FibromyalgiaRibbon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: heroSlide1,
      title: "Juntos pela Conscientização",
      subtitle: "Compreendendo a fibromialgia para um mundo mais empático"
    },
    {
      image: heroSlide2,
      title: "Apoio e Compreensão",
      subtitle: "Cada história importa, cada voz é ouvida"
    },
    {
      image: heroSlide3,
      title: "Esperança e Cuidado",
      subtitle: "Vivendo com qualidade apesar dos desafios"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <header className="relative overflow-hidden">
      {/* Logo Section */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 md:gap-3 bg-background/90 backdrop-blur-sm p-2 md:p-3 rounded-lg">
        <FibromyalgiaRibbon className="w-10 h-12 md:w-12 md:h-14" />
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-foreground">Fibromialgia</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Conscientização e Apoio</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent z-10" />
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/40 to-primary/20"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl animate-fade-in">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-background mb-3 md:mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-background/95 drop-shadow-md px-2">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-background"
                  : "bg-background/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;