-- 1. Tabela de Perfis (Profiles)
-- Esta tabela armazena dados públicos dos usuários (nome, avatar, cargo).
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  email text,
  full_name text,
  avatar_url text,
  role text default 'member' -- 'admin' ou 'member'
);

-- 2. Tabela de Posts (Blog)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null unique,
  content text, 
  excerpt text,
  featured_image text,
  published boolean default false,
  user_id uuid references auth.users default auth.uid()
);

-- 3. Ativar Segurança (RLS - Row Level Security)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- 4. Funções e Triggers (Automação)
-- Esta função cria automaticamente um perfil quando um usuário se cadastra
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'member');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que dispara após cada cadastro
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Políticas de Segurança (Policies)

-- -- POSTS --
-- Qualquer um vê posts publicados
create policy "Public posts are viewable by everyone"
  on public.posts for select
  using ( published = true );

-- Usuários veem seus próprios posts (rascunhos)
create policy "Users can see their own posts"
  on public.posts for select
  using ( auth.uid() = user_id );

-- Apenas admins ou donos podem gerenciar posts (Insert/Update/Delete)
create policy "Users can manage their own posts"
  on public.posts for all
  using ( auth.uid() = user_id );

-- -- PROFILES --
-- Perfis são visíveis por todos (para mostrar autor do post)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

-- Usuário só pode atualizar seu próprio perfil
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );
