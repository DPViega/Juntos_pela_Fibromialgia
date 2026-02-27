import { Request, Response } from 'express';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const adminPrompt = `Você é um Especialista de Marketing e Criação de Conteúdo focado no Portal "Juntos pela Fibromialgia".
Sua missão é dar ideias de posts (artigos, vídeos, cartilhas), analisar arquivos (como PDFs ou imagens) criados para o blog e ajudar o Administrador do site a criar conteúdo altamente engajador, empático e informativo para pessoas com fibromialgia.

REGRAS ESTRITAS:
1. RESPONDA APENAS sobre marketing, criação de conteúdo, engajamento, SEO e temas ligados à Fibromialgia.
2. É ESTRITAMENTE PROIBIDO sair do seu personagem e falar sobre outros assuntos (como matemática, piadas genéricas, programação geral, etc).
3. Se o administrador tentar sair do tema, responda: "Desculpe, meu foco é exclusivo em Marketing e Produção de Conteúdo para o portal 'Juntos pela Fibromialgia'. Como posso ajudar nas nossas publicações hoje? 💜"

- Seja criativo e prático. Sugira estruturas ágeis.
- Sugira ganchos e títulos atrativos.
- Mantenha um tom profissional, acolhedor e inspirador. As respostas podem ter tamanho médio.`;

export const handleAdminChat = async (req: Request, res: Response) => {
    try {
        const { message, files } = req.body;

        if (!message && (!files || files.length === 0)) {
            return res.status(400).json({ error: 'Mensagem vazia' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const parts: Part[] = [
            {
                text: `${adminPrompt}\n\nPergunta do usuário: ${message || "[O usuário enviou arquivos sem anexar texto]"}`,
            },
        ];

        if (files && Array.isArray(files)) {
            for (const fileBase64 of files) {
                try {
                    const mimeType = fileBase64.substring(fileBase64.indexOf(":") + 1, fileBase64.indexOf(";"));
                    const base64Data = fileBase64.substring(fileBase64.indexOf(",") + 1);
                    parts.push({
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    });
                } catch (e) {
                    console.error("Erro ao fazer parse do arquivo base64:", e);
                }
            }
        }

        const response = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: parts,
                },
            ],
        });

        const responseText = response.response.text() || "Desculpe, não consegui processar sua pergunta.";
        res.json({ text: responseText });
    } catch (error) {
        console.error("Erro ao chamar Gemini (Admin):", error);
        res.status(500).json({ error: "Erro ao comunicar com o assistente IA" });
    }
};
