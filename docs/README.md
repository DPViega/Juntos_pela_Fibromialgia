# 📖 Documentação do Projeto

Bem-vindo(a) à pasta `docs`! 👋
Aqui guardamos qualquer arquivo essencial para desenvolvedores, parceiros e contribuidores que queiram entender os ecossistemas, ferramentas ou regras do site "Juntos pela Fibromialgia".

**O que você vai encontrar aqui?**

1. **`EMAILS_SUPABASE.md`**: 
   - Contém os **Templates HTML** que enviamos nas automações de E-mail (Ex: Nova conta, Reset de senha, Confirmação, Link Mágico). Eles são colados na parte de `Authentication -> Email Templates` no Supabase em Produção.

2. **`linguagens e frameworks.md`**:
   - Um arquivo descritivo contendo referências sobre o que foi utilizado (React, TailwindCSS, etc.) e as escolhas que fizemos.

> **Regra de Ouro (Para Devs Junior):**
> Nunca deixe chaves secretas ou credenciais anotadas em documentação, seja ela PDF, TXT ou MARKDOWN. Todo tipo de credencial ou Token secreto vive APENAS nas variáveis de ambiente! `(Environment Variables)` do Vercel e do seu arquivo `.env` local.
