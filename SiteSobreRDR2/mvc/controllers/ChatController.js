const OpenAI = require('openai');
require('dotenv').config();

class ChatController {
  constructor() {
    // Configuração mais robusta da OpenAI
    if (!process.env.OPENAI_API_KEY) {
        console.error('ERRO CRÍTICO: Chave OpenAI não configurada!');
        throw new Error('Configuração da API faltando');
      }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 10000, // 10 segundos de timeout
      maxRetries: 2, // Tentar até 2 vezes se falhar
    });

    // Contexto do sistema como constante
    this.SYSTEM_PROMPT = 'Você é um especialista no jogo Red Dead Redemption 2. Responda de forma detalhada e no estilo do Velho Oeste. Se a pergunta não for sobre o jogo, diga educadamente que só pode responder sobre RDR2.';
  }

  async respond(req, res) {
    const userMessage = req.body.message?.trim();

    // Validação básica da mensagem
    if (!userMessage || userMessage.length === 0) {
      return res.status(400).json({ 
        response: 'Por favor, envie uma mensagem válida.' 
      });
    }

    // Limitar tamanho da mensagem do usuário
    if (userMessage.length > 500) {
      return res.status(400).json({
        response: 'Mensagem muito longa. Por favor, limite a 500 caracteres.'
      });
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: this.SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7, // Controla a criatividade das respostas
        max_tokens: 500, // Limita o tamanho da resposta
      });

      // Verificação mais segura da resposta
      const reply = completion.choices[0]?.message?.content || 
                   'Não consegui gerar uma resposta. Por favor, tente novamente.';
      
      res.json({ response: reply.trim() });

    } catch (error) {
      console.error('Erro na API OpenAI:', error);
      
      // Mensagens de erro mais específicas
      let errorMessage = 'Erro ao se comunicar com o serviço de IA.';
      
      if (error instanceof OpenAI.APIError) {
        if (error.status === 429) {
          errorMessage = 'Estou recebendo muitas requisições. Tente novamente mais tarde.';
        } else if (error.status === 401) {
          errorMessage = 'Problema de autenticação com o serviço de IA.';
        }
      }
      
      res.status(500).json({ response: errorMessage });
    }
  }
}

module.exports = ChatController;