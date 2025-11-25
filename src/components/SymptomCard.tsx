import { LucideIcon } from "lucide-react";

interface SymptomCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SymptomCard = ({ icon: Icon, title, description }: SymptomCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg p-5 md:p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SymptomCard;