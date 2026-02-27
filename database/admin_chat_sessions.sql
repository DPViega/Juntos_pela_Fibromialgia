-- d:\Projetos\Juntos_pela_Fibromialgia-main\database\admin_chat_sessions.sql

CREATE TABLE IF NOT EXISTS public.admin_chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.admin_chat_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view their own chat sessions"
    ON public.admin_chat_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat sessions"
    ON public.admin_chat_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions"
    ON public.admin_chat_sessions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat sessions"
    ON public.admin_chat_sessions FOR DELETE
    USING (auth.uid() = user_id);
