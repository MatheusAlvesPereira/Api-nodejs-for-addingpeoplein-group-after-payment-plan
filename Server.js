const express = require('express');
const path = require('path');
const axios = require('axios');
const mercadopago = require('mercadopago');
require('dotenv').config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));

const mp = new mercadopago.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});
  
const ACCESS_TOKEN_MERCADO_PAGO = process.env.MP_ACCESS_TOKEN;

//remove
app.post('/webhook', (req, res) => {
    console.log("🔔 Webhook recebido");
    res.sendStatus(200);
});


// app.post('/webhook', async (req, res) => {
//     const paymentId = req.body.data?.id;

//     console.log("📩 Webhook recebido:", req.body);

//     if (!paymentId) {
//         return res.status(400).send('ID do pagamento ausente');
//     }

//     try {
//         const response = await axios.get(
//         `https://api.mercadopago.com/v1/payments/${paymentId}`,
//         {
//             headers: {
//             Authorization: `Bearer ${ACCESS_TOKEN_MERCADO_PAGO}`,
//             },
//         }
//         );

//         const payment = response.data;

//         if (payment.status === 'approved') {
//             console.log('✅ Pagamento aprovado');
//         }

//         console.log('ℹ️ Pagamento não aprovado:', payment.status);
//         return res.sendStatus(200);
//     } catch (err) {
//         console.error('❌ Erro ao verificar pagamento:', err.message);
//         return res.sendStatus(500);
//     }
// });

app.post('/criar-pagamento', async (req, res) => {
    try {
      const preference = {
        items: [
          {
            title: 'Plano Premium',
            quantity: 1,
            unit_price: 50.0,
          },
        ],
        back_urls: {
          success: 'https://ngrok-free.app/pagamento-confirmado',
          failure: 'https://ngrok-free.app/pagamento-falhou',
          pending: 'https://.ngrok-free.app/pagamento-pendente',
        },
        auto_return: 'approved',
        notification_url: 'https://373e613cdef9.ngrok-free.app/webhook'
      };
  
      const response = await mp.preferences.create({ body: preference });
      res.json({ url: response.body.init_point }); // link para teste   
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar pagamento');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buytest.html'));
});
  

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});