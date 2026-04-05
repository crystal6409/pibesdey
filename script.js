const pages = [

`
<h2>Hai Sayang 💕</h2>
<img src="assets/images/pacarkalian.jpeg">
<p>Aku bikin ini khusus buat kamu 😘</p>
`,

`
<h2>Kenangan Kita 📸</h2>
<img src="assets/images/img1.jpg">
<img src="assets/images/img3.jpg">
<img src="assets/images/img5.jpg">
<img src="assets/images/img6.jpg">
<img src="assets/images/img7.jpg">
`,

`
<h2>Surat Cinta 💌</h2>
<p>
Aku gak sempurna...<br>
tapi aku selalu milih kamu ❤️
</p>
`,

`
<h2>🎉 Surprise 🎉</h2>
<p>Kamu dapet pelukan + cium virtual 😘</p>
`
];

let currentPage = 0;

function render() {
    const el = document.getElementById("content");
    el.classList.remove("fade");
    void el.offsetWidth;
    el.classList.add("fade");
    el.innerHTML = pages[currentPage];

    if (currentPage === 3) startConfetti();
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        render();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        render();
    }
}

/* MUSIC */
document.body.addEventListener("click", () => {
    document.getElementById("bgMusic").play();
}, { once: true });

/* LOADING */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").classList.remove("hidden");
    }, 2000);
};

/* CONFETTI */
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    for (let i = 0; i < 100; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 2,
            speed: Math.random() * 3 + 2
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(update);
    }

    update();
}

/* INIT */
render();