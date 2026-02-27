-- 1. Adicionando novas colunas na tabela de posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS post_type text DEFAULT 'article'; -- 'article', 'video', ou 'ebook'
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS file_url text; -- Para salvar o link do PDF/Ebook enviado
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS video_url text; -- Para salvar o link do vídeo do YouTube/Vimeo

-- 2. Criando o "Bucket" (Gaveta Pública) para guardar os arquivos PDF e Imagens de Capa
-- Se der erro de "already exists", ignore o passo 2. O importante são as colunas acima.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Liberando as portas da "Gaveta" (Políticas de Segurança do Bucket)

-- Todo mundo pode baixar coisas da gaveta pública
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'blog-media' );

-- Admins logados podem fazer upload de novos arquivos
CREATE POLICY "Admin Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'blog-media' 
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
);

-- Admins logados podem apagar os arquivos (se errarem)
CREATE POLICY "Admin Deletes" 
ON storage.objects FOR DELETE 
USING (
    bucket_id = 'blog-media' 
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
);
