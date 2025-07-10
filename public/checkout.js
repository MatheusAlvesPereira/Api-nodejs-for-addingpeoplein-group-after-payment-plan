document.querySelector('#buy-btn').addEventListener('click', () => {
    fetch('/criar-pagamento', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        window.location.href = data.url; // Redireciona para o link do checkout
    })
    .catch(err => {
        console.error('Erro ao criar pagamento:', err);
        alert('Erro ao iniciar pagamento');
    });
});