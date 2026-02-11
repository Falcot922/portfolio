const albums = [
    { title: "Hybrid Theory", artist: "Linkin Park", year: "2000", src: "../images/HB.jpg" },
    { title: "ALBUM DEUX", artist: "Artiste 2", year: "2019", src: "covers/album2.jpg" },
    { title: "ALBUM TROIS", artist: "Artiste 3", year: "2022", src: "covers/album3.jpg" },
    { title: "ALBUM QUATRE", artist: "Artiste 4", year: "2018", src: "covers/album4.jpg" },
    { title: "ALBUM CINQ", artist: "Artiste 5", year: "2023", src: "covers/album5.jpg" },
    { title: "ALBUM SIX", artist: "Artiste 6", year: "2020", src: "covers/album6.jpg" },
];

const wrapper = document.getElementById('albumWrapper');
const infoEl = document.getElementById('albumInfo');
const titleEl = document.getElementById('albumTitle');
const artistEl = document.getElementById('albumArtist');
const yearEl = document.getElementById('albumYear');
const indexEl = document.getElementById('albumIndex');
const btnPrev = document.getElementById('arrowLeft');
const btnNext = document.getElementById('arrowRight');

let current = 0;
let cards   = [];

albums.forEach((album, i) => {
    const card = document.createElement('div');
    card.className = 'album-card';
    const img = document.createElement('img');
    img.src = album.src;
    img.alt = album.title;
    card.appendChild(img);
    wrapper.appendChild(card);
    cards.push(card);
});

function getTransform(positionInStack) {
    const offset = positionInStack;
    const tz = -offset * 18;
    const ty = offset * 12;
    const tx = offset * 8;
    const rz = offset * 1.5;
    const scale = 1 - offset * 0.04;
    return `translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateZ(${rz}deg) scale(${scale})`;
}

function renderWrapp() {
    const n = albums.length;
    cards.forEach((card, i) => {
        let pos = (i - current + n) % n;
        const visible = pos < 5;
        card.style.transform = getTransform(pos);
        card.style.opacity = visible ? (1 - pos * 0.15) : 0;
        card.style.zIndex = n - pos;
        card.style.pointerEvents = pos === 0 ? 'auto' : 'none';
    });
}

function updateInfo(animated = true) {
    const album = albums[current];
    const n = albums.length;
    const bg = document.getElementById("albumBg");
    if (animated) {
        infoEl.classList.add('changing');

        setTimeout(() => {
            titleEl.textContent = album.title;
            artistEl.textContent = album.artist;
            yearEl.textContent = album.year;
            indexEl.textContent =
                String(current + 1).padStart(2, '0') +
                ' / ' +
                String(n).padStart(2, '0');

            bg.style.backgroundImage = `url(${album.src})`;

            infoEl.classList.remove('changing');
        }, 250);
    } else {
        titleEl.textContent = album.title;
        artistEl.textContent = album.artist;
        yearEl.textContent = album.year;
        indexEl.textContent =
            String(current + 1).padStart(2, '0') +
            ' / ' +
            String(n).padStart(2, '0');

        bg.style.backgroundImage = `url(${album.src})`;
    }
}


function goTo(index) {
    current = (index + albums.length) % albums.length;
    renderWrapp();
    updateInfo();
}

btnNext.addEventListener('click', () => goTo(current + 1));
btnPrev.addEventListener('click', () => goTo(current - 1));

// ─── SCROLL ───
let scrollDelta = 0;
wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollDelta += e.deltaY;
    if (Math.abs(scrollDelta) > 60) {
        goTo(current + (scrollDelta > 0 ? 1 : -1));
        scrollDelta = 0;
    }
}, { passive: false });


renderWrapp();
updateInfo(false);
