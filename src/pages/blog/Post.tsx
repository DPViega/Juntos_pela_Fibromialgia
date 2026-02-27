import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Navigation from "../../components/Navigation";
import MobileNav from "../../components/MobileNav";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Download, FileText, Video, BookOpen, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Post {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    created_at: string;
    featured_image: string;
    post_type: string;
    video_url?: string;
    file_url?: string;
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("slug", slug)
                .eq("published", true)
                .single();

            if (error || !data) {
                console.error("Error fetching post:", error);
                navigate("/blog");
                return;
            }

            setPost(data as Post);
            setLoading(false);
        };

        if (slug) {
            fetchPost();
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse">Carregando conteúdo...</p>
                </div>
            </div>
        );
    }

    if (!post) return null;

    const isVideo = post.post_type === "video";
    const isEbook = post.post_type === "ebook";

    // Helper to get YouTube Embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <MobileNav />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <Button
                            variant="ghost"
                            className="mb-8 hover:bg-primary/10 -ml-4"
                            onClick={() => navigate("/blog")}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Blog
                        </Button>

                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                    {isVideo ? <Video className="w-4 h-4" /> : isEbook ? <BookOpen className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                    {isVideo ? "Vídeo Exclusivo" : isEbook ? "Material de Apoio (E-book)" : "Artigo"}
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {format(new Date(post.created_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 pb-24">
                    <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50">

                        {/* Media Section */}
                        {isVideo && post.video_url && (
                            <div className="w-full aspect-video bg-black/5">
                                <iframe
                                    className="w-full h-full"
                                    src={getYouTubeEmbedUrl(post.video_url) || post.video_url}
                                    title={post.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {(!isVideo || !post.video_url) && post.featured_image && (
                            <div className="w-full h-64 sm:h-80 md:h-[400px] overflow-hidden">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="p-8 md:p-12">
                            {/* E-book Download Action CTA */}
                            {isEbook && post.file_url && (
                                <div className="mb-10 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 opacity-5">
                                        <BookOpen className="w-40 h-40" />
                                    </div>
                                    <div className="relative z-10 text-center sm:text-left flex-1">
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">Material Pronto para Download</h3>
                                        <p className="text-muted-foreground">Clique no botão abaixo para salvar o arquivo PDF em seu dispositivo e ler offline sempre que desejar.</p>
                                    </div>
                                    <Button
                                        className="relative z-10 w-full sm:w-auto shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8 py-6 rounded-xl font-bold text-lg group"
                                        onClick={() => window.open(post.file_url, '_blank')}
                                    >
                                        <Download className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform" />
                                        Baixar PDF Agora
                                    </Button>
                                </div>
                            )}

                            {post.content && (
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-accent font-normal leading-relaxed text-foreground/90">
                                    {post.content.split('\n').map((paragraph, index) => (
                                        paragraph.trim() !== '' && (
                                            <p key={index} className="mb-4">{paragraph}</p>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
