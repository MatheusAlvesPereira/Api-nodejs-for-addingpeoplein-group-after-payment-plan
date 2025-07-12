# 🛒 MercadoPago Payment Integration

Este projeto demonstra como integrar pagamentos do MercadoPago com webhooks para notificações automáticas.

## 🚀 Como Funciona

### 1. Fluxo de Compra
1. **Usuário acessa** `buytest.html` e clica em "Comprar Agora"
2. **Frontend** (`checkout.js`) faz requisição POST para `/criar-pagamento`
3. **Backend** cria preferência no MercadoPago e retorna URL de checkout
4. **Usuário é redirecionado** para o checkout do MercadoPago
5. **Após pagamento**, usuário retorna para página de sucesso/falha

### 2. Webhook (Notificações Automáticas)
1. **MercadoPago envia webhook** para `/webhook` quando status do pagamento muda
2. **Backend processa** a notificação e verifica status do pagamento
3. **Logs detalhados** são exibidos no console do servidor
4. **Ações automáticas** podem ser executadas (adicionar ao grupo, enviar email, etc.)

## 📋 Pré-requisitos

1. **Conta MercadoPago** com credenciais de produção ou sandbox
2. **Node.js** instalado
3. **ngrok** ou similar para expor localhost (para webhooks)

## ⚙️ Configuração

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
MP_ACCESS_TOKEN=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar ngrok (para webhooks)
```bash
ngrok http 3000
```

Copie a URL do ngrok e atualize no `Server.js`:
```javascript
notification_url: 'https://seu-ngrok-url.ngrok-free.app/webhook'
```

## 🏃‍♂️ Como Executar

### 1. Iniciar Servidor
```bash
node Server.js
```

### 2. Acessar Aplicação
- Abra: `http://localhost:3000`
- Clique em "Comprar Agora"
- Complete o pagamento no MercadoPago

### 3. Testar Webhook
```bash
node test-webhook.js
```

## 📁 Estrutura dos Arquivos

```
├── Server.js                 # Servidor principal
├── public/
│   ├── buytest.html         # Página de compra
│   ├── checkout.js          # JavaScript do frontend
│   ├── pagamentoconfirmado.html  # Página de sucesso
│   ├── pagamentofalhou.html      # Página de falha
│   └── pagamentopendente.html    # Página de pendente
├── test-webhook.js          # Script de teste
└── README.md               # Este arquivo
```

## 🔧 Endpoints

### POST `/criar-pagamento`
- **Função**: Cria preferência de pagamento no MercadoPago
- **Retorna**: URL do checkout

### POST `/webhook`
- **Função**: Recebe notificações do MercadoPago
- **Processa**: Status do pagamento automaticamente

### GET `/payment-success`
- **Função**: Página de pagamento aprovado

### GET `/payment-failed`
- **Função**: Página de pagamento falhou

### GET `/payment-pending`
- **Função**: Página de pagamento pendente

## 📊 Status de Pagamento

O webhook processa os seguintes status:

- **`approved`**: ✅ Pagamento aprovado
- **`pending`**: ⏳ Pagamento pendente
- **`rejected`**: ❌ Pagamento rejeitado
- **`cancelled`**: 🚫 Pagamento cancelado

## 🔍 Logs e Debug

O servidor exibe logs detalhados no console:

```
📩 Webhook recebido: { ... }
📋 Tipo de notificação: payment
🆔 ID do pagamento: 123456789
💰 Status do pagamento: approved
💵 Valor: 50.00
👤 Pagador: user@example.com
✅ Pagamento aprovado - Processando...
```

## 🛠️ Personalização

### Adicionar Lógica de Negócio
No `Server.js`, dentro do webhook, adicione sua lógica:

```javascript
if (payment.status === 'approved') {
    console.log('✅ Pagamento aprovado - Processando...');
    
    // Adicione aqui sua lógica:
    // - Adicionar usuário ao grupo
    // - Enviar email de confirmação
    // - Atualizar banco de dados
    // - etc.
}
```

### Modificar Produto
No `Server.js`, altere os dados do produto:

```javascript
const preference = {
    items: [
        {
            title: 'Seu Produto',
            quantity: 1,
            unit_price: 99.99,
        },
    ],
    // ...
};
```

## 🧪 Testando

### 1. Teste Local
```bash
node test-webhook.js
```

### 2. Teste Real
1. Faça uma compra real
2. Verifique os logs no console
3. Confirme se o webhook foi recebido

## 🔒 Segurança

- ✅ Validação de webhook implementada
- ✅ Verificação de status via API do MercadoPago
- ✅ Logs detalhados para auditoria
- ⚠️ Configure HTTPS em produção
- ⚠️ Valide assinatura do webhook em produção

## 📞 Suporte

Para dúvidas sobre a integração:
- [Documentação MercadoPago](https://www.mercadopago.com.br/developers)
- [Webhooks MercadoPago](https://www.mercadopago.com.br/developers/docs/webhooks)

---

**🎉 Agora você tem um sistema completo de pagamentos com notificações automáticas!**
