const navItems  = document.querySelectorAll('#navBar li');
const container = document.getElementById('navInfoContainer');
const navBar    = document.getElementById('navBar');
const panels    = document.querySelectorAll('.nav-panel');

let closeTimer = null;

// ─── Synchronise la largeur du panneau avec celle de la navbar ───
function syncWidth() {
    const rect = navBar.getBoundingClientRect();
    container.style.width = rect.width + 'px';
}

syncWidth();
window.addEventListener('resize', syncWidth);

// ─── Affiche le bon panneau ───
function showPanel(target) {
    clearTimeout(closeTimer);
    syncWidth();

    panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
    });

    container.classList.add('open');
}

// ─── Ferme le panneau après un court délai ───
function scheduleClose() {
    closeTimer = setTimeout(() => {
        container.classList.remove('open');
        panels.forEach(p => p.classList.remove('active'));
    }, 150);
}

// ─── Événements sur les items de la navbar ───
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => showPanel(item.dataset.target));
    item.addEventListener('mouseleave', scheduleClose);
});

// ─── Garde le panneau ouvert si on le survole ───
container.addEventListener('mouseenter', () => clearTimeout(closeTimer));
container.addEventListener('mouseleave', scheduleClose);
