const axios = require('axios');

// Script para testar o webhook localmente
async function testWebhook() {
    const webhookUrl = 'http://localhost:3000/webhook';
    
    // Simula um webhook do MercadoPago
    const mockWebhookData = {
        type: 'payment',
        data: {
            id: '123456789'
        }
    };
    
    try {
        console.log('🧪 Testando webhook...');
        console.log('📤 Enviando dados:', JSON.stringify(mockWebhookData, null, 2));
        
        const response = await axios.post(webhookUrl, mockWebhookData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Webhook testado com sucesso!');
        console.log('📥 Resposta:', response.status, response.statusText);
        
    } catch (error) {
        console.error('❌ Erro ao testar webhook:', error.message);
        if (error.response) {
            console.error('📥 Resposta do servidor:', error.response.status, error.response.data);
        }
    }
}

// Executa o teste se o script for chamado diretamente
if (require.main === module) {
    testWebhook();
}

module.exports = { testWebhook }; 