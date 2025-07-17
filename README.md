# 🛒 MercadoPago Payment Integration

<img width="535" height="714" alt="nodejsapi" src="https://github.com/user-attachments/assets/b3b66f2a-e48c-43c2-a92b-7f334f4b5673" />


This project demonstrates how to integrate MercadoPago payments with webhooks for automatic notifications.

## 🚀 How It Works

### 1. Purchase Flow
1. **User accesses** `buytest.html` and clicks "Buy Now"
2. **Frontend** (`checkout.js`) makes POST request to `/criar-pagamento`
3. **Backend** creates preference in MercadoPago and returns checkout URL
4. **User is redirected** to MercadoPago checkout
5. **After payment**, user returns to success/failure page

### 2. Webhook (Automatic Notifications)
1. **MercadoPago sends webhook** to `/webhook` when payment status changes
2. **Backend processes** the notification and verifies payment status
3. **Detailed logs** are displayed in server console
4. **Automatic actions** can be executed (add to group, send email, etc.)

## 📋 Prerequisites

1. **MercadoPago account** with production or sandbox credentials
2. **Node.js** installed
3. **ngrok** or similar to expose localhost (for webhooks)

## ⚙️ Configuration

### 1. Environment Variables
Create a `.env` file in the project root:

```env
MP_ACCESS_TOKEN=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure ngrok (for webhooks)
```bash
ngrok http 3000
```

Copy the ngrok URL and update it in `Server.js`:
```javascript
notification_url: 'https://your-ngrok-url.ngrok-free.app/webhook'
```

## 🏃‍♂️ How to Run

### 1. Start Server
```bash
npm run dev
```

### 2. Access Application
- Open: `http://localhost:3000`
- Click "Buy Now"
- Complete payment on MercadoPago

### 3. Test Webhook
```bash
node test-webhook.js
```

## 📁 File Structure

```
├── Server.js                 # Main server
├── public/
│   ├── buytest.html         # Purchase page
│   ├── checkout.js          # Frontend JavaScript
│   ├── pagamentoconfirmado.html  # Success page
│   ├── pagamentofalhou.html      # Failure page
│   └── pagamentopendente.html    # Pending page
├── test-webhook.js          # Test script
└── README.md               # This file
```

## 🔧 Endpoints

### POST `/criar-pagamento`
- **Function**: Creates payment preference in MercadoPago
- **Returns**: Checkout URL

### POST `/webhook`
- **Function**: Receives notifications from MercadoPago
- **Processes**: Payment status automatically

### GET `/payment-success`
- **Function**: Approved payment page

### GET `/payment-failed`
- **Function**: Failed payment page

### GET `/payment-pending`
- **Function**: Pending payment page

### POST `/adicionar-ao-grupo`
- **Function**: Adding user to a group after payment-success

## 📊 Payment Status

The webhook processes the following statuses:

- **`approved`**: ✅ Payment approved
- **`pending`**: ⏳ Payment pending
- **`rejected`**: ❌ Payment rejected
- **`cancelled`**: 🚫 Payment cancelled

## 🔍 Logs and Debug

The server displays detailed logs in the console:

```
📩 Webhook received: { ... }
📋 Notification type: payment
🆔 Payment ID: 123456789
💰 Payment status: approved
💵 Amount: 50.00
👤 Payer: user@example.com
✅ Payment approved - Processing...
```

## 🛠️ Customization

### Modify Product
In `Server.js`, change the product data:

```javascript
const preference = {
    items: [
        {
            title: 'Your Product',
            quantity: 1,
            unit_price: 99.99,
        },
    ],
    // ...
};
```

## 🧪 Testing

### 1. Local Test
```bash
node test-webhook.js
```

### 2. Real Test
1. Make a real purchase
2. Check the console logs
3. Confirm if the webhook was received

## 🔒 Security

- ✅ Webhook validation implemented
- ✅ Status verification via MercadoPago API
- ✅ Detailed logs for auditing
- ⚠️ Configure HTTPS in production
- ⚠️ Validate webhook signature in production

## 📞 Support

For questions about the integration:
- [MercadoPago Documentation](https://www.mercadopago.com.br/developers)
- [MercadoPago Webhooks](https://www.mercadopago.com.br/developers/docs/webhooks)

---

**🎉 Now you have a complete payment system with automatic notifications!**
