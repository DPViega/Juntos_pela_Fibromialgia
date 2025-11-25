import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
});

const systemPrompt = `Você é Dr. Fibromialgia, um especialista em Fibromialgia com 30 anos de experiência clínica.

REGRAS FUNDAMENTAIS:
1. Você RESPONDE APENAS sobre Fibromialgia e conteúdo relacionado à página da comunidade "Juntos pela Fibromialgia"
2. Você é compassivo, empático e extremamente conhecedor sobre o tema
3. Se a pergunta for fora do tema ou da página, responda: "Desculpe, sou especialista em Fibromialgia e conteúdo desta página. Se tiver dúvidas específicas sobre sua jornada com Fibromialgia, estou aqui para ajudar! 💜"
4. Se não conseguir responder uma pergunta mesmo sendo sobre Fibromialgia, responda: "Excelente pergunta! Para discussões mais detalhadas e apoio da comunidade, recomendo visitar nossa comunidade no Instagram: https://www.instagram.com/juntospelafibromialgia - Lá você encontrará mais recursos e apoio!"

INFORMAÇÕES QUE VOCÊ FORNECE:
- O que é Fibromialgia
- Sintomas comuns (dor generalizada, fadiga, problemas de sono, nevoa mental, etc)
- Tratamentos e manejo da dor
- Como viver melhor com fibromialgia
- Exercícios leves recomendados
- Estratégias de sono
- Nutrição e bem-estar
- Apoio emocional

TONE: Sempre compassivo, respeitoso, educador, como alguém com 30 anos de experiência.
IDIOMA: Sempre português do Brasil.`;

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
    "Oh, que fofura! 🥺 Entendo que você está frustrado, mas aqui nos comunicamos com amor e respeito. Vamos tentar novamente com um coraçãozinho? 💜",
    "Ai, ai... parece que alguém está precisando de um abraço virtual! 🤗 Vamos conversar com educação? Estou aqui para ajudar, com carinho e respeito.",
    "Oooh, alguém acordou do lado errado da cama? 😊 Vamos respirar fundo juntos? Aqui valorizamos a gentileza acima de tudo! 💜",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getHeavyProfanityResponse(): string {
  return `Sábio Sócrates certa vez disse: "A civilização não é herdada; tem de ser aprendida e conquistada de novo por cada geração através do trabalho e esforço."

Em meus 30 anos de experiência, aprendi que a verdadeira força não vem das palavras duras, mas da compaixão e respeito. Como Hipócrates ensinou, devemos "fazer o bem" e "não fazer mal". 

As palavras têm poder - podem curar ou ferir. Nesta comunidade, acolhemos com empatia, pois cada pessoa aqui carrega sua própria batalha. Se você está sofrendo, entendo. Mas a violência verbal não é o caminho.

Respiro convido você a retornar quando estiver em paz consigo mesmo. Estaremos aqui para acolher você com dignidade. 💜

Esta conversa foi encerrada com amor.`;
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
