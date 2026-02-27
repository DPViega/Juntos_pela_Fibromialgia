import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Video, Book } from "lucide-react";

interface BlogPostProps {
    post: {
        id: string;
        title: string;
        excerpt?: string;
        slug: string;
        created_at: string;
        featured_image?: string;
        post_type?: string;
        file_url?: string;
    };
}

export const BlogCard = ({ post }: BlogPostProps) => {
    const isVideo = post.post_type === "video";
    const isEbook = post.post_type === "ebook";

    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow relative">
            <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary">
                {isVideo ? <Video className="w-5 h-5" /> : isEbook ? <Book className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            {post.featured_image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="text-sm text-gray-500 mb-2">
                    {format(new Date(post.created_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>
                <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </Link>
                </h3>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt || "Descubra mais detalhes através deste material de apoio preparado especialmente para você."}
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full bg-primary/5 hover:bg-primary/20 border-primary/20 text-primary transition-colors font-medium">
                    <Link to={`/blog/${post.slug}`}>
                        {isVideo ? "Assistir Vídeo" : isEbook ? "Acessar Material" : "Ler Artigo Completo"}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
