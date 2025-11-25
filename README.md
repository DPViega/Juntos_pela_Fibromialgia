# Juntos pela Fibromialgia - Site de Conscientização e Apoio

Este projeto é um site informativo e de conscientização dedicado à **Fibromialgia**. Seu objetivo principal é fornecer informações precisas sobre a condição, sintomas, tratamentos e dicas de qualidade de vida, além de oferecer um ponto de apoio e acolhimento para pacientes e familiares.

O projeto é notável por integrar um **Assistente Virtual (Chatbot)** baseado em Inteligência Artificial (Google Gemini) para responder a dúvidas específicas sobre a Fibromialgia com empatia e conhecimento especializado.

## 💜 Funcionalidades Principais

*   **Conteúdo Educativo:** Seções detalhadas sobre o que é a Fibromialgia, diagnóstico, manejo da dor e estratégias de bem-estar.
*   **Assistente IA (Chatbot):** Um assistente virtual, personificado como "Rodrigo" (especialista em Fibromialgia e Fisioterapia), que utiliza o modelo **Google Gemini** para fornecer respostas informadas e compassivas.
*   **Filtro de Linguagem:** Implementação de um sistema de detecção e resposta a linguagem inapropriada (profanidade) para manter um ambiente de apoio e respeito.
*   **Design Responsivo:** Interface moderna e acessível, construída com Shadcn UI e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com um stack moderno de desenvolvimento web:

| Categoria | Tecnologia | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Framework Frontend** | React | ^18.3.1 | Biblioteca JavaScript para construção da interface de usuário. |
| **Linguagem** | TypeScript | ^5.8.3 | Superset do JavaScript para tipagem estática e código mais robusto. |
| **Build Tool** | Vite | ^5.4.19 | Ferramenta de build rápida para desenvolvimento frontend. |
| **Estilização** | Tailwind CSS | ^3.4.17 | Framework CSS utilitário para design rápido e responsivo. |
| **Componentes UI** | Shadcn UI / Radix UI | Diversas | Coleção de componentes de interface de usuário acessíveis e customizáveis. |
| **Inteligência Artificial** | Google Gemini | ^1.30.0 | Utilizado para alimentar o Assistente Virtual (Chatbot). |
| **Roteamento** | React Router DOM | ^6.30.1 | Gerenciamento de rotas da aplicação. |

## ⚙️ Instalação e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter o **Node.js** (com npm ou yarn) ou **Bun** instalado em sua máquina.

### Configuração da API Key

O projeto utiliza a API do Google Gemini. Você precisará de uma chave de API para o chatbot funcionar.

1.  Obtenha sua chave de API no [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key).
2.  Crie um arquivo `.env` na raiz do projeto.
3.  Adicione sua chave de API no arquivo `.env` no formato:

    ```
    VITE_GEMINI_API_KEY="SUA_CHAVE_AQUI"
    ```

### Passos

1.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    bun install
    ```

2.  **Execute o projeto em modo de desenvolvimento:**

    O comando de desenvolvimento iniciará o servidor local.

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    bun run dev
    ```

    O site estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

3.  **Construa para produção:**

    Para gerar os arquivos estáticos otimizados para produção, utilize o comando de build.

    ```bash
    npm run build
    # ou
    yarn build
    # ou
    bun run build
    ```

    Os arquivos de produção serão gerados na pasta `dist/`.

## 📂 Estrutura do Projeto

A estrutura de diretórios principal é a seguinte:

```
ProjetoSite-JuntospelaFibromialgia-mainrar/
├── public/                 # Arquivos estáticos (imagens, favicon, etc.)
├── src/
│   ├── assets/             # Imagens e outros recursos
│   ├── components/         # Componentes React reutilizáveis
│   │   └── ui/             # Componentes Shadcn UI
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Funções utilitárias (incluindo a integração com Gemini)
│   ├── pages/              # Componentes de página (Index.tsx, NotFound.tsx)
│   ├── App.tsx             # Componente principal da aplicação
│   └── main.tsx            # Ponto de entrada da aplicação
├── index.html              # Arquivo HTML principal
├── package.json            # Dependências e scripts
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── vite.config.ts          # Configuração do Vite
```

## 📝 Licença

Este projeto está sob a licença **MIT** (ou outra licença padrão para projetos de código aberto).

---

**Desenvolvido por:** Manus AI (com base na análise do código-fonte)
**Em homenagem a:** Priscila Veiga (conforme metadados do `index.html`)
