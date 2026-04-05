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
  <div class="voucher" onclick="openVoucher('hug')">💖 Free Hug</div>
  <div class="voucher" onclick="openVoucher('dinner')">🍜 Dinner/Lunch Date</div>
  <div class="voucher" onclick="openVoucher('movie')">🎬 Movie Date</div>
</div>

<div id="voucherModal" class="modal hidden">
  <div class="modal-content">
    <p id="voucherText"></p>
    <button onclick="closeVoucher()">Claim 💕</button>
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

    // animasi
    el.classList.remove("fade");
    void el.offsetWidth;
    el.classList.add("fade");

    // inject content
    el.innerHTML = pages[currentPage];

    // tombol control
    prevBtn.style.display = (currentPage === 0) ? "none" : "inline-block";
    nextBtn.style.display = (currentPage === pages.length - 1) ? "none" : "inline-block";

    // confetti
    if (currentPage === pages.length - 1) {
        startConfetti();
    }
}

/* ========================= */
/* NAVIGATION */
/* ========================= */
function nextPage() {
    const music = document.getElementById("bgMusic");

    // play music sekali
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
/* VOUCHER */
/* ========================= */
function openVoucher(type) {
    const modal = document.getElementById("voucherModal");
    const text = document.getElementById("voucherText");

    const messages = {
        hug: "Unlimited hug buat kamu 💋",
        dinner: "Makan sampe kenyang, aku yang traktir 😋",
        movie: "Film bebas + popcorn wajib 🍿"
    };

    text.innerText = messages[type];
    modal.classList.remove("hidden");
}

function closeVoucher() {
    document.getElementById("voucherModal").classList.add("hidden");
}

// klik luar modal
window.addEventListener("click", function(e) {
    const modal = document.getElementById("voucherModal");
    if (e.target === modal) modal.classList.add("hidden");
});

/* ========================= */
/* LOADING */
/* ========================= */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").classList.remove("hidden");

        // render setelah tampil (FIX BUG kamu tadi)
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

let mouseDown = false;

document.addEventListener("mousedown", e => {
    mouseDown = true;
    startX = e.clientX;
});

document.addEventListener("mouseup", e => {
    if (!mouseDown) return;
    endX = e.clientX;
    mouseDown = false;
    handleSwipe();
});

function handleSwipe() {
    const diff = startX - endX;

    if (diff > 50) nextPage();
    else if (diff < -50) prevPage();
}
