// Função para chamar o backend seguro da IA
export async function chatWithGemini(message: string, isAdmin: boolean = false, filesAsBase64?: string[] | null): Promise<string> {
  try {
    const endpoint = isAdmin ? '/api/chat/admin' : '/api/chat/support';

    // For support logic we keep message only, for admin we send files too
    const payload = isAdmin ? { message, files: filesAsBase64 } : { message };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
