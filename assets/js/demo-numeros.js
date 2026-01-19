document.addEventListener("DOMContentLoaded", () => {

    // 🔴 SOLO DEMO VISUAL
    const demo = {
        s1: [30, 44],      // sorteado 1 vez
        s2: [47],          // sorteado 2 veces
        s3: [74],          // sorteado 3 veces
        s4: [54, 66]       // sorteado 4+ veces
    };

    document.querySelectorAll(".circulo").forEach(c => {
        const n = parseInt(c.textContent, 10);

        if (demo.s1.includes(n)) c.classList.add("s1");
        if (demo.s2.includes(n)) c.classList.add("s2");
        if (demo.s3.includes(n)) c.classList.add("s3");
        if (demo.s4.includes(n)) c.classList.add("s4");
    });

});
