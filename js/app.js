/**
 * thIAguinho Arcade - App Logic
 */

// Registro do Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Arcade: Service Worker pronto!', reg))
            .catch(err => console.log('Arcade: Falha no SW', err));
    });
}

const ArcadeScore = {
    // Inicializa a exibição dos recordes no menu
    init: function() {
        ['dance', 'run', 'race'].forEach(mode => {
            const saved = localStorage.getItem(`th_score_${mode}`) || 0;
            const element = document.getElementById(`score-${mode}`);
            if (element) {
                element.innerText = `Recorde: ${saved}`;
            }
        });
    },
    // Função para salvar novo recorde manualmente se necessário
    save: function(mode, score) {
        const best = localStorage.getItem(`th_score_${mode}`) || 0;
        if (parseInt(score) > parseInt(best)) {
            localStorage.setItem(`th_score_${mode}`, score);
            this.init();
        }
    }
};

// Carrega os recordes assim que o menu abrir
document.addEventListener('DOMContentLoaded', () => {
    ArcadeScore.init();
});