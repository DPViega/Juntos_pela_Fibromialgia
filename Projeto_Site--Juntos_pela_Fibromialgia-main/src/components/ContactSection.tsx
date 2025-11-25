import { Instagram, Heart } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <Heart className="w-10 md:w-12 h-10 md:h-12 text-primary mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
            Conecte-se Conosco
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Junte-se à nossa comunidade no Instagram para compartilhar experiências, 
            encontrar apoio e espalhar conscientização sobre a fibromialgia.
          </p>
          
          <a
            href="https://www.instagram.com/vivendo_comfibro?igsh=MXQ2cDV1czdoZmV2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-full font-semibold text-base md:text-lg hover:shadow-hover transform hover:scale-105 transition-all duration-300"
          >
            <Instagram className="w-5 md:w-6 h-5 md:h-6" />
            Siga-nos no Instagram
          </a>
          
          <div className="mt-8 md:mt-12 p-5 md:p-6 bg-card rounded-lg shadow-card mx-4 md:mx-0">
            <p className="text-sm md:text-base text-muted-foreground">
              Compartilhe sua história, tire dúvidas e faça parte de uma rede de apoio 
              que compreende seus desafios diários.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;