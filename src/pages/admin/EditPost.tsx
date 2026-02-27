import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../../components/Admin/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2, FileText, Video, Book } from "lucide-react";

export default function EditPost() {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState<"article" | "video" | "ebook">("article");
    const [videoUrl, setVideoUrl] = useState("");

    // Keeping tracks of existing urls
    const [existingCover, setExistingCover] = useState("");
    const [existingFile, setExistingFile] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            setInitialLoading(true);
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                if (data) {
                    setTitle(data.title || "");
                    setExcerpt(data.excerpt || "");
                    setContent(data.content || "");
                    setPostType(data.post_type || "article");
                    setVideoUrl(data.video_url || "");
                    setExistingCover(data.featured_image || "");
                    setExistingFile(data.file_url || "");
                }
            } catch (err) {
                toast.error("Erro ao carregar os dados da publicação: " + (err as Error).message);
                navigate("/admin");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);

    const handleUpdate = async (e: React.FormEvent, isPublished: boolean) => {
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

        setLoading(true);

        try {
            let finalFileUrl = existingFile;
            let finalCoverUrl = existingCover;

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

            const payload = {
                title,
                content,
                excerpt,
                published: isPublished,
                featured_image: finalCoverUrl,
                post_type: postType,
                video_url: postType === "video" ? videoUrl : null,
                file_url: postType === "ebook" ? finalFileUrl : null
            };

            const { error } = await supabase.from("posts").update(payload).match({ id });

            if (error) throw error;

            toast.success("Publicação atualizada com sucesso!");
            navigate("/admin");
        } catch (error) {
            toast.error("Erro ao atualizar: " + (error as Error).message);
        } finally {
            setLoading(false);
            setUploadingFile(false);
        }
    };

    if (initialLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="animate-spin text-primary w-12 h-12" />
                    <span className="ml-4 text-xl font-semibold text-muted-foreground">Carregando Publicação...</span>
                </div>
            </AdminLayout>
        );
    }

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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Editar Publicação</h1>
                    <p className="text-muted-foreground">Faça os ajustes necessários no seu material</p>
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
                                <div className="space-y-2">
                                    {existingFile && !file && (
                                        <div className="p-3 bg-muted/30 rounded-md text-sm truncate text-blue-600 font-medium">
                                            Arquivo Atual: {existingFile.split('/').pop() || 'Baixado'}
                                        </div>
                                    )}
                                    <Input
                                        id="file"
                                        type="file"
                                        className="cursor-pointer bg-muted/10 h-auto py-2 px-3 border-border/50 text-muted-foreground file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                        onChange={e => setFile(e.target.files?.[0] || null)}
                                        accept=".pdf,.doc,.docx"
                                    />
                                    {file && <p className="text-sm text-green-600 font-medium">Novo selecionado: {file.name}</p>}
                                </div>
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
                            {existingCover && !coverImage && (
                                <div className="mb-2">
                                    <img src={existingCover} alt="Capa Atual" className="w-full h-24 object-cover rounded-md opacity-80" />
                                </div>
                            )}
                            <Input
                                id="cover"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer bg-muted/10 h-auto py-2 px-3 border-border/50 text-muted-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                onChange={e => setCoverImage(e.target.files?.[0] || null)}
                            />
                            {coverImage ? (
                                <p className="text-xs text-green-600 font-medium truncate">Nova Capa: {coverImage.name}</p>
                            ) : (
                                <p className="text-xs text-muted-foreground">Envie para substituir a atual.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border space-y-3">
                            <Button
                                onClick={(e) => handleUpdate(e, true)}
                                disabled={loading || uploadingFile}
                                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20"
                            >
                                {loading || uploadingFile ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" />
                                        {uploadingFile ? "Enviando arquivo..." : "Salvar Alterações"}
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 w-4 h-4" />
                                        Salvar como Publicado
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={(e) => handleUpdate(e, false)}
                                disabled={loading || uploadingFile}
                                variant="outline"
                                className="w-full py-6 rounded-xl border-2 border-dashed border-primary/50 text-foreground hover:bg-muted/50 transition-colors"
                            >
                                Reverter para Rascunho
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
