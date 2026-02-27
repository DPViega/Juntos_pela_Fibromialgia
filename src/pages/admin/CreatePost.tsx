import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/Admin/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2, FileText, Video, Book } from "lucide-react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState<"article" | "video" | "ebook">("article");
    const [videoUrl, setVideoUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCreate = async (e: React.FormEvent, isPublished: boolean) => {
        e.preventDefault();

        if (!title) {
            toast.error("Preencha o título.");
            return;
        }
        if (postType === "article" && !content) {
            toast.error("Preencha o conteúdo do artigo.");
            return;
        }
        if (postType === "video" && !videoUrl) {
            toast.error("Insira o link do vídeo.");
            return;
        }
        if (postType === "ebook" && !file) {
            toast.error("Selecione um arquivo para o E-book/PDF.");
            return;
        }

        setLoading(true);

        try {
            let finalFileUrl = null;
            let finalCoverUrl = "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop";

            if (coverImage) {
                setUploadingFile(true);
                const coverExt = coverImage.name.split('.').pop();
                const coverName = `cover-${Math.random().toString(36).substring(2, 15)}.${coverExt}`;
                const coverPath = `${user?.id}/${coverName}`;

                const { error: coverUploadError } = await supabase.storage
                    .from('blog-media')
                    .upload(coverPath, coverImage);

                if (coverUploadError) throw coverUploadError;

                const { data: coverUrlData } = supabase.storage
                    .from('blog-media')
                    .getPublicUrl(coverPath);

                finalCoverUrl = coverUrlData.publicUrl;
                setUploadingFile(false);
            }

            if (postType === "ebook" && file) {
                setUploadingFile(true);
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                const filePath = `${user?.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('blog-media')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('blog-media')
                    .getPublicUrl(filePath);

                finalFileUrl = publicUrlData.publicUrl;
                setUploadingFile(false);
            }

            // Simple slug generator
            const slug = title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

            const { error } = await supabase.from("posts").insert([
                {
                    title,
                    content,
                    excerpt,
                    slug: `${slug}-${Date.now()}`, // Ensure uniqueness
                    user_id: user?.id,
                    published: isPublished, // Controlled by which button we press
                    featured_image: finalCoverUrl,
                    post_type: postType,
                    video_url: postType === "video" ? videoUrl : null,
                    file_url: finalFileUrl
                }
            ]);

            if (error) throw error;

            toast.success(isPublished ? "Publicação criada com sucesso!" : "Rascunho salvo com sucesso!");
            navigate("/admin");
        } catch (error) {
            toast.error("Erro ao criar: " + (error as Error).message);
        } finally {
            setLoading(false);
            setUploadingFile(false);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/admin")}
                    className="rounded-full w-10 h-10 p-0 hover:bg-background/20"
                >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Nova Publicação</h1>
                    <p className="text-muted-foreground">Compartilhe artigos, vídeos ou e-books com a comunidade</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">

                        <div className="space-y-3">
                            <Label className="text-lg font-medium">1. O que você quer publicar?</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Button
                                    type="button"
                                    variant={postType === "article" ? "default" : "outline"}
                                    onClick={() => setPostType("article")}
                                    className="flex flex-col h-auto py-6 gap-3 transition-all"
                                >
                                    <FileText className="w-8 h-8" />
                                    <span className="font-semibold">Artigo / Texto</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant={postType === "video" ? "default" : "outline"}
                                    onClick={() => setPostType("video")}
                                    className="flex flex-col h-auto py-6 gap-3 transition-all"
                                >
                                    <Video className="w-8 h-8" />
                                    <span className="font-semibold">Vídeo (Link)</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant={postType === "ebook" ? "default" : "outline"}
                                    onClick={() => setPostType("ebook")}
                                    className="flex flex-col h-auto py-6 gap-3 transition-all"
                                >
                                    <Book className="w-8 h-8" />
                                    <span className="font-semibold">E-book (PDF)</span>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4 pt-4 border-t border-border">
                            <Label htmlFor="title" className="text-lg font-medium">2. Título da Publicação</Label>
                            <Input
                                id="title"
                                placeholder={postType === "article" ? "Ex: Como lidar com a dor nos dias frios..." : postType === "video" ? "Ex: Exercícios de baixo impacto para Fibromialgia" : "Ex: Guia Completo de Nutrição na Fibro"}
                                className="text-lg p-6 bg-muted/10 border-border/50 focus:border-primary/50 transition-all font-semibold"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        {postType === "video" && (
                            <div className="space-y-2 pt-2 animate-fade-in">
                                <Label htmlFor="videoUrl" className="text-lg font-medium">Link do Vídeo (YouTube/Vimeo)</Label>
                                <Input
                                    id="videoUrl"
                                    placeholder="Ex: https://www.youtube.com/watch?v=..."
                                    className="text-base p-4 bg-muted/10 border-border/50 focus:border-primary/50"
                                    value={videoUrl}
                                    onChange={e => setVideoUrl(e.target.value)}
                                />
                            </div>
                        )}

                        {postType === "ebook" && (
                            <div className="space-y-2 pt-2 animate-fade-in">
                                <Label htmlFor="file" className="text-lg font-medium">Arquivo Base (PDF, DOCX)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    className="cursor-pointer bg-muted/10 h-auto py-2 px-3 border-border/50 text-muted-foreground file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    onChange={e => setFile(e.target.files?.[0] || null)}
                                    accept=".pdf,.doc,.docx"
                                />
                                {file && <p className="text-sm text-green-600 font-medium">Arquivo Selecionado: {file.name}</p>}
                            </div>
                        )}

                        <div className="space-y-2 pt-2">
                            <Label htmlFor="content" className="text-lg font-medium">
                                {postType === "article" ? "Conteúdo do Artigo" : "Descrição Completa (Opcional)"}
                            </Label>
                            <div className="relative">
                                <textarea
                                    id="content"
                                    placeholder={postType === "article" ? "Escreva seu artigo detalhado aqui..." : "Forneça detalhes adicionais para quem vai baixar ou assistir..."}
                                    className="flex min-h-[300px] w-full rounded-xl border border-border/50 bg-muted/10 px-4 py-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y font-normal leading-relaxed"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6 sticky top-8">
                        <h3 className="font-semibold text-lg border-b border-border pb-4">Configurações</h3>

                        <div className="space-y-3">
                            <Label htmlFor="excerpt" className="font-semibold text-primary">Resumo (Capa / Apresentação)</Label>
                            <textarea
                                id="excerpt"
                                className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                placeholder={`Apresentação breve para os leitores deste ${postType === 'video' ? 'vídeo' : postType === 'ebook' ? 'E-book' : 'artigo'}...`}
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Esse texto ilustrativo será o "cartão de visitas" vizualizado antes da pessoa entrar na página completa.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-border space-y-3">
                            <Label htmlFor="cover" className="font-semibold text-primary">Imagem de Capa (Thumb)</Label>
                            <Input
                                id="cover"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer bg-muted/10 h-auto py-2 px-3 border-border/50 text-muted-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                onChange={e => setCoverImage(e.target.files?.[0] || null)}
                            />
                            {coverImage ? (
                                <p className="text-xs text-green-600 font-medium truncate">Capa: {coverImage.name}</p>
                            ) : (
                                <p className="text-xs text-muted-foreground">Recomendado enviar imagem horizontal (16:9). Se vazia, usará padrão.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border space-y-3">
                            <Button
                                onClick={(e) => handleCreate(e, true)}
                                disabled={loading || uploadingFile}
                                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20"
                            >
                                {loading || uploadingFile ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" />
                                        {uploadingFile ? "Enviando arquivo..." : "Publicando..."}
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 w-4 h-4" />
                                        Publicar Imediatamente
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={(e) => handleCreate(e, false)}
                                disabled={loading || uploadingFile}
                                variant="outline"
                                className="w-full py-6 rounded-xl border-2 border-dashed border-primary/50 text-foreground hover:bg-muted/50 transition-colors"
                            >
                                Salvar como Rascunho
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
