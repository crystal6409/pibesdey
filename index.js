// Birthday page scripts
window.addEventListener("load", () => {
    Swal.fire({
        title: "Nyalain lagunya ya?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector(".song").play();
        }
        animationTimeline();
    });
});

const animationTimeline = () => {
    // Persiapan teks (Split Chars)
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
    const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewY: "-15deg" };

    // Inisialisasi Timeline GSAP
    const tl = new TimelineMax();

    // LOGIC UTAMA: Menambahkan .addPause() di setiap akhir segmen pesan
    tl.to(".container", 0.6, { visibility: "visible" })
        .from(".one", 0.7, { opacity: 0, y: 10 })
        .from(".two", 0.4, { opacity: 0, y: 10 })
        .addPause() // <--- BERHENTI DI HALAMAN 1 (One & Two)

        .to(".one", 0.7, { opacity: 0, y: 10 })
        .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
        .from(".three", 0.7, { opacity: 0, y: 10 })
        .addPause() // <--- BERHENTI DI HALAMAN 2 (Three)

        .to(".three", 0.7, { opacity: 0, y: 10 })
        .from(".four", 0.7, { scale: 0.2, opacity: 0 })
        .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
        .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
        .addPause() // <--- BERHENTI DI HALAMAN 3 (Chatbox)

        .to(".fake-btn", 0.1, { backgroundColor: "rgb(193, 92, 209)" })
        .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
        .from(".idea-1", 0.7, ideaTextTrans)
        .addPause() // <--- BERHENTI DI HALAMAN 4 (Idea 1)

        .to(".idea-1", 0.7, ideaTextTransLeave)
        .from(".idea-2", 0.7, ideaTextTrans)
        .addPause() // <--- BERHENTI DI HALAMAN 5 (Idea 2)

        .to(".idea-2", 0.7, ideaTextTransLeave)
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, { scale: 1.1, x: 10, backgroundColor: "rgb(193, 92, 209)", color: "#fff" })
        .addPause() // <--- BERHENTI DI HALAMAN 6 (Idea 3)

        .to(".idea-3", 0.7, ideaTextTransLeave)
        .from(".idea-4", 0.7, ideaTextTrans)
        .addPause() // <--- BERHENTI DI HALAMAN 7 (Idea 4)

        .to(".idea-4", 0.7, ideaTextTransLeave)
        .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 })
        .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1")
        .addPause() // <--- BERHENTI DI HALAMAN 8 (Idea 5)

        .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 })
        .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
        .addPause() // <--- BERHENTI DI HALAMAN 9 (Idea 6)

        .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2)
        .staggerFromTo(".ballons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
        .from(".profile-picture", 0.5, { scale: 5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
        .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
        .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
        .addPause() // <--- BERHENTI DI HALAMAN 10 ( Balloons & Hat)

        .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
        .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
        .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
        .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

    // Navigasi Tombol
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    nextBtn.addEventListener("click", () => {
        tl.play();
    });

    prevBtn.addEventListener("click", () => {
        tl.reverse();
    });

    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
};
