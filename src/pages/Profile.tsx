import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Mail, Lock, User, Loader2, Save, Camera } from "lucide-react";
import Navigation from "../components/Navigation";
import MobileNav from "../components/MobileNav";
import Footer from "../components/Footer";

export default function Profile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState(user?.username || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user?.username) setUsername(user.username);
    }, [user?.username]);

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ email: newEmail });
            if (error) throw error;
            toast.success("Solicitação enviada! Verifique ambos os e-mails (antigo e novo) para confirmar a troca.");
            setNewEmail("");
        } catch (error: any) {
            toast.error("Erro ao atualizar e-mail: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword) return;

        if (newPassword !== confirmPassword) {
            toast.error("As senhas não coincidem. Tente novamente.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            toast.success("Senha atualizada com sucesso!");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            toast.error("Erro ao atualizar senha: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ username })
                .eq('id', user?.id);
            if (error) throw error;

            toast.success("Perfil atualizado! Recarregando...");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error: any) {
            toast.error("Erro ao atualizar perfil: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("A imagem deve ter no máximo 2MB.");
            return;
        }

        const toastId = toast.loading("Enviando foto...");
        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: data.publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            toast.dismiss(toastId);
            toast.success("Foto atualizada com sucesso!");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error: any) {
            toast.dismiss(toastId);
            toast.error("Erro ao atualizar foto (A permissão do bucket foi configurada?): " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <MobileNav />

            <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto">
                    {/* Cabeçalho do Perfil */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-card p-8 rounded-2xl shadow-sm border border-border/50">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-background shadow-md overflow-hidden">
                                {user?.avatar_url ? (
                                    <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-primary" />
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                                title="Mudar Foto"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Minha Conta</h1>
                            {user?.username && (
                                <p className="text-xl font-medium mt-1">{user.username}</p>
                            )}
                            <p className="text-lg text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-2">
                                <Mail className="w-4 h-4" /> {user?.email}
                            </p>
                            <div className="mt-4 inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                                Função: {user?.role === "admin" ? "Administrador" : "Membro"}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Informações do Perfil
                                </CardTitle>
                                <CardDescription>
                                    Como você será visto por outros membros da comunidade.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Nome de Usuário</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Como deseja ser chamado?"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full sm:w-auto mt-2">
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Salvar Perfil
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Troca de E-mail */}
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Mudar E-mail
                                </CardTitle>
                                <CardDescription>
                                    Altere o endereço de e-mail associado à sua conta. Enviaremos links de confirmação.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpdateEmail} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-email">Novo E-mail</Label>
                                        <Input
                                            id="new-email"
                                            type="email"
                                            placeholder="seu.novo@email.com"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Atualizar E-mail
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Troca de Senha */}
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary" />
                                    Mudar Senha
                                </CardTitle>
                                <CardDescription>
                                    Garanta que sua conta esteja segura usando uma senha forte e única.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpdatePassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">Nova Senha</Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirme a Nova Senha</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full sm:w-auto mt-2">
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Atualizar Senha
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
