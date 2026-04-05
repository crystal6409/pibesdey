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
<p>
Halo Roxcelle,<br>
<br>

Aku cuma mau bilang kalau aku bangga bisa memilikimu. Kadang aku merasa kata "hebat" saja tidak cukup untuk menggambarkan kamu.<br>

Aku tahu jalan yang kamu tempuh tidak selalu mulus, dan aku melihat betapa kerasnya kamu berjuang sampai di titik ini.<br>
Aku akui ketangguhanmu itu luar biasa, dan kegigihanmu untuk terus maju meskipun berat adalah hal yang paling aku kagumi.<br>
Meskipun mungkin kamu tidak bercerita, aku yakin kamu selalu berusaha demi yang terbaik.<br>
Kamu sudah melakukan yang terbaik sampai sejauh ini.<br>
Terimakasih ya.<br>
<br>

Semangat terus ya, Sayang. Aku sayang kamu lebih dari yang bisa aku ucapkan dan lakukan.<br>

Xoxo
</p>
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
        <button onclick="claimVoucher(event)">Claim 💕</button>
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
        <p>Makan sampe kenyang 😋</p>
        <button onclick="claimVoucher(event)">Claim 💕</button>
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
        <p>Film bebas + popcorn 🍿</p>
        <button onclick="claimVoucher(event)">Claim 💕</button>
      </div>

    </div>
    <div class="checkmark hidden">✔</div>
  </div>

</div>
`

];

let currentPage = 0;
let musicStarted = false;

/* ========================= */
/* RENDER */
/* ========================= */
function render() {
    const el = document.getElementById("content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    el.classList.remove("fade");
    void el.offsetWidth;
    el.classList.add("fade");

    el.innerHTML = pages[currentPage];

    prevBtn.style.display = (currentPage === 0) ? "none" : "inline-block";
    nextBtn.style.display = (currentPage === pages.length - 1) ? "none" : "inline-block";

    if (currentPage === pages.length - 1) {
        startConfetti();

        setTimeout(() => {
            document.querySelectorAll(".flip-inner").forEach(card => {
                card.classList.add("tease");
            });
        }, 500);
    }
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
/* CLAIM VOUCHER (NEW LOGIC) */
/* ========================= */
function claimVoucher(e) {
    e.stopPropagation();

    const card = e.target.closest(".flip-card");
    const button = e.target;
    const checkmark = card.querySelector(".checkmark");

    // ubah button
    button.innerText = "Claimed 💖";
    button.disabled = true;
    button.style.opacity = "0.7";

    // munculin checkmark
    checkmark.classList.remove("hidden");

    // kasih state claimed
    card.classList.add("claimed");

    // glow effect
    card.classList.add("glow");
    setTimeout(() => {
        card.classList.remove("glow");
    }, 800);
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
/* CONFETTI */
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

/* ========================= */
/* FLIP CARD FIX */
/* ========================= */
document.addEventListener("click", function(e) {
    const card = e.target.closest(".flip-card");

    if (!card) {
        document.querySelectorAll(".flip-inner").forEach(el => {
            el.classList.remove("flipped");
        });
        return;
    }

    // ❌ kalau sudah claimed → jangan bisa flip lagi
    if (card.classList.contains("claimed")) return;

    const inner = card.querySelector(".flip-inner");

    inner.classList.remove("tease");
    inner.classList.toggle("flipped");
});
