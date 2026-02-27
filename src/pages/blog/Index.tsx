import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { BlogCard } from "../../components/Blog/BlogCard";
import Navigation from "../../components/Navigation";
import MobileNav from "../../components/MobileNav";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
    published: boolean;
    featured_image: string;
    post_type: string;
    file_url: string;
}

export default function BlogIndex() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from("posts")
                .select("*")
                .eq("published", true)
                .order("created_at", { ascending: false });

            setPosts(data || []);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (authLoading) return <div className="h-screen flex items-center justify-center">Carregando...</div>;

    // Proteção da Rota: Se não estiver logado, redireciona para login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <MobileNav />

            <main className="flex-1 container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Blog & Artigos</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Conteúdo exclusivo para nossa comunidade. Explore artigos sobre tratamentos,
                        bem-estar e histórias de superação.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">Carregando artigos...</div>
                ) : posts.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Em breve!</h2>
                        <p className="text-muted-foreground">
                            Estamos preparando conteúdos incríveis para você. Volte logo!
                        </p>
                    </div>
                )}

                {/* Seção do Instagram usando SnapWidget */}
                <div className="mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
                        Siga nosso Instagram
                    </h2>
                    <div className="flex justify-center w-full overflow-hidden">
                        {/* SnapWidget */}
                        <iframe
                            src="https://snapwidget.com/embed/1119029"
                            className="snapwidget-widget max-w-full"
                            allowTransparency={true}
                            frameBorder="0"
                            scrolling="no"
                            style={{ border: 'none', overflow: 'hidden', width: '615px', height: '410px' }}
                            title="Posts from Instagram"
                        ></iframe>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
