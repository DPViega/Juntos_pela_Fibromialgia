# Diário de Bordo: O Início do Nosso Blog 🚀

Imagine que estamos construindo uma casa (o nosso site). Até agora, nós fizemos a fundação e colocamos a porta com a fechadura!

## O que fizemos hoje?

### 1. A Caixa Mágica (Banco de Dados) 📦
Antes, o nosso site era como um cartaz de papel: bonito, mas não dava para mudar o texto sem ter que desenhar tudo de novo.
Nós instalamos uma "Caixa Mágica" chamada **Supabase**.
*   **Para que serve?** É lá que vamos guardar todos os textos (posts) e fotos do blog.
*   **Como funciona?** Quando você escrever algo novo, o site guarda na caixa. Quando alguém visitar o site, o site pega da caixa e mostra na tela.

### 2. A Chave da Casa (Autenticação) 🔑
Não queremos que qualquer estranho entre na nossa casa e mude os móveis de lugar, certo?
Por isso criamos a **Página de Login**.
*   **O que é?** Aquela tela onde coloca e-mail e senha.
*   **Segurança:** Se você tentar entrar na sala de controle (`/admin`) sem a chave, um "guardinha" (nosso código) te barra e manda você fazer login primeiro.

### 3. A Sala de Controle (Painel Admin) 🕹️
Criamos um espaço especial só para você.
*   **Como é?** Tem um menu lateral e vai ter os botões para "Criar Post Novo".
*   **Por enquanto:** Ela ainda está meio vazia, mas já está protegida. Só quem tem a chave entra!

## Resumo da Obra 👷‍♂️
- [x] Conectamos os fios (Instalamos o Supabase).
- [x] Fizemos a fechadura (Login funciona).
- [x] Levantamos as paredes da sala secreta (Layout do Admin).

**Próximo Passo:** Vamos colocar os móveis na sala de controle (criar o formulário para escrever os textos)!

### 4. A Mobília Chegou! (Atualização Final) 🪑
Deixamos a casa habitável e bonita!
*   **Logout (Sair):** Agora ninguém fica "preso" dentro de casa. Criamos botões de Sair tanto no computador quanto no celular.
*   **Redecoração:** O painel administrativo estava muito "hospitalar" (tudo branco). Demos um banho de loja nele, agora está moderno, com efeito de vidro e funciona no escuro (Dark Mode) sem piscar luz na cara de ninguém!
*   **Escrevendo Cartas:** A funcionalidade de "Novo Post" está ativa! Você já pode escrever seus textos, colocar título e eles vão direto para o banco de dados.
*   **Manual de Instruções:** Te entreguei o "mapa" completo do banco de dados (o código SQL) que cria automaticamente perfis para novos membros.

A casa está pronta para receber visitas! 🏠✨

---

## 📅 2026-02-26 23:36

### Título: Início do Servidor e Padronização de Docs
**Subtitulo:** Configuração de relatórios e documentação de tecnologias.

- O servidor de desenvolvimento foi iniciado.
- Agora o `RELATORIO.md` sempre será atualizado com a data, hora, título e subtítulo de todas as mudanças que fizermos no projeto!
- Criamos e vamos manter atualizado o documento `linguagens e frameworks.md`, para sabermos todo o arsenal que usamos na nossa aplicação.

---

## 📅 2026-02-26 23:53

### Título: Inserção do Feed do Instagram no Blog
**Subtítulo:** Integração com o widget SnapWidget para exibir as postagens mais recentes da rede social.

- Adicionamos um novo widget interativo do Instagram na página do Blog (`/blog`).
- A seção foi criada no final da lista de itens e exibe de maneira automática o feed ligado ao SnapWidget fornecido, respeitando o estilo da página e carregando perfeitamente.

---

## 📅 2026-02-26 23:56

### Título: Sincronização de Perfis (Admin/Supabase)
**Subtítulo:** Correção de usuários da autenticação sem perfis vinculados.

- Diagnosticado que usuários criados antes da configuração do Banco (Triggers e Functions) acabaram não sendo cadastrados na tabela `profiles`.
- Criado o arquivo `fix_profiles.sql` contendo um comando de injeção direta que escaneia `auth.users` e força a criação de todos os usuários que estão "soltos".
- Definimos exclusivamente o `vivendocomfibro2025@gmail.com` como `admin` oficial, regressando eventuais outras contas para `member`.

---

## 📅 2026-02-27 00:05

### Título: Hotfix de Tela Branca/Preta Pós-Login
**Subtítulo:** Correção de erro crítico de Renderização do React Router na rota de Login.

- Resolvido um *bug* que causava o "crash" completo da tela ao se tentar realizar o Cadastro em razão do redirecionamento `navigate` sendo disparado em meio de renderização do JSX, o que afeta o React 18 e o DOM. A função programática foi alterada para o componente nativo `<Navigate>` garantindo direcionamento liso pro blog.

---

## 📅 2026-02-27 00:09

### Título: Liberação do Painel Admin na Interface
**Subtítulo:** Alteração da regra de visualização dos botões do painel.

- Os componentes visuais da barra de navegação (`Navigation.tsx` e `MobileNav.tsx`) estavam travados com uma regra temporária de checagem. Agora, criamos um sistema de Autenticação Poderoso (`AuthContext.tsx`) que cruza os dados do login em tempo real com a tabela `profiles` da Caixa Mágica. Agora, **somente usuários que realmente têm a patente `role: 'admin'`** no Banco de Dados verão o botão secreto (e não mais checando se o e-mail bate com algum específico). E o melhor: o botão foi universalmente renomeado para exibir "ADMIN". Tudo dinâmico e blindado!

---

## 📅 2026-02-27 00:10

### Título: Correção da Cronologia do Diário de Bordo
**Subtítulo:** Reorganização dos registros do arquivo RELATORIO.md.

- Identificado e corrigido um erro de versionamento onde os logs estavam sendo inseridos de forma bagunçada e fora da linha temporal (coisas do dia 27 antes de itens criados no dia 26 e afins). O documento foi devidamente reestruturado para ser fácil de acompanhar num fluxo histórico real.

---

## 📅 2026-02-27 00:20

### Título: Reestruturação do Banco (Postagens Ricas / Multimídia)
**Subtítulo:** Atualização das colunas e Buckets de Arquivos na Supabase.

- Escutando o excelente feedback, preparamos a Caixa Mágica (Supabase) para receber mais do que textos. Criado o script `update_multimedia.sql`, foi feita a injeção nas tabelas das colunas *'post_type'*, *'file_url'*, e *'video_url'*.
- Agora a plataforma oficialmente suportará categorização e links diretos para E-books em PDF e vídeos externos, abrindo portas para uma comunidade de conteúdos muito mais flexível e completa além da base de artigos.

---

## 📅 2026-02-27 00:29

### Título: Sistema Dinâmico de Apresentação Flexível
**Subtítulo:** Cards Inteligentes e Visualização Multimídia no Blog.

- Refizemos por completo o cérebro das páginas voltadas pro público que visita o portal. A página Index do Blog e a exclusivíssima nova `Post.tsx` (que lida perfeitamente com cada link de artigo/vídeo) foram unificadas.
- O Blog agora possui **"Cards Inteligentes"** (`BlogCard.tsx`) capazes de farejar o que o Post contem. É E-book? Símbolo de Livro! Vídeo? Câmera! Além do botão primário mudar o texto para "Acessar Material" ou "Assistir".
- O post detalhado não é mais apenas de texto. Para vídeos, foi embutido um reprodutor super moderno do Youtube no banner superior. E para o E-book (PDFs do banco Storage), adicionado um mega-botão atrativo com ilustrações exclusivas prontas para que as pessoas engajem e consigam clicar, abir e baixar para ver offline com toda a responsividade mobile garantida!

---

## 📅 2026-02-27 12:44

### Título: Reestruturação Organizacional e Autenticação Avançada
**Subtítulo:** Segurança do Banco, Magic Link, Meu Perfil e Assistente de IA.

- **Segurança e Organização (`database` & `docs`)**: Limpeza total da raiz do projeto. Scripts SQL isolados na pasta `database/` com um README instrutivo e manual de e-mails migrado para `docs/`. Criada documentação e avisos sobre a injeção secreta de `.env` que impedia o deploy (variáveis `VITE_` e quebra de tradutores automáticos na Vercel).
- **Magic Link e Login sem Senha**: Criação do Botão "*Entrar com Link Mágico*" diretamente no painel de Log In via OTP. Agora os usuários podem acessar magicamente com o e-mail, de forma blindada contra hackers ou keyloggers.
- **Painel Meu Perfil (`Profile.tsx`)**: Reestruturação do MobileNav e Navbar. O botão "Sair" cede espaço para uma aba "Admin" (se for o dono) e um menu central "*Meu Perfil*". O Hub do perfil permite que Membros alterem livremente sua senha com verificação-dupla e iniciem o fluxo de "Change Email".
- **Chatbot Dupla-Personalidade e Visão Computacional (`AIAssistant.tsx`)**: O robô de suporte "AI Rodrigo" que pairava sobre todo o site obteve uma reformulação para Administradores. Agora, ao clicar no painel Admin, acessamos um Hub em tela-cheia exclusivo "*Assistente de IA*". Ele processa o Input do Gemini Flash com um context Prompt de Especialista em Marketing focado apenas em Fibromialgia. A novidade mais robusta foi a liberação do input `type="file"`, ativando o OCR e a interpretação fotográfica do backend que quebra limites de Base64 de uploads (Express JSON 10mb) para injetar DataInlines na Cloud, permitindo IA revisora de postagens e rascunhos de imagens perfeitamente responsiva.

---

## 📅 2026-02-27 13:08

### Título: Otimização de Arquitetura da IA e Bugfixes
**Subtítulo:** Separação dos scripts de bots e correção de tela branca no roteador.

- **Separação de Preocupações (Bots)**: O arquivo `api/index.ts` que fundia dois modelos de sistema diferentes nas chamadas (suporte vs admin) cresceu e foi refatorado. Agora a inteligência divide-se em módulos injetáveis `api/botAdmin.ts` e `api/botSupport.ts`. O Express agora atua puramente como orquestrador isolando potenciais erros que afetem os servidores.
- **Router Fix (AuthContext)**: Detectado um comportamento de re-renderização assíncrona agressiva durante F5 na página (o usuário momentaneamente caía para \`user=null\` antes da Promisse resolver a role do banco). Corrigido transformando os callbacks do provedor num encadeamento `.then/.finally`, garantindo que um Feedback Visual amigável de Loading rode na tela ANTES de liberar acesso ao restante da estrutura. Isso resolve as piscadas e as telas brancas de `Deadlock` de carregamento!

---

## 📅 2026-02-27 13:14

### Título: Hub de IA Multi-Arquivos com OCR
**Subtítulo:** Upgrade corporativo no envio de mensagens do Bot Administrativo

- **Leitura em Lote e OCR de Documentos**: O Formulário do Chatbot Admin (`AIAssistant`) e sua ponte (`gemini.ts` e `botAdmin.ts`) foram inteiramente re-escritos para que agora aceitem envios em Array de múltiplos arquivos (até 5 simultâneos e de 5mb limit total Express JSON).
- **Interface Visual Extra-Responsiva**: O suporte original à imagens foi explodido, abraçando oficialmente também arquivos `application/pdf`. Os arquivos recebem Preview visual em forma de "Thumb" antes do envio na Input (exibindo se a thumbnail é uma fotinha ou um documento SVG renderizando seu Título truncado ao lado) dando feedback imediato ao redator, e dentro das bolhas de chat os anexos múltiplos são agrupados em grides perfeitos para uma UI impressionante.

---

## 📅 2026-02-27 13:30

### Título: Re-Design Total do Assistente e Bugfix de Tema Escuro
**Subtítulo:** Correção do Flash Branco (FOUC) nas rotas protegidas e adoção de painéis inspirados no Claude.AI.

- **Prevenção Rápida de Flash Branco (FOUC)**: Ao atualizar a página nas rotas de Admin (ou qualquer outra rota), havia um *delay* incômodo da tela branca antes do `next-themes` e react perceberem que o usuário tinha a preferência Dark no `localStorage`. Aplicado um script *inline* não-bloqueante *vanilla* direto na tag `<head>` dentro de `index.html`. Agora o site carrega 100% no modo escuro na primeira renderização, acabando com as "piscadas" incômodas nos olhos.
- **Botões e Menu Inspirados no Claude.ai (`AIAssistant.tsx`)**: Refatoramos o estilo de renderização do assistente IA para romper a "caixinha de chat tradicional". Agora, assim como no popular Claude, os administradores usam uma interface Web Application autêntica, em fullscreen real, acoplada a:
  - Uma nova Barra Lateral (Sidebar) enxuta contendo os controles (+ Novo Chat, Voltar pro Admin) no canto esquerdo.
  - Tela principal imersiva que exibe 4 Cards de *Sugestões Predefinidas* no centro para acelerar prompts, substituindo a mensagem de boas vindas inicial vazia de bot.
  - Redesign do Input Form com melhorias consideráveis no espaçamento de prévias e de envio do clip de arquivo para a nova estética profissional e robusta.

---

## 📅 2026-02-27 18:30

### Título: CRUD Completo e Sistema de Camadas Inteligentes (RBAC)
**Subtítulo:** Edição de publicações dinâmicas, upload de capas no Supabase e blindagem de segurança para administradores.

- **Edição Dinâmica (EditPost.tsx)**: Para agilizar as manutenções dos posts pelo blog, concluímos o ciclo do CRUD. Criado o componente de Edição, roteado com o botão da Dashboard, ele agora lê dinamicamente do Supabase, reconstrói o formulário inteiro exibindo prévias da foto original (Capa) ou identificando o nome de um anexo E-Book atual. Tudo pode ser alterado e salvo instantaneamente ou devolvido ao status de *Rascunho*.
- **Upload de Thumbnail/Capa Customizado (`CreatePost.tsx` e `EditPost.tsx`)**: Abandonamos as imagens de "rua" genéricas do Unsplash. Agora os painéis contém Inputs independentes para as capas das postagens. A imagem é enviada ativamente (`supabase.storage.from('blog-media').upload`) ao momento do clique. Geramos uma URL Pública que agora imortaliza cada artigo com sua própria capa ilustrativa!
- **Histórico Inteligente do IA (Admin Chat Sessions)**: Implementamos o suporte completo de sessões via Supabase para o chatbot de Administração. As conversas agora são presas e particionadas em um modelo assíncrono mantido em nuvem (`admin_chat_sessions`). A interface conta com carregamento via IDs de sessão, permitindo rever conversas, gerar nomes automáticos de tópicos e até deletar lixos com a facilidade da lixeira direto do painel lateral histórico.
- **Isolamento da Chave de IA e Correção de Rotas (Native Serverless)**: Migramos completamente a lógica de backend Express (`api/index.ts`) para adotar o formato nativo de **Serverless Functions** do próprio Vercel (`api/chat/support.ts` e `api/chat/admin.ts`). Isso corrige os conflitos internos de servidor que quebravam (erro 500 / "FUNCTION_INVOCATION_FAILED") a inicialização e não deixava o robô responder na internet.
- **Atualização do Modelo de IA em Produção**: Ajustamos as APIs para consumirem o mais rápido e poderoso motor atual disponível (`gemini-2.5-flash`), garantindo maior agilidade.

---

## 📅 2026-02-27 18:56

### Título: Sistema Avançado de Perfis (Usernames e Avatares)
**Subtítulo:** Customização visual e proteção de privacidade dos usuários.

- **Proteção de Privacidade (Username)**: Para proteger os e-mails dos usuários de serem vistos publicamente, implementamos o campo `username` (Nome de Usuário) para todas as contas.
- **Identidade Visual (Avatar Upload)**: Criamos a integração de fotos de perfil com o Supabase Storage. O card da página "Minha Conta" agora renderiza a foto (com botão de editar) feita via upload pra nuvem.
- **Navegação Dinâmica (Mobile & Desktop)**: Todos os painéis de topo e laterais (`Navigation.tsx` e `MobileNav.tsx`) foram atualizados para priorizar a foto customizada (`avatar_url`) e o `username` de cada membro. Se a pessoa recém criou a conta, exibe seu e-mail ou ícone padrão de forma inteligente.

---

## 📅 2026-02-27 23:10

### Título: Reestruturação do Layout do Cabeçalho e Navegação
**Subtítulo:** Correção de sobreposição visual na barra de topo.

- **Prevenção de Sobreposição (Header/Nav)**: O logotipo da aplicação, que ficava posicionado sobre o banner de imagens (`Header.tsx`), apresentava sobreposição e conflito visual com os itens de menu na barra de navegação principal em formato monitor (versão Desktop). O código foi reestruturado para que o Logotipo passe a integrar o container da `Navigation.tsx` ordenadamente lado-a-lado com os demais botões quando a tela entrar no _breakpoint_ `lg`. Isto resolveu o problema de tapar a frase "O que é?" das telas de usuários em notebooks/desktops.
- No formato celular e tablet (Mobile), o Logo continuou posicionado em evidência (com transparência e `backdrop-blur`) sobre os slides da página usando a nova classe `lg:hidden`, preservando a já consolidada estética do App.
- **Refinamento do Menu de Usuário**: A pílula arredondada (`pill`) com botões de perfil (Painel Admin, Perfil, Logout) que possuía fundo sólido foi atualizada para um fundo transparente minimalista. Além disso, o layout dos botões adotou um contêiner flexível sem largura fixa e o "Nome de Usuário" passou a ser truncado automaticamente com `ellipsis` limitando-se a 100 pixels. Esta alteração resolve definitivamente qualquer quebra de linha visual que engordasse a barra de navegação principal e impedia a visibilidade de botões laterais (como os do tema claro/escuro).

---

## 📅 2026-03-06 12:20

### Título: Correção da Rota de Perfil e Autenticação Comum
**Subtítulo:** Criação de camada de autenticação para proteger áreas pessoais de membros sem cargos administrativos.

- **Proteção de Rota (AuthenticatedRoute)**: Criada uma nova regra (`AuthenticatedRoute`) que exige exclusivamente que o usuário esteja logado. Isso resolveu o bug onde membros comuns eram tratados como penetras e "chutados" de volta à página inicial quando tentavam acessar seus próprios perfis, devido à configuração acidental da tela "Meu Perfil" dentro de uma zona de proteção exclusiva para cargos de `admin` (`ProtectedRoute`).
- **Página 'Minha Conta' (Profile.tsx)**: Agora todo e qualquer usuário da comunidade que possuir login consegue acessar a área de opções da conta para visualizar foto de avatar, gerenciar a própria imagem, nome de usuário, endereço de e-mail e realizar manutenções de segurança como troca de senhas pelo Painel.
