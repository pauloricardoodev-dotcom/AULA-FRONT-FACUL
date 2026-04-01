const bixin = document.getElementById("b");
const cafe = document.getElementById("cafe");
const timerEl = document.getElementById("timer");

const estado = {
    normal: "./imgs/Bixin_contente.png",
    comMedo: "./imgs/Bixin_comMedo.png",
    bebendo: "./imgs/Bixin_bebendo.png",
    morto: "./imgs/Bixin_morto.png",
    acelerado: "./imgs/Bixin_acelerado.png"
}

let contador = 0;
let intervalo = null;
let time_click = null;
let timeOut = null;
let acelerado = false;
let timeoutAcelerado = null;

cafe.addEventListener("click", () => {
    contador = 0;

    bixin.src = estado.bebendo;

    setTimeout(() => {
        bixin.src = estado.acelerado;
        acelerado = true;

        bixin.classList.add("pulsando");

        if (timeoutAcelerado) clearTimeout(timeoutAcelerado);

        timeoutAcelerado = setTimeout(() => {
            acelerado = false;
            bixin.src = estado.normal;
            bixin.classList.remove("pulsando");
        }, 20000);

    }, 1000);

    controlador();
});

function controlador(){
    if(intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
    contador++;

    let tempoRestante = 60 - contador;
    timerEl.innerText = "Tempo: " + tempoRestante;

    if(contador >= 60){
        bixin.src = estado.morto;
    }

    if(contador == 30){
        bixin.src = estado.comMedo;
    }

}, 1000);
}

controlador();