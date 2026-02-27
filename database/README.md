# 🗄️ Estrutura do Banco de Dados (Supabase)

Bem-vindo(a) à pasta `database`! 👋 
Aqui guardamos todos os "scripts" e configurações essenciais para recriar ou entender o banco de dados do projeto. 

**Para que serve cada arquivo?**

1. **`supabase_setup.sql`**: 
   - O arquivo **principal**. Ele contém todas as `tabelas` (Posts, Profiles, etc), as `Policies` (RLS - Regras de Segurança) e os `Triggers` (robôs automáticos que sincronizam dados). Use ele caso precise recriar todo o banco do zero!

2. **`fix_profiles.sql`**:
   - Um script corretivo. Sempre que a sincronização entre usuários de Autenticação (`auth.users`) e nossa tabela pública falhava, rodávamos esse script para forçar a criação dos perfis faltantes.

3. **`set_admin.sql`**:
   - Permite dar permissão de \`admin\` para um e-mail específico. Isso libera o acesso ao Painel de Controle na plataforma para criar e gerenciar posts.

4. **`update_multimedia.sql`**:
   - Uma atualização feita na tabela de posts antiga para incluir as colunas novas de "Tipo do Post" (Vídeo, Artigo, E-book) e a URL do arquivo para download.

---
### 🔒 Práticas de Segurança
Nunca suba chaves secretas nestes arquivos. Todo acesso e manipulação do banco via Front-end passa pelo Row Level Security (RLS) habilitado nas configurações do Supabase. Para novos membros da equipe, certifiquem-se de configurar suas variáveis de ambiente localmente (veja o `.env.example` na raiz do projeto).
