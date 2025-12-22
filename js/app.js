// js/app.js - Arquivo de Registro do PWA

// Verifica se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Tenta registrar o arquivo sw.js que está na raiz
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso com escopo:', registration.scope);
            })
            .catch((error) => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Log para debug
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema thIAguinho Arcade inicializado.");
});
