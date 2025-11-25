import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
});

const systemPrompt = `Você é um assistente virtual amigável e informativo sobre Fibromialgia. 
Você fornece informações precisas, empáticas e úteis sobre:
- O que é fibromialgia
- Sintomas comuns
- Tratamentos e manejo da dor
- Como viver melhor com fibromialgia
- Dicas de bem-estar
- Apoio emocional

Sempre mantenha um tom compassivo e respeitoso. Se uma pergunta estiver fora do escopo, redirecione gentilmente para tópicos relacionados à fibromialgia.
Responda sempre em português.`;

export async function chatWithGemini(message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\nPergunta do usuário: ${message}`,
            },
          ],
        },
      ],
    });

    return response.text || "Desculpe, não consegui processar sua pergunta.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    throw new Error("Erro ao comunicar com o assistente IA");
  }
}
