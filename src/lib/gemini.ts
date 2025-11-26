// Função para chamar o backend seguro da IA
export async function chatWithGemini(message: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    const data = await response.json();
    return data.text || "Desculpe, não consegui processar sua pergunta.";
  } catch (error) {
    console.error("Erro ao chamar o backend IA:", error);
    throw new Error("Erro ao comunicar com o assistente IA");
  }
}
