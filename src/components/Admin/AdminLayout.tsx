import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutGrid, PlusCircle, ExternalLink, Menu, BotMessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import FibromyalgiaRibbon from '../FibromyalgiaRibbon';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Theme initialization for Admin
    // Theme initialization delegated to next-themes Provider globally

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: "/admin", label: "Visão Geral", icon: LayoutGrid },
        { path: "/admin/posts/new", label: "Nova Publicação", icon: PlusCircle },
        { path: "/admin/ai-assistant", label: "Assistente de IA", icon: BotMessageSquare },
    ];

    return (
        <div className="min-h-screen bg-background font-sans flex text-foreground">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-card border-r border-border shadow-2xl flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-8 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <FibromyalgiaRibbon className="w-8 h-10" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fluxo Admin</h2>
                            <p className="text-xs text-muted-foreground">Portal Fibromialgia</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive(item.path)
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive(item.path) ? "animate-pulse-soft" : ""}`} />
                            <span className="font-medium">{item.label}</span>
                            {isActive(item.path) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                            )}
                        </Link>
                    ))}

                    <div className="pt-6 mt-6 border-t border-border/50">
                        <p className="px-4 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">Atalhos</p>
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
                        >
                            <ExternalLink className="w-5 h-5" />
                            <span className="font-medium">Ver Site</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-6 mt-auto border-t border-border/50 bg-muted/20">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center w-full gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200 hover:shadow-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sair da Conta</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-muted/10 h-screen overflow-hidden">
                {/* Mobile Header trigger */}
                <div className="lg:hidden p-4 border-b border-border bg-card flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FibromyalgiaRibbon className="w-6 h-8" />
                        <span className="font-bold text-foreground">Admin</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-foreground">
                        <Menu />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    <div className="max-w-6xl mx-auto animate-fade-in-up">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
