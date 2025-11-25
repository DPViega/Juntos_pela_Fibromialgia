import { Heart } from "lucide-react";
import FibromyalgiaRibbon from "./FibromyalgiaRibbon";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30 py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Dedication */}
          <div className="mb-6 md:mb-8 p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-lg shadow-soft max-w-3xl">
            <Heart className="w-6 md:w-8 h-6 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
            <p className="text-base md:text-lg text-foreground font-medium mb-2">
              Este site foi criado em homenagem à
            </p>
            <p className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-3">
              Priscila Veiga
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              cuja dedicação e amor inspiraram esta iniciativa de conscientização sobre a fibromialgia.
            </p>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-border w-full justify-center">
            <FibromyalgiaRibbon className="w-7 md:w-8 h-9 md:h-10" />
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              © 2024 Fibromialgia Conscientização. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;