const mercadopago = require('mercadopago');

console.log('🔍 Verificando estrutura do MercadoPago SDK...');
console.log('MercadoPago object:', Object.keys(mercadopago));

// Try to see what's available
try {
  console.log('\n📋 Tentando diferentes abordagens...');
  
  // Check if configure exists
  if (typeof mercadopago.configure === 'function') {
    console.log('✅ mercadopago.configure existe');
  } else {
    console.log('❌ mercadopago.configure não existe');
  }
  
  // Check if preferences exists
  if (mercadopago.preferences) {
    console.log('✅ mercadopago.preferences existe');
    console.log('Preferences keys:', Object.keys(mercadopago.preferences));
  } else {
    console.log('❌ mercadopago.preferences não existe');
  }
  
  // Check if MercadoPagoConfig exists
  if (mercadopago.MercadoPagoConfig) {
    console.log('✅ mercadopago.MercadoPagoConfig existe');
  } else {
    console.log('❌ mercadopago.MercadoPagoConfig não existe');
  }
  
  // Check if Preference exists
  if (mercadopago.Preference) {
    console.log('✅ mercadopago.Preference existe');
  } else {
    console.log('❌ mercadopago.Preference não existe');
  }
  
} catch (error) {
  console.error('❌ Erro ao verificar:', error.message);
} 