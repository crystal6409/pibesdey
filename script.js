const pages = [

`
<h2>Hai Sayang 💕</h2>
<img src="assets/images/img8.jpg" class="profile-pic">
<p>Aku bikin ini khusus buat kamu 😘</p>
`,

`
<h2>Random cute pics of you 🧸🎀</h2>
<div class="gallery">
<img src="assets/images/img15.JPG">
<img src="assets/images/img1.jpg">
<img src="assets/images/img3.jpg">
<img src="assets/images/img12.jpg">
<img src="assets/images/img7.jpg">
<img src="assets/images/img11.jpg">
<img src="assets/images/img17.jpg">
<img src="assets/images/img19.jpg">
<img src="assets/images/img13.JPG">
<img src="assets/images/img18.jpg">
<img src="assets/images/img20.jpg">
<img src="assets/images/img16.jpg">
</div>
`,

`
<h2>Surat Cinta 💌</h2>

<div class="envelope-wrapper" id="envelopeWrapper">

  <!-- AMPLOP -->
  <div class="envelope" id="envelope">
    <div class="envelope-flap" id="envelopeFlap"></div>
    <div class="envelope-body">
      <div class="envelope-heart">💌</div>
      <p class="envelope-hint">Klik untuk buka 🩷</p>
    </div>
  </div>

  <!-- ISI SURAT (tersembunyi dulu) -->
  <div class="letter-content hidden" id="letterContent">
    <p>
      Halo Roxcelle,<br><br>
      Aku cuma mau bilang kalau aku bangga sama kamu. Kadang aku merasa kata "hebat" saja tidak cukup untuk menggambarkan kamu.<br><br>
      Aku tahu jalan yang kamu tempuh tidak selalu mulus, dan aku melihat betapa kerasnya kamu berjuang sampai di titik ini.<br>
      Aku akui ketangguhanmu itu luar biasa, dan kegigihanmu untuk terus maju meskipun berat adalah hal yang paling aku kagumi.<br>
      Meskipun mungkin kamu tidak bercerita, aku yakin kamu selalu berusaha demi yang terbaik.<br>
      Kamu sudah melakukan yang terbaik sampai sejauh ini.<br>
      Terimakasih ya.<br><br>
      Semangat terus ya, Sayang. Aku sayang kamu lebih dari yang bisa aku ucapkan dan lakukan.<br><br>
      ✗♡✗♡
    </p>
  </div>

</div>
`,

`
<h2>🎉 Surprise 🎉</h2>
<p>Ini hadiah buat kamu 🫵🏻ـــــــــــــــﮩ٨ـ❤️️</p>
`,

`
<h2>Voucher Spesial 🎁</h2>

<div class="voucher-container">

  <div class="flip-card">
    <div class="flip-inner">
      <div class="flip-front">
        💖
        <h3>Free Hug</h3>
      </div>
      <div class="flip-back">
        <p>Unlimited hug buat kamu 💋</p>
        <button class="claim-btn">Claim 💕</button>
      </div>
    </div>
    <div class="checkmark hidden">✔</div>
  </div>

  <div class="flip-card">
    <div class="flip-inner">
      <div class="flip-front">
        🍜
        <h3>Dinner Date</h3>
      </div>
      <div class="flip-back">
        <p>Makan apa aja? Gas!! 😋</p>
        <button class="claim-btn">Claim 💕</button>
      </div>
    </div>
    <div class="checkmark hidden">✔</div>
  </div>

  <div class="flip-card">
    <div class="flip-inner">
      <div class="flip-front">
        🎬
        <h3>Movie Date</h3>
      </div>
      <div class="flip-back">
        <p>Film + popcorn is a must🍿</p>
        <button class="claim-btn">Claim 💕</button>
      </div>
    </div>
    <div class="checkmark hidden">✔</div>
  </div>

</div>
`,

`
<div class="finale-wrapper">
  <canvas id="fireworksCanvas"></canvas>
  <div class="finale-text">
    <p class="see-you">Happy birthday again, sayang. Talk soon! 🤩</p>
    <p class="finale-sub">aku sayang kamu 💕</p>
  </div>
</div>
`

];

let currentPage = 0;
let musicStarted = false;
let confettiStarted = false;
let fireworksAnimId = null;

/* ========================= */
/* RENDER */
/* ========================= */
function render() {
    const el = document.getElementById("content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Stop fireworks jika pindah halaman
    if (fireworksAnimId) {
        cancelAnimationFrame(fireworksAnimId);
        fireworksAnimId = null;
    }

    el.classList.remove("fade");
    void el.offsetWidth;
    el.classList.add("fade");

    el.innerHTML = pages[currentPage];

    prevBtn.style.display = (currentPage === 0) ? "none" : "inline-block";
    nextBtn.style.display = (currentPage === pages.length - 1) ? "none" : "inline-block";

    // Halaman surat cinta
    if (currentPage === 2) {
        const envelope = document.getElementById("envelope");
        if (envelope) {
            envelope.addEventListener("click", openEnvelope);
        }
    }

    // Halaman voucher (index 4)
    if (currentPage === 4) {
        if (!confettiStarted) {
            confettiStarted = true;
            startConfetti();
        }
        setTimeout(() => {
            document.querySelectorAll(".flip-card:not(.claimed) .flip-inner").forEach(inner => {
                inner.classList.add("tease");
            });
        }, 500);
    }

    // Halaman finale (index 5)
    if (currentPage === 5) {
        confettiStarted = false;
        setTimeout(() => startHeartFireworks(), 100);
    }

    if (currentPage !== 4) {
        confettiStarted = false;
    }

    // Event listener flip card
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", function () {
            const inner = card.querySelector(".flip-inner");
            inner.classList.remove("tease");

            if (!card.classList.contains("claimed")) {
                claimVoucher(card);
                inner.classList.add("flipped");
            } else {
                inner.classList.toggle("flipped");
            }
        });

        const btn = card.querySelector(".claim-btn");
        if (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const inner = card.querySelector(".flip-inner");
                inner.classList.remove("tease");
                claimVoucher(card);
                inner.classList.add("flipped");
            });
        }
    });
}

/* ========================= */
/* OPEN ENVELOPE */
/* ========================= */
function openEnvelope() {
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("envelopeFlap");
    const letter = document.getElementById("letterContent");

    if (envelope.classList.contains("opened")) return;
    envelope.classList.add("opened");

    flap.classList.add("open");

    setTimeout(() => {
        envelope.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        envelope.style.opacity = "0";
        envelope.style.transform = "scale(0.85) translateY(15px)";

        setTimeout(() => {
            envelope.style.display = "none";
            letter.classList.remove("hidden");
            letter.classList.add("letter-reveal");
        }, 400);
    }, 750);
}

/* ========================= */
/* HEART FIREWORKS */
/* ========================= */
function startHeartFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ff4d6d", "#ff758f", "#ff85a1", "#ffb3c6", "#ff1a4a", "#ff6b9d", "#ffc2d1"];
    const particles = [];

    // Titik-titik koordinat bentuk hati (parametric)
    function heartPoints(cx, cy, size) {
        const pts = [];
        for (let t = 0; t < Math.PI * 2; t += 0.25) {
            const x = cx + size * 16 * Math.pow(Math.sin(t), 3) / 16;
            const y = cy - size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
            pts.push({ x, y });
        }
        return pts;
    }

    function launchFirework() {
        const cx = Math.random() * canvas.width;
        const cy = 80 + Math.random() * (canvas.height * 0.5);
        const size = 12 + Math.random() * 14;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const pts = heartPoints(cx, cy, size);

        pts.forEach(pt => {
            const angle = Math.atan2(pt.y - cy, pt.x - cx);
            const dist = Math.sqrt((pt.x - cx) ** 2 + (pt.y - cy) ** 2);
            particles.push({
                x: cx,
                y: cy,
                tx: pt.x,   // target x
                ty: pt.y,   // target y
                vx: (pt.x - cx) * 0.07,
                vy: (pt.y - cy) * 0.07,
                alpha: 1,
                color,
                size: 2 + Math.random() * 2,
                life: 1,
                decay: 0.012 + Math.random() * 0.008,
                phase: "expand", // expand -> hold -> fade
                holdTimer: 0
            });
        });
    }

    let frame = 0;

    function animate() {
        fireworksAnimId = requestAnimationFrame(animate);

        ctx.fillStyle = "rgba(255, 245, 248, 0.18)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Launch new firework setiap ~80 frame
        if (frame % 80 === 0) {
            launchFirework();
        }
        frame++;

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            if (p.phase === "expand") {
                p.x += p.vx;
                p.y += p.vy;

                // Cek sudah dekat target
                const dx = p.tx - p.x;
                const dy = p.ty - p.y;
                if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
                    p.phase = "hold";
                    p.holdTimer = 30 + Math.random() * 20;
                }
            } else if (p.phase === "hold") {
                p.holdTimer--;
                if (p.holdTimer <= 0) p.phase = "fade";
            } else {
                p.alpha -= p.decay;
                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
            }

            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    animate();
}

/* ========================= */
/* NAVIGATION */
/* ========================= */
function nextPage() {
    const music = document.getElementById("bgMusic");

    if (!musicStarted) {
        musicStarted = true;
        music.volume = 0;
        music.play();

        let vol = 0;
        let fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.1;
                music.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 100);
    }

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

/* ========================= */
/* CLAIM VOUCHER */
/* ========================= */
function claimVoucher(card) {
    if (card.classList.contains("claimed")) return;

    const button = card.querySelector(".claim-btn");
    const checkmark = card.querySelector(".checkmark");
    const label = card.querySelector(".claimed-label");

    if (button) {
        button.innerText = "Claimed 💖";
        button.disabled = true;
        button.style.opacity = "0.7";
    }

    if (checkmark) {
        checkmark.classList.remove("hidden");
    }

    if (label) {
        label.classList.remove("hidden");
    }

    card.classList.add("claimed");

    const pop = new Audio("assets/audio/pop.mp3");
    pop.load();
    pop.currentTime = 0;
    pop.play();
}

/* ========================= */
/* LOADING */
/* ========================= */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").classList.remove("hidden");
        render();
    }, 2000);
};

/* ========================= */
/* CONFETTI (halaman voucher) */
/* ========================= */
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speed: Math.random() * 3 + 2
    }));

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

/* ========================= */
/* SWIPE */
/* ========================= */
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
    const diff = startX - endX;
    if (diff > 50) nextPage();
    else if (diff < -50) prevPage();
}
