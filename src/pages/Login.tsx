import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { ArrowRight, Mail, Lock, Loader2, UserPlus, LogIn, User, Sparkles } from "lucide-react";
import FibromyalgiaRibbon from "../components/FibromyalgiaRibbon";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/blog" replace />;
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    toast.error("As senhas não coincidem. Digite novamente!");
                    setLoading(false);
                    return;
                }
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Cadastro realizado! Verifique seu e-mail.");
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Bem-vindo de volta!");
                navigate("/blog");
            }
        } catch (error: any) {
            toast.error(error.message || "Ocorreu um erro.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            toast.error("Por favor, preencha o campo de e-mail acima primeiro para recuperar sua senha.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/login`,
            });
            if (error) throw error;
            toast.success("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
        } catch (error: any) {
            toast.error("Erro ao enviar e-mail: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error("Erro ao fazer login com Google: " + error.message);
        }
    };

    const handleMagicLink = async () => {
        if (!email) {
            toast.error("Por favor, preencha o seu e-mail acima para receber o Link Mágico.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/blog`,
                },
            });
            if (error) throw error;
            toast.success("Link Mágico enviado! Verifique sua caixa de entrada.");
        } catch (error: any) {
            toast.error("Erro ao enviar Link Mágico: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const createTestUsers = async () => {
        const toastId = toast.loading("Criando usuários...");
        try {
            // Tenta criar Admin
            await supabase.auth.signUp({
                email: "admin@fibro.com",
                password: "admin123",
            });

            // Tenta criar Leitor
            await supabase.auth.signUp({
                email: "leitor@fibro.com",
                password: "leitor123",
            });

            toast.dismiss(toastId);
            toast.success("Solicitação de criação enviada! Se o 'Confirm Email' estiver desligado no Supabase, você já pode logar.");
            toast.info("Senhas: admin123 / leitor123", { duration: 10000 });
        } catch (e) {
            toast.error("Erro ao tentar criar. Talvez já existam.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
            {/* Overlay Escuro com tom roxo */}
            <div className="absolute inset-0 bg-indigo-950/70 backdrop-blur-sm" />

            <div className="relative w-full max-w-md p-4 animate-fade-in">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl backdrop-blur-md">

                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-gradient-to-tr from-purple-500 to-indigo-600 p-5 rounded-full mb-4 ring-4 ring-white/10 shadow-xl shadow-purple-500/20 animate-fade-in">
                            <User className="w-12 h-12 text-white drop-shadow-md" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isSignUp ? "Criar Conta" : "Área de Membros"}
                        </h1>
                        <p className="text-indigo-200 text-center text-sm">
                            {isSignUp
                                ? "Junte-se à nossa comunidade de apoio e aprendizado."
                                : "Acesse conteúdos exclusivos e gerencie suas postagens."}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-indigo-100">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-indigo-300" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-indigo-300/50 focus:border-indigo-400 focus:ring-indigo-400/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-indigo-100">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-indigo-300" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-indigo-300/50 focus:border-indigo-400 focus:ring-indigo-400/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="space-y-2 animate-fade-in">
                                <Label htmlFor="confirmPassword" className="text-indigo-100">Confirme sua Senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-indigo-300" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-indigo-300/50 focus:border-indigo-400 focus:ring-indigo-400/20"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required={isSignUp}
                                    />
                                </div>
                            </div>
                        )}

                        {!isSignUp && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="text-xs text-indigo-300 hover:text-white transition-colors hover:underline"
                                >
                                    Esqueceu sua senha?
                                </button>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-6 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : isSignUp ? (
                                <>Cadastrar <UserPlus className="ml-2 h-4 w-4" /></>
                            ) : (
                                <>Entrar <ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-indigo-950/80 px-4 py-0.5 rounded-full text-indigo-200 border border-white/10 shadow-sm backdrop-blur-md">ou</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-indigo-900 hover:bg-gray-100 font-semibold py-6 shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 border border-white/20"
                            disabled={loading}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            Continuar com Google
                        </Button>

                        {!isSignUp && (
                            <Button
                                type="button"
                                onClick={handleMagicLink}
                                className="w-full bg-[#1D1739] text-indigo-200 hover:text-white hover:bg-black/40 font-semibold py-6 shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 border border-indigo-500/30 group"
                                disabled={loading}
                            >
                                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-yellow-300 transition-colors" />
                                Entrar com Link Mágico
                            </Button>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm text-indigo-200 hover:text-white transition-colors flex items-center justify-center mx-auto gap-2 group"
                        >
                            {isSignUp ? (
                                <>Já tem conta? <span className="underline decoration-indigo-400 group-hover:decoration-white underline-offset-4">Fazer Login</span></>
                            ) : (
                                <>Não tem conta? <span className="underline decoration-indigo-400 group-hover:decoration-white underline-offset-4">Cadastre-se gratuitamente</span></>
                            )}
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6 space-y-2">
                    <div>
                        <Button variant="link" className="text-white/40 hover:text-white btn-sm h-auto" onClick={() => navigate("/")}>
                            ← Voltar para a Home
                        </Button>
                    </div>

                    <div>
                        <Button
                            variant="ghost"
                            className="text-white/20 hover:text-yellow-400 text-xs h-auto py-1"
                            onClick={createTestUsers}
                        >
                            ⚡ Criar Usuários de Teste (Admin/Leitor)
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
