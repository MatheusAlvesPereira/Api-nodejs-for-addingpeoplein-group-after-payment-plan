const express = require('express');
const path = require('path');
const axios = require('axios');
const mercadopago = require('mercadopago');
require('dotenv').config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Configure MercadoPago
if (!process.env.MP_ACCESS_TOKEN) {
  console.error('❌ MP_ACCESS_TOKEN não encontrado no arquivo .env');
  process.exit(1);
}

// Try different approaches for MercadoPago SDK v2.8.0
let preference;

try {
  // Try the new API first
  const { MercadoPagoConfig, Preference: PreferenceClass } = mercadopago;
  const mercadoPagoConfig = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  });
  preference = new PreferenceClass(mercadoPagoConfig);
  console.log('✅ Usando nova API do MercadoPago');
} catch (error) {
  console.log('⚠️ Nova API falhou, tentando API antiga...');
  // Fallback to old API
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
  });
  preference = mercadopago.preferences;
  console.log('✅ Usando API antiga do MercadoPago');
}

console.log('✅ MercadoPago configurado com sucesso');
  
const ACCESS_TOKEN_MERCADO_PAGO = process.env.MP_ACCESS_TOKEN;

app.post('/webhook', async (req, res) => {
    console.log("📩 Webhook recebido:", JSON.stringify(req.body, null, 2));

    const paymentId = req.body.data?.id;
    const topic = req.body.type; 

    console.log(`📋 Tipo de notificação: ${topic}`);
    console.log(`🆔 ID do pagamento: ${paymentId}`);

    if (!paymentId) {
        console.log('⚠️ ID do pagamento ausente no webhook');
        return res.status(400).send('ID do pagamento ausente');
    }

    try {
        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN_MERCADO_PAGO}`,
                },
            }
        );

        const payment = response.data;
        console.log(`💰 Status do pagamento: ${payment.status}`);
        console.log(`💵 Valor: ${payment.transaction_amount}`);
        console.log(`👤 Pagador: ${payment.payer?.email}`);

        if (payment.status === 'approved') {
            console.log('✅ Pagamento aprovado - Processando...');
            // to send a request to group
        } else if (payment.status === 'pending') {
            console.log('⏳ Pagamento pendente');
        } else if (payment.status === 'rejected') {
            console.log('❌ Pagamento rejeitado');
        } else if (payment.status === 'cancelled') {
            console.log('🚫 Pagamento cancelado');
        } else {
            console.log(`ℹ️ Status desconhecido: ${payment.status}`);
        }

        return res.sendStatus(200);
    } catch (err) {
        console.error('❌ Erro ao verificar pagamento:', err.message);
        return res.sendStatus(500);
    }
});

app.post('/criar-pagamento', async (req, res) => {
    try {
      console.log('🛒 Criando preferência de pagamento...');
      
      const preferenceData = {
        items: [
          {
            id: '123',
            title: 'Plano Premium',
            quantity: 1,
            unit_price: 50.0,
          },
        ],
        back_urls: {
          success: 'https://eb0fcd175583.ngrok-free.app/payment-success',
          failure: 'https://eb0fcd175583.ngrok-free.app/payment-failed',
          pending: 'https://eb0fcd175583.ngrok-free.app/payment-pending',
        },
        auto_return: 'approved',
        notification_url: 'https://eb0fcd175583.ngrok-free.app/webhook'
      };
  
      console.log('📋 Preferência:', JSON.stringify(preferenceData, null, 2));
      
      let response;
      
      if (preference.create) {
        // New API
        response = await preference.create({ body: preferenceData });
      } else {
        // Old API
        response = await preference.create(preferenceData);
      }
      
      console.log('📥 Resposta completa:', JSON.stringify(response, null, 2));
      
      // Check if response has the expected structure
      if (response && response.body) {
        console.log('✅ Preferência criada:', response.body.id);
        console.log('🔗 URL do checkout:', response.body.init_point);
        res.json({ url: response.body.init_point });
      } else if (response && response.id) {
        // Alternative response structure
        console.log('✅ Preferência criada:', response.id);
        console.log('🔗 URL do checkout:', response.init_point);
        res.json({ url: response.init_point });
      } else {
        console.log('⚠️ Estrutura de resposta inesperada:', response);
        res.json({ url: response.init_point || response.body?.init_point });
      }
    } catch (error) {
      console.error('❌ Erro ao criar pagamento:', error);
      console.error('📋 Detalhes do erro:', error.message);
      res.status(500).json({ 
        error: 'Erro ao criar pagamento',
        details: error.message 
      });
    }
});

app.get('/payment-success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagamentoconfirmado.html'));
});

app.get('/payment-failed', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagamentofalhou.html'));
});

app.get('/payment-pending', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagamentopendente.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'buytest.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});