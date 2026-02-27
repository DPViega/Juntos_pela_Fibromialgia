-- Este script sincroniza os usuários existentes na tabela de autenticação (auth.users)
-- com a tabela pública de perfis (public.profiles).
-- É útil para usuários que foram criados antes da criação do Gatilho (Trigger).

INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'full_name', 
  'admin' -- Definindo como admin por padrão para essa correção
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
