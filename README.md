# Juntos pela Fibromialgia - Portal de Apoio e Conscientização

Bem-vindo ao **Portal Juntos pela Fibromialgia**. Este projeto evoluiu de um site informativo para um **portal completo** com área de membros, blog e administração de conteúdo, dedicado a fornecer apoio, informação científica e acolhimento para pacientes e familiares convivendo com a Fibromialgia.

O projeto combina tecnologia moderna com empatia, incluindo um **Assistente Virtual com IA** e um **Sistema de Blog** gerenciável.

---

## ✨ Funcionalidades do Portal

### 🧠 Inteligência Artificial & Apoio
*   **Assistente IA (Rodrigo):** Chatbot especialista em Fibromialgia (alimentado pelo **Google Gemini**) para tirar dúvidas 24h.
*   **Filtro de Linguagem:** Ambiente seguro e respeitoso garantido por detecção automática de toxicidade.

### 📰 Blog & Conteúdo Dinâmico
*   **Artigos Educativos:** Seção de blog dedicada a notícias, tratamentos e dicas de bem-estar.
*   **Sistema de Gestão (CMS):** Painel administrativo completo para criar, editar e publicar artigos sem tocar em código.
*   **Área de Membros:** Acesso exclusivo a conteúdos avançados para usuários cadastrados.

### 🔐 Área Administrativa (Novo!)
*   **Painel Moderno:** Dashboard com design responsivo, modo escuro e glassmorphism.
*   **Gestão de Posts:** Editor de texto integrado para publicar novos conteúdos.
*   **Controle de Acesso:** Diferenciação entre Leitores e Administradores.
*   **Autenticação Segura:** Login, Cadastro e Recuperação de senha via e-mail.

---

## �️ Tecnologias Utilizadas

O projeto foi construído com as melhores ferramentas do ecossistema React moderno:

| Categoria | Tecnologia | Função |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Visual rápido e reativo |
| **Linguagem** | TypeScript | Segurança e robustez no código |
| **Estilo** | Tailwind CSS + Shadcn UI | Design bonito, acessível e responsivo |
| **Backend** | **Supabase** | Banco de dados, Autenticação e Armazenamento |
| **IA** | Google Gemini API | Cérebro do Assistente Virtual |
| **Navegação** | React Router | Rotas protegidas e navegação fluida |

---

## 🚀 Como Rodar o Projeto

Siga estes passos para ter o portal rodando na sua máquina:

### 1. Pré-requisitos
*   Node.js instalado.
*   Conta no [Supabase](https://supabase.com) (Gratuita).
*   Chave de API do [Google Gemini](https://ai.google.dev/).

### 2. Configuração do Ambiente (`.env`)
Duplique o arquivo `.env.example` para `.env` e preencha as chaves:

```env
# Google Gemini (Para o Chatbot)
VITE_GEMINI_API_KEY="sua_chave_gemini_aqui"

# Supabase (Para o Blog e Login)
VITE_SUPABASE_URL="sua_url_supabase_aqui"
VITE_SUPABASE_ANON_KEY="sua_chave_anonima_supabase_aqui"
```

### 3. Configuração do Banco de Dados
No painel do Supabase, vá em **SQL Editor** e rode o script contido no arquivo `supabase_setup.sql` deste projeto. Ele irá criar:
*   Tabelas de `posts` e `profiles`.
*   Regras de segurança (RLS).
*   Gatilhos automáticos para novos usuários.

### 4. Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173` (ou porta similar).

---

## 👤 Acesso de Teste (Sugestão)

Se você rodou o script SQL, pode criar usuários para testar:
*   **Admin:** Crie uma conta e altere manualmente sua role para `admin` no banco ou use o fluxo de cadastro padrão.
*   **Leitor:** Basta se cadastrar na tela de login.

---

## 📂 Estrutura de Pastas

*   `src/components`: Blocos visuais do site (Botões, Cards, Navbar).
*   `src/components/Admin`: Componentes exclusivos do Painel (Sidebar, Editor).
*   `src/context`: Gerenciamento de estado (Sessão do Usuário).
*   `src/pages`: Telas do site (Home, Login, Dashboard, Blog).
*   `src/lib`: Configurações de serviços externos (Supabase, Gemini).

---

**Desenvolvido com carinho 💜 pela comunidade.**
*Em homenagem a todas as guerreiras e guerreiros que convivem com a Fibromialgia.*
