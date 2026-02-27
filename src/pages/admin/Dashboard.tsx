import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/Admin/AdminLayout";
import { AdminPostItem } from "../../components/Admin/AdminPostItem";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner"; // sonner usage as consistent

interface Post {
  id: string;
  title: string;
  created_at: string;
  published: boolean;
  slug: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, created_at, published, slug")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar posts: " + error.message);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    const { error } = await supabase.from("posts").delete().match({ id });

    if (error) {
      toast.error("Erro ao excluir: " + error.message);
    } else {
      toast.success("Post excluído com sucesso!");
      fetchPosts();
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/posts/edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Visão Geral</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel de controle</p>
        </div>
        <Button
          onClick={() => navigate("/admin/posts/new")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-6"
        >
          + Nova Publicação
        </Button>
      </div>

      <div className="grid gap-6 mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Stat Cards - Enhanced */}
        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /><path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" /></svg>
          </div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total de Posts</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-4xl font-bold text-foreground">{posts.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          </div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Publicados</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-4xl font-bold text-green-500">{posts.filter((p) => p.published).length}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full"></span>
        Seus Artigos
      </h2>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground animate-pulse">Carregando seus conteúdos...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-muted/10 rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center group hover:bg-muted/10 transition-colors">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </div>
          <p className="text-muted-foreground mb-4 text-lg">Nenhum artigo encontrado</p>
          <Button
            onClick={() => navigate("/admin/posts/new")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Escrever primeiro artigo
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <AdminPostItem
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
