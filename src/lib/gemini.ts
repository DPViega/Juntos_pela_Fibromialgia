import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
});

const systemPrompt = `Você é especialista em Fibromialgia com 30 anos de experiência.

REGRAS:
1. RESPONDE APENAS sobre Fibromialgia
2. Respostas CURTAS (máximo 2-3 linhas)
3. Fora do tema: "Sou especialista em Fibromialgia! Como posso ajudá-lo? 💜"
4. Não consegue responder: "Visite: https://www.instagram.com/vivendo_comfibro"

TEMAS: Fibromialgia, sintomas, tratamentos, dor, fadiga, sono, exercícios.
IDIOMA: Português do Brasil.`;

const profanityWords = [
  "merdinha", "porra", "droga", "raiva", "ódio", "hate", "droga",
  "que raiva", "que ódio", "que inferno", "maldito", "maldita",
  "inferno", "demônio", "diabo"
];

const heavyProfanityWords = [
  "puta", "filho da puta", "fdp", "desgraça", "desgraçado",
  "seu filho", "vai se foder", "vai tomar no", "merda demais",
  "que se foda", "foda-se"
];

function detectProfanity(text: string): { level: 'none' | 'light' | 'heavy' } {
  const lowerText = text.toLowerCase();
  
  for (const word of heavyProfanityWords) {
    if (lowerText.includes(word)) {
      return { level: 'heavy' };
    }
  }
  
  for (const word of profanityWords) {
    if (lowerText.includes(word)) {
      return { level: 'light' };
    }
  }
  
  return { level: 'none' };
}

function getLightProfanityResponse(): string {
  const responses = [
    "Vamos respirar fundo? Aqui conversamos com amor e respeito. 💜",
    "Parece que você está frustrado... Vamos conversar com educação? 🤗",
    "Aqui valorizamos a gentileza! Vamos recomeçar? 💜",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getHeavyProfanityResponse(): string {
  return `Como Sócrates ensinava, a verdadeira força vem da compaixão e respeito, não das palavras duras. As palavras curam ou ferem. Estaremos aqui quando estiver em paz. 💜`;
}

export async function chatWithGemini(message: string): Promise<string> {
  // Verificar profanidade
  const profanityCheck = detectProfanity(message);
  
  if (profanityCheck.level === 'heavy') {
    return getHeavyProfanityResponse() + "\n\n[CONVERSA ENCERRADA]";
  }
  
  if (profanityCheck.level === 'light') {
    return getLightProfanityResponse() + "\n\n[CONVERSA ENCERRADA]";
  }

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
