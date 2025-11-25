import { ReactNode } from "react";

interface InfoSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

const InfoSection = ({ id, title, children, className = "", gradient = false }: InfoSectionProps) => {
  return (
    <section
      id={id}
      className={`relative py-12 md:py-20 px-4 ${gradient ? "bg-gradient-to-b from-background to-secondary/20" : ""} ${className}`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
          {title}
        </h2>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;