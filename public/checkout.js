document.querySelector('#buy-btn').addEventListener('click', async () => {
    const button = document.querySelector('#buy-btn');
    const originalText = button.textContent;
    
    try {
        // Disable button and show loading
        button.disabled = true;
        button.textContent = 'Processando...';
        
        const response = await fetch('/criar-pagamento', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.url) {
            console.log('🛒 Redirecionando para checkout:', data.url);
            window.location.href = data.url; // Redireciona para o link do checkout
        } else {
            throw new Error('URL de checkout não recebida');
        }
        
    } catch (err) {
        console.error('❌ Erro ao criar pagamento:', err);
        alert('Erro ao iniciar pagamento. Tente novamente.');
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
    }
});