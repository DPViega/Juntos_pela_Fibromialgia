import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Loader2, Paperclip, FileText, Plus, MessageSquare, ArrowLeft, Menu, PanelLeft, Trash2 } from 'lucide-react';
import { chatWithGemini } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Attachment {
    url: string;
    type: string;
    name: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    attachments?: Attachment[];
}

const SUGGESTIONS = [
    { title: "Ideias para Posts", description: "Me dê 5 ideias de posts para o Instagram sobre fibromialgia." },
    { title: "Análise de Texto", description: "Revise e melhore a escrita de um texto sobre diagnóstico." },
    { title: "Criar Campanha", description: "Me ajude a planejar uma campanha para o Maio Roxo." },
    { title: "Gerar Engajamento", description: "Crie uma chamada para ação para um post informativo." }
];

interface ChatSession {
    id: string;
    title: string;
    created_at: string;
}

export default function AIAssistant() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const initialMessage: Message = {
        id: "init",
        text: "Olá! Como o seu Especialista de Marketing IA, estou pronto para sugerir ideias, analisar textos ou ler PDFs de apoio. Como posso te ajudar hoje?",
        sender: "bot",
        timestamp: new Date(),
    };

    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Multiple files support
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<Attachment[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (user) {
            loadSessions();
        }
    }, [user]);

    const loadSessions = async () => {
        const { data, error } = await supabase
            .from('admin_chat_sessions')
            .select('id, title, created_at')
            .order('updated_at', { ascending: false });

        if (!error && data) {
            setSessions(data);
        }
    };

    const loadSessionMessages = async (id: string) => {
        const { data, error } = await supabase
            .from('admin_chat_sessions')
            .select('messages')
            .eq('id', id)
            .single();

        if (!error && data) {
            const restoredMessages = (data.messages as Message[]).map(m => ({
                ...m,
                timestamp: new Date(m.timestamp)
            }));
            setMessages(restoredMessages);
            setCurrentSessionId(id);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        } else {
            toast.error('Erro ao carregar sessão.');
        }
    };

    const deleteSession = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const { error } = await supabase.from('admin_chat_sessions').delete().eq('id', id);
        if (!error) {
            setSessions(prev => prev.filter(s => s.id !== id));
            if (currentSessionId === id || sessions.length === 1) {
                handleNewChat();
            }
            toast.success("Sessão deletada com sucesso.");
        } else {
            toast.error("Erro ao deletar sessão.");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            let hasLargeFile = false;
            const validFiles = newFiles.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    hasLargeFile = true;
                    return false;
                }
                return true;
            });

            if (hasLargeFile) {
                toast.error("Alguns arquivos excedem o limite de 5MB e não foram adicionados.");
            }

            if (validFiles.length + selectedFiles.length > 5) {
                toast.error("Você pode anexar no máximo 5 arquivos por vez.");
                return;
            }

            const newPreviews = validFiles.map(file => ({
                url: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
                type: file.type,
                name: file.name
            }));

            setSelectedFiles(prev => [...prev, ...validFiles]);
            setFilePreviews(prev => [...prev, ...newPreviews]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setFilePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() && selectedFiles.length === 0) return;

        let filesBase64: string[] = [];
        const localPreviews = [...filePreviews];

        if (selectedFiles.length > 0) {
            try {
                filesBase64 = await Promise.all(selectedFiles.map(file => convertFileToBase64(file)));
            } catch (e) {
                toast.error("Erro ao processar arquivos.");
                return;
            }
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date(),
            attachments: localPreviews.length > 0 ? localPreviews : undefined,
        };

        let currentMessages = [...messages, userMessage];
        setMessages(currentMessages);

        let activeSessionId = currentSessionId;

        // Create new session if this is the first real message
        if (!activeSessionId && currentMessages.length === 2 && currentMessages[0].id === 'init') {
            const generatedTitle = textToSend.substring(0, 30) + (textToSend.length > 30 ? "..." : "");

            const { data, error } = await supabase
                .from('admin_chat_sessions')
                .insert({
                    user_id: user?.id,
                    title: generatedTitle,
                    messages: currentMessages
                })
                .select()
                .single();

            if (data && !error) {
                activeSessionId = data.id;
                setCurrentSessionId(data.id);
                setSessions(prev => [data, ...prev]);
            }
        } else if (activeSessionId) {
            // Update existing session with user message
            await supabase.from('admin_chat_sessions').update({
                messages: currentMessages,
                updated_at: new Date().toISOString()
            }).eq('id', activeSessionId);
        }

        // Clear inputs immediately
        setInput('');
        setSelectedFiles([]);
        setFilePreviews([]);
        setIsLoading(true);

        try {
            const botResponseText = await chatWithGemini(textToSend, true, filesBase64.length > 0 ? filesBase64 : null);
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponseText,
                sender: 'bot',
                timestamp: new Date(),
            };

            currentMessages = [...currentMessages, botResponse];
            setMessages(currentMessages);

            if (activeSessionId) {
                await supabase.from('admin_chat_sessions').update({
                    messages: currentMessages,
                    updated_at: new Date().toISOString()
                }).eq('id', activeSessionId);
            }

        } catch (error) {
            console.error('Erro:', error);
            toast.error('Desculpe, houve um erro ao processar sua pergunta.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleNewChat = () => {
        setMessages([initialMessage]);
        setCurrentSessionId(null);
        setInput('');
        setSelectedFiles([]);
        setFilePreviews([]);
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden font-sans">
            {/* Sidebar (Claude-like) */}
            {sidebarOpen && (
                <div className="w-64 bg-card border-r border-border flex flex-col transition-all duration-300 z-10 hidden md:flex shrink-0">
                    <div className="p-4 flex-1 flex flex-col space-y-4 pt-6">
                        <Button
                            onClick={handleNewChat}
                            className="w-full justify-start gap-3 bg-muted/50 text-foreground hover:bg-muted font-medium transition-colors shadow-sm"
                            variant="outline"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Chat
                        </Button>

                        <div className="flex-1 overflow-y-auto pt-4 space-y-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 pr-1">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">Histórico</h3>

                            {!currentSessionId && messages.length > 1 && (
                                <button className="w-full text-left px-3 py-2 text-sm text-foreground bg-accent/20 hover:bg-accent/40 rounded-lg truncate transition-colors flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                                    <span className="truncate">Sessão Atual não salva</span>
                                </button>
                            )}

                            {sessions.map((session) => (
                                <div key={session.id} className="group relative">
                                    <button
                                        onClick={() => loadSessionMessages(session.id)}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-lg truncate transition-colors flex items-center gap-2 ${currentSessionId === session.id
                                                ? 'bg-accent/30 text-foreground font-medium border border-border/50'
                                                : 'text-muted-foreground hover:bg-accent/20 hover:text-foreground'
                                            }`}
                                    >
                                        <MessageSquare className={`w-4 h-4 shrink-0 ${currentSessionId === session.id ? 'text-primary' : ''}`} />
                                        <span className="truncate block pr-6">{session.title}</span>
                                    </button>
                                    <button
                                        onClick={(e) => deleteSession(e, session.id)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all"
                                        title="Excluir sessão"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}

                            {sessions.length === 0 && messages.length === 1 && (
                                <div className="text-center px-2 py-4 text-xs text-muted-foreground">
                                    Nenhuma conversa anterior
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-border mt-auto">
                        <Button
                            onClick={() => navigate('/admin')}
                            variant="ghost"
                            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao Painel
                        </Button>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {!sidebarOpen && (
                <div className="md:hidden absolute top-4 left-4 z-50">
                    <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)} className="bg-background/80 backdrop-blur shadow-sm">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            )}

            {sidebarOpen && (
                <div className="md:hidden absolute top-4 left-4 z-50">
                    <Button variant="outline" size="icon" onClick={() => setSidebarOpen(false)} className="bg-background/80 backdrop-blur shadow-sm border-0">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            )}

            {/* Mobile sidebar layout when open */}
            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex">
                    <div className="w-64 bg-card border-r border-border flex flex-col shadow-2xl animate-in slide-in-from-left">
                        <div className="p-4 pt-16 flex-1 flex flex-col space-y-4">
                            <Button
                                onClick={() => { handleNewChat(); setSidebarOpen(false); }}
                                className="w-full justify-start gap-3"
                                variant="outline"
                            >
                                <Plus className="w-4 h-4" />
                                Novo Chat
                            </Button>

                            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin pr-1">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Histórico</h3>

                                {!currentSessionId && messages.length > 1 && (
                                    <button className="w-full text-left px-3 py-2 text-sm text-foreground bg-accent/20 hover:bg-accent/40 rounded-lg truncate flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                                        <span className="truncate">Sessão Atual</span>
                                    </button>
                                )}

                                {sessions.map((session) => (
                                    <div key={session.id} className="relative group">
                                        <button
                                            onClick={() => loadSessionMessages(session.id)}
                                            className={`w-full text-left px-3 py-2.5 text-sm rounded-lg truncate flex items-center gap-2 ${currentSessionId === session.id
                                                    ? 'bg-accent/30 text-foreground font-medium'
                                                    : 'text-muted-foreground hover:bg-accent/10'
                                                }`}
                                        >
                                            <MessageSquare className={`w-4 h-4 shrink-0 ${currentSessionId === session.id ? 'text-primary' : ''}`} />
                                            <span className="truncate block pr-6">{session.title}</span>
                                        </button>
                                        <button
                                            onClick={(e) => deleteSession(e, session.id)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {sessions.length === 0 && messages.length === 1 && (
                                    <div className="text-center px-2 py-4 text-xs text-muted-foreground">
                                        Nenhuma conversa
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t border-border">
                            <Button
                                onClick={() => navigate('/admin')}
                                variant="ghost"
                                className="w-full justify-start gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar ao Painel
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/20" onClick={() => setSidebarOpen(false)}></div>
                </div>
            )}


            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-background relative h-full w-full">

                {/* Desktop Toggle Button */}
                <div className="absolute top-4 left-4 z-20 hidden md:flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-muted-foreground/60 hover:text-foreground hover:bg-muted w-9 h-9 transition-colors"
                        title={sidebarOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        <PanelLeft className="w-5 h-5" />
                    </Button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-10 pt-16 md:pt-6 scrollbar-thin scrollbar-thumb-muted-foreground/20">

                    {messages.length === 1 && messages[0].id === 'init' ? (
                        <div className="h-full flex flex-col items-center justify-center animate-fade-in-up mt-8 md:mt-0">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Sparkles className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2 text-foreground">Como posso te ajudar hoje?</h2>
                            <p className="text-muted-foreground mb-8 text-center max-w-sm">
                                Especialista em Marketing focado no Portal Juntos pela Fibromialgia.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                                {SUGGESTIONS.map((sug, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(sug.description)}
                                        className="p-4 border border-border/50 bg-card rounded-xl hover:bg-muted/50 transition-colors text-left flex flex-col gap-1 group shadow-sm hover:shadow-md cursor-pointer"
                                    >
                                        <span className="font-semibold text-sm text-foreground flex items-center justify-between">
                                            {sug.title}
                                            <Send className="w-3 h-3 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </span>
                                        <span className="text-xs text-muted-foreground leading-relaxed">{sug.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-3xl mx-auto py-6">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-4 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-sm ${message.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                            }`}>
                                            {message.sender === 'user' ? (
                                                <span className="text-xs font-semibold">U</span>
                                            ) : (
                                                <Sparkles className="w-4 h-4" />
                                            )}
                                        </div>

                                        {/* Content Bubble */}
                                        <div className={`flex flex-col gap-2 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-2xl ${message.sender === 'user'
                                                ? 'bg-muted/50 text-foreground rounded-tr-sm'
                                                : 'text-foreground'
                                                }`}>
                                                {message.attachments && message.attachments.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap gap-2">
                                                        {message.attachments.map((file, idx) => (
                                                            <div key={idx} className="relative rounded-lg overflow-hidden border border-border bg-card shadow-sm">
                                                                {file.type.startsWith('image/') ? (
                                                                    <img src={file.url} alt="Anexo" className="w-48 h-auto object-cover" />
                                                                ) : (
                                                                    <div className="flex items-center gap-2 p-3 bg-muted/30">
                                                                        <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                                                                        <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {message.text && (
                                                    <div className="text-[15px] whitespace-pre-wrap leading-relaxed">
                                                        {message.text}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-4 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div className="p-4 flex items-center gap-2 text-muted-foreground">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-sm font-medium animate-pulse">Pensando...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>
                    )}
                </div>

                {/* Input Area (Claude Style) */}
                <div className="p-4 bg-background/80 backdrop-blur shrink-0 max-w-3xl mx-auto w-full border-t md:border-t-0 md:bg-transparent md:backdrop-blur-none">
                    <div className="relative bg-card border border-border/70 rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-primary/40 transition-all">

                        {/* Previews */}
                        {filePreviews.length > 0 && (
                            <div className="px-4 pt-4 pb-2 flex flex-wrap gap-3">
                                {filePreviews.map((preview, index) => (
                                    <div key={index} className="relative rounded-lg overflow-hidden border border-border bg-muted p-1 pr-2 flex items-center gap-2 group shadow-sm">
                                        {preview.type.startsWith('image/') ? (
                                            <div className="w-10 h-10 bg-black/10 rounded overflow-hidden">
                                                <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                        )}
                                        <p className="text-xs truncate max-w-[100px] font-medium" title={preview.name}>{preview.name}</p>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="absolute -top-1.5 -right-1.5 bg-background border border-border text-foreground p-0.5 rounded-full hover:bg-destructive hover:text-white transition-colors shadow-sm"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-end px-2 py-2">
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted mb-1"
                                onClick={() => fileInputRef.current?.click()}
                                title="Anexar arquivos"
                            >
                                <Paperclip className="w-5 h-5" />
                            </Button>

                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Envie uma mensagem ao Assistente de IA..."
                                className="flex-1 min-h-[44px] max-h-[200px] resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent py-3 px-2 text-[15px] mb-0"
                                rows={1}
                            />

                            <Button
                                onClick={() => handleSendMessage()}
                                disabled={isLoading || (!input.trim() && selectedFiles.length === 0)}
                                size="icon"
                                className={`shrink-0 h-10 w-10 rounded-xl mb-1 ml-1 transition-all ${input.trim() || selectedFiles.length > 0
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                                    : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                    <div className="text-center mt-3 mb-1">
                        <span className="text-[11px] text-muted-foreground opacity-70">A IA pode cometer erros. Considere verificar as informações importantes.</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
