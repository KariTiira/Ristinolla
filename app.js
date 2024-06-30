let loppu = false;

let ruudukko = [null, null, null, null, null, null, null, null, null]
const boxes = document.querySelectorAll(".box");
document.querySelector("#restart-btn").addEventListener("click", () => {
    loppu = false;
    ruudukko = [null, null, null, null, null, null, null, null, null]
    document.querySelectorAll(".box").forEach((element) => {
        element.classList.remove("nolla");
        element.classList.remove("risti");
    })
    document.querySelector("#message").classList.add("hidden");
})

const voitti = (voittaja) => {
    // console.log(voittaja);
    const messageContainer = document.querySelector("#message");
    console.log(messageContainer);
    messageContainer.classList.remove("hidden");

    if (voittaja === "x") {
        document.querySelector("#message-text").innerHTML = "Sinä voitit!"
    }
    if (voittaja === "o") {
        document.querySelector("#message-text").innerHTML = "Sinä hävisit!"
    }
    if (voittaja === "tasapeli") {
        document.querySelector("#message-text").innerHTML = "Tasapeli!"
    }
    
    loppu = true;
}

const tarkista = () => {
    //console.log("tarkistetaan");
    if (ruudukko[0] === ruudukko[1] && ruudukko[1] === ruudukko[2] && ruudukko[0] !== null) {
        voitti(ruudukko[0]);
        return;
    }
    if (ruudukko[3] === ruudukko[4] && ruudukko[4] === ruudukko[5] && ruudukko[3] !== null) {
        voitti(ruudukko[3]);
        return;
    }
    if (ruudukko[6] === ruudukko[7] && ruudukko[7] === ruudukko[8] && ruudukko[6] !== null) {
        voitti(ruudukko[6]);
        return;
    }
    if (ruudukko[0] === ruudukko[3] && ruudukko[3] === ruudukko[6] && ruudukko[0] !== null) {
        voitti(ruudukko[0]);
        return;
    }
    if (ruudukko[1] === ruudukko[4] && ruudukko[4] === ruudukko[7] && ruudukko[1] !== null) {
        voitti(ruudukko[1]);
        return;
    }
    if (ruudukko[2] === ruudukko[5] && ruudukko[5] === ruudukko[8] && ruudukko[2] !== null) {
        voitti(ruudukko[2]);
        return;
    }
    if (ruudukko[0] === ruudukko[4] && ruudukko[4] === ruudukko[8] && ruudukko[0] !== null) {
        voitti(ruudukko[0]);
        return;
    }
    if (ruudukko[2] === ruudukko[4] && ruudukko[4] === ruudukko[6] && ruudukko[2] !== null) {
        voitti(ruudukko[2]);
        return;
    }

    let tyhjia = false;

    ruudukko.map((e) => {
        if (e === null) {
            tyhjia = true;
        }
    }); 
    if (tyhjia) {
        return;
    }
    // Tässä kohtaa todetaan, että ruudukko on täynnä, eikä kukaan voittanut eli tuli tasapeli.

    voitti("tasapeli");
}



const arpoja = () => {
    if (loppu) {
        return;
    }
    while (true) {
        let satunnainen = Math.floor(Math.random() * 9);
        //console.log(satunnainen);
        if (!ruudukko[satunnainen]) {
            const ruutu = document.querySelector(`#box-${satunnainen}`)
            // console.log("tietokoneen arpoma: ", ruutu, `box-${satunnainen}`);
            ruutu.classList.add("nolla");
            ruudukko[satunnainen] = "o";
            tarkista();

            break;
        }
    }
}

//   Nuoli/anonyymifunktion syntax () => {}

boxes.forEach((e) => {
    e.addEventListener("click", (element) => {
        if (loppu) {
            return;
        }
        if (!ruudukko[element.target.dataset.box]) {
            //console.log(element.target);
            element.target.classList.add("risti");
            //console.log(element.target.dataset.box);
            ruudukko[element.target.dataset.box] = "x";
            //console.log(ruudukko);
            tarkista();
            arpoja();
        }
    })
})


