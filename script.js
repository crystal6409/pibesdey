const pages = [

`
<h2>Hai Sayang 💕</h2>
<img src="assets/images/img8.jpg" class="profile-pic">
<p>Aku bikin ini khusus buat kamu 😘</p>
`,

`
<h2>Cutest pic of U 📸</h2>
<img src="assets/images/img5.jpg">
<img src="assets/images/img3.jpg">
<img src="assets/images/img1.jpg">
<img src="assets/images/img6.jpg">
<img src="assets/images/img9.jpg">
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
<p>Kamu dapet voucher dari aku, klik next</p>
`,


`
<h2>Voucher Spesial 🎁</h2>

<div class="voucher-container">

  <div class="voucher">
    <h3>💖 Free Hug</h3>
    <p>Unlimited tanpa expired 😆</p>
  </div>

  <div class="voucher">
    <h3>🍜 Dinner Date</h3>
    <p>Aku traktir full 😉</p>
  </div>

  <div class="voucher">
    <h3>🎬 Movie Night</h3>
    <p>Film bebas + popcorn 🍿</p>
  </div>

</div>

<button onclick="claimVoucher()">Claim 💕</button>
`

];

let currentPage = 0;

function render() {
    const el = document.getElementById("content");
    el.classList.remove("fade");
    void el.offsetWidth;
    el.classList.add("fade");
    el.innerHTML = pages[currentPage];

    if (currentPage === pages.length - 1) startConfetti();
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

function claimVoucher() {
    alert("YEAY kamu udah nge claim semua voucher nya! 💕");
}

/* MUSIC */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").classList.remove("hidden");

        // AUTO PLAY MUSIC
        document.getElementById("bgMusic").play().catch(() => {
            console.log("Autoplay diblok, butuh interaksi user");
        });

    }, 2000);
};

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

let startX = 0;
let endX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    let diff = startX - endX;

    if (diff > 50) {
        nextPage(); // swipe kiri
    } else if (diff < -50) {
        prevPage(); // swipe kanan
    }
}
