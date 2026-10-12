// 1. SESSÃO ELEMENTOS (DOM)
const horaAtual = document.getElementById("hora-atual");

const displayCronometro = document.getElementById("display-cronometro");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnZerar = document.getElementById("btn-zerar");

// 2. ESTADO (VARIÁVEIS GLOBAIS)
// cronômetro
let segundosCronometro = 0; // tempo acumulado em seg
let intervaloCronometro = null;
let cronometroRodando = false; // flag: rodando ou não


// 3. FUNÇÕES UTILITÁRIAS
// cronômetro
function formatarTempo(totalSegundos) {
    const horas = String(Math.floor(totalSegundos / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((totalSegundo % 3600) / 60)).padStart(2,"0");
    const segundos = String(totalSegundos % 60).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
}


// 4. RELÓGIO
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");
    horaAtual.textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();



// 5. CRONÔMETRO
function iniciarCronometro() {
    if(cronometroRodando) return;

    cronometroRodando = true;
    intervaloCronometro = setInterval(() => {
        segundosCronometro++;
        displayCronometro.textContent = formatarTempo(segundosCronometro);
    }, 1000);
}

function pausarCronometro() {
    if(!cronometroRodando) return;

    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
    cronometroRodando = false;
}

function zerarCronometro() {
    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
    cronometroRodando = false;
    segundosCronometro = 0;
    displayCronometro.textContent = "00:00:00";
}

// listener (conectar botões a função)
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnZerar.addEventListener("click", zerarCronometro);

// 6. POMODORO


// 7. INICIALIZAÇÃO