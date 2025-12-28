/**
 * thIAguinho Arcade - System Controller
 */

// 1. Registro do Service Worker (para capacidade Offline/PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Certifique-se de que o arquivo sw.js existe na raiz se for usar PWA real
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW: Sistema pronto.', reg.scope))
            .catch(err => console.log('SW: Falha ao registrar.', err));
    });
}

// 2. Gerenciamento de Orientação (Lock Landscape se possível)
document.addEventListener('DOMContentLoaded', () => {
    // Tenta forçar tela cheia ao clicar em jogar
    const playButtons = document.querySelectorAll('a');
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(e => console.log(e));
            }
        });
    });

    console.log("thIAguinho System: Online");
});
