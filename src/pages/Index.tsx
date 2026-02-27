import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import FloatingElements from "@/components/FloatingElements";
import InfoSection from "@/components/InfoSection";
import SymptomCard from "@/components/SymptomCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Brain,
  Heart,
  Activity,
  Moon,
  AlertCircle,
  Sparkles,
  Users,
  BookOpen,
  Stethoscope,
  HandHeart,
  Lightbulb,
  MessageCircle,
  Globe,
  Info,
  FileText,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingElements />
      <Navigation />
      <MobileNav />
      <Header />

      {/* What is Fibromyalgia Section */}
      <InfoSection id="sobre" title="O que é Fibromialgia?" gradient>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A fibromialgia é uma síndrome caracterizada por dor musculoesquelética
              generalizada, acompanhada por fadiga, sono, problemas de memória e humor.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Pesquisadores acreditam que a fibromialgia amplifica as sensações de dor,
              afetando a forma como o cérebro e a medula espinhal processam sinais
              dolorosos e não dolorosos.
            </p>
            <div className="bg-primary/10 p-4 md:p-6 rounded-lg">
              <p className="text-sm md:text-base text-foreground font-medium">
                Aproximadamente 2-4% da população mundial é afetada pela fibromialgia,
                sendo mais comum em mulheres do que em homens.
              </p>
            </div>
          </div>
          <div className="relative order-first md:order-last">
            <div className="aspect-square max-w-xs mx-auto md:max-w-none rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Brain className="w-32 h-32 text-primary animate-pulse-soft" />
            </div>
          </div>
        </div>
      </InfoSection>

      {/* Symptoms Section */}
      <InfoSection id="sintomas" title="Sintomas e Sinais">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <SymptomCard
            icon={Brain}
            title="Névoa Mental"
            description="Dificuldade de concentração, problemas de memória e confusão mental conhecidos como 'fibro fog'."
          />
          <SymptomCard
            icon={Activity}
            title="Dor Generalizada"
            description="Dor constante e difusa que afeta ambos os lados do corpo, acima e abaixo da cintura."
          />
          <SymptomCard
            icon={Moon}
            title="Distúrbios do Sono"
            description="Sono não reparador, insônia e sensação de cansaço mesmo após longas horas de descanso."
          />
          <SymptomCard
            icon={Heart}
            title="Fadiga Extrema"
            description="Cansaço profundo que não melhora com repouso e interfere nas atividades diárias."
          />
          <SymptomCard
            icon={AlertCircle}
            title="Sensibilidade"
            description="Maior sensibilidade ao toque, luz, sons e odores, além de mudanças de temperatura."
          />
          <SymptomCard
            icon={Sparkles}
            title="Outros Sintomas"
            description="Dores de cabeça, síndrome do intestino irritável, ansiedade e depressão."
          />
        </div>
        <div className="bg-accent/10 p-8 rounded-lg text-center">
          <p className="text-lg text-foreground">
            Os sintomas podem variar em intensidade e frequência, tornando cada experiência única.
          </p>
        </div>
      </InfoSection>

      {/* Living with Fibromyalgia */}
      <InfoSection id="vivendo" title="Vivendo com Fibromialgia" gradient>
        <div className="space-y-6 md:space-y-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Viver com fibromialgia requer adaptações, mas é possível ter qualidade de vida
              com o tratamento e apoio adequados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-card p-6 md:p-8 rounded-lg shadow-card">
              <Stethoscope className="w-8 md:w-10 h-8 md:h-10 text-primary mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">Tratamento Multidisciplinar</h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Acompanhamento médico regular com reumatologista</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fisioterapia e exercícios de baixo impacto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Terapia psicológica para lidar com aspectos emocionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Medicações quando necessário e indicadas</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-lg shadow-card">
              <Lightbulb className="w-8 md:w-10 h-8 md:h-10 text-primary mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">Estratégias de Autocuidado</h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Estabelecer rotina de sono regular e reparadora</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Praticar técnicas de relaxamento e mindfulness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Manter alimentação balanceada e hidratação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Respeitar os limites do corpo e fazer pausas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </InfoSection>

      {/* Support Section */}
      <InfoSection id="apoio" title="Apoio e Comunidade">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 md:p-6">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 md:w-10 h-8 md:h-10 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">Grupos de Apoio</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Conecte-se com outras pessoas que compreendem sua jornada e compartilhe experiências.
            </p>
          </div>

          <div className="text-center p-4 md:p-6">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-8 md:w-10 h-8 md:h-10 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">Família e Amigos</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              O apoio de pessoas queridas é fundamental para enfrentar os desafios diários.
            </p>
          </div>

          <div className="text-center p-4 md:p-6">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 md:w-10 h-8 md:h-10 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">Comunicação Aberta</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Falar sobre suas necessidades e limitações ajuda a criar um ambiente de compreensão.
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
          <p className="text-base md:text-lg text-foreground font-medium">
            "Você não está sozinho(a) nesta jornada. Juntos somos mais fortes."
          </p>
        </div>
      </InfoSection>

      {/* Resources Section */}
      <InfoSection id="recursos" title="Recursos e Informações" gradient>
        {/* Video Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/10 to-primary-light/10 p-1">
            <video
              controls
              className="w-full rounded-lg"
              poster="/fibromialgia-poster.jpg"
            >
              <source src="/fibromialgia-video.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeos.
            </video>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Fibromialgia: A Dor Invisível - Entenda mais sobre essa condição
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-card p-5 md:p-6 rounded-lg shadow-card relative group hover:shadow-lg transition-all border border-transparent hover:border-primary/20">
            <div className="absolute top-4 right-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
              <BookOpen className="w-12 h-12" />
            </div>
            <BookOpen className="w-7 md:w-8 h-7 md:h-8 text-primary mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">Material Educativo</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Acesse informações confiáveis sobre fibromialgia, tratamentos e pesquisas recentes.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground mb-4">
              <li>• Guias sobre manejo da dor</li>
              <li>• Técnicas de relaxamento</li>
              <li>• Dicas de exercícios adaptados</li>
              <li>• Informações nutricionais</li>
            </ul>
          </div>

          <div className="bg-card p-5 md:p-6 rounded-lg shadow-card relative group hover:shadow-lg transition-all border border-transparent hover:border-primary/20">
            <div className="absolute top-4 right-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
              <Heart className="w-12 h-12" />
            </div>
            <Heart className="w-7 md:w-8 h-7 md:h-8 text-primary mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">Dicas de Bem-estar</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Estratégias práticas para melhorar sua qualidade de vida no dia a dia.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground mb-4">
              <li>• Técnicas de conservação de energia</li>
              <li>• Adaptações no ambiente</li>
              <li>• Rotinas de autocuidado</li>
              <li>• Mindfulness e meditação</li>
            </ul>
          </div>

          <Link to="/blog" className="block">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-5 md:p-6 rounded-lg shadow-card h-full border-2 border-primary/20 hover:border-primary transition-all hover:scale-105 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                Área de Membros
              </div>
              <FileText className="w-7 md:w-8 h-7 md:h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                Blog Exclusivo
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Artigos especiais, histórias de superação e conteúdo aprofundado para nossa comunidade.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                Acessar Agora <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Links Section */}
        <div className="mt-8 md:mt-10">
          <h3 className="text-lg md:text-xl font-semibold text-center mb-6 text-foreground">
            Links Úteis
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <a
              href="https://www.sbr.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-primary/20 to-primary-light/20 hover:from-primary/30 hover:to-primary-light/30 p-4 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/30 group-hover:bg-primary/40 flex items-center justify-center transition-colors">
                  <BookOpen className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">SBR</h4>
                  <p className="text-xs text-muted-foreground">Sociedade Brasileira de Reumatologia</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.niams.nih.gov/health-topics/fibromyalgia"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-accent/30 to-primary/20 hover:from-accent/40 hover:to-primary/30 p-4 rounded-lg border border-accent/40 hover:border-accent/60 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/40 group-hover:bg-accent/50 flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">NIAMS</h4>
                  <p className="text-xs text-muted-foreground">Instituto Nacional de Artrite dos EUA</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.abrafibro.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-primary-light/25 to-accent/25 hover:from-primary-light/35 hover:to-accent/35 p-4 rounded-lg border border-primary-light/40 hover:border-primary-light/60 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-light/40 group-hover:bg-primary-light/50 flex items-center justify-center transition-colors">
                  <Users className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">ABRAFIBRO</h4>
                  <p className="text-xs text-muted-foreground">Associação Brasileira de Fibromiálgicos</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.fmaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-primary/20 to-primary-dark/20 hover:from-primary/30 hover:to-primary-dark/30 p-4 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/30 group-hover:bg-primary/40 flex items-center justify-center transition-colors">
                  <Heart className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">NFA</h4>
                  <p className="text-xs text-muted-foreground">National Fibromyalgia Association</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.arthritis.org/diseases/fibromyalgia"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-accent/30 to-primary-light/30 hover:from-accent/40 hover:to-primary-light/40 p-4 rounded-lg border border-accent/40 hover:border-accent/60 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/40 group-hover:bg-accent/50 flex items-center justify-center transition-colors">
                  <Info className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">Arthritis Foundation</h4>
                  <p className="text-xs text-muted-foreground">Fundação de Artrite</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.who.int/news-room/fact-sheets/detail/musculoskeletal-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-primary-light/25 to-primary/25 hover:from-primary-light/35 hover:to-primary/35 p-4 rounded-lg border border-primary-light/40 hover:border-primary-light/60 transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-light/40 group-hover:bg-primary-light/50 flex items-center justify-center transition-colors">
                  <FileText className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">OMS</h4>
                  <p className="text-xs text-muted-foreground">Organização Mundial da Saúde</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
            A educação é uma ferramenta poderosa no manejo da fibromialgia.
          </p>
          <p className="text-sm md:text-base text-foreground font-medium">
            Mantenha-se informado(a) e empoderado(a) em sua jornada de saúde.
          </p>
        </div>
      </InfoSection>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;