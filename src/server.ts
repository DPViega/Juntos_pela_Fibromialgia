import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
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

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem vazia' });
    }

    // Verificar profanidade
    const profanityCheck = detectProfanity(message);
    
    if (profanityCheck.level === 'heavy') {
      return res.json({ 
        text: getHeavyProfanityResponse() + "\n\n[CONVERSA ENCERRADA]" 
      });
    }
    
    if (profanityCheck.level === 'light') {
      return res.json({ 
        text: getLightProfanityResponse() + "\n\n[CONVERSA ENCERRADA]" 
      });
    }

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

    const responseText = response.text || "Desculpe, não consegui processar sua pergunta.";
    res.json({ text: responseText });
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    res.status(500).json({ error: "Erro ao comunicar com o assistente IA" });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Servidor de IA rodando em http://localhost:${PORT}`);
});
