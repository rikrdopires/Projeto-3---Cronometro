// 1. SESSÃO ELEMENTOS (DOM)
const horaAtual = document.getElementById("hora-atual");

const displayCronometro = document.getElementById("display-cronometro");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnZerar = document.getElementById("btn-zerar");

const displayPomodoro = document.getElementById("display-pomodoro");
const btnFoco = document.getElementById("btn-foco");
const btnPausa = document.getElementById("btn-pausa");

// 2. ESTADO (VARIÁVEIS GLOBAIS)
// cronômetro
let segundosCronometro = 0; // tempo acumulado em seg
let intervaloCronometro = null;
let cronometroRodando = false; // flag: rodando ou não

// pomodoro
const TEMPO_FOCO = 25 * 60;
const TEMPO_PAUSA = 5 * 60;

let segundosPomodoro = TEMPO_FOCO;
let intervaloPomodoro = null;
let pomodoroRodando = false;

let modoAtual = "foco";

// 3. FUNÇÕES UTILITÁRIAS
// cronômetro
function formatarTempo(totalSegundos) {
    const horas = String(Math.floor(totalSegundos / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2,"0");
    const segundos = String(totalSegundos % 60).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
}

// pomodoro
function formatarMinutoSegundos(totalSegundos) {
    const minutos = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, "0");
    const segundos = String(totalSegundos % 60).padStart(2, "0");
    return `${minutos}:${segundos}`;
}

// feedback visual - modo ativo
function marcarModoAtivo(botaoAtivo) {
    btnFoco.classList.remove("ativo");
    btnPausa.classList.remove("ativo");
    botaoAtivo.classList.add("ativo");
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
function iniciarPomodoro(segundosIniciais) {
    if (pomodoroRodando) return;

    segundosPomodoro = segundosIniciais;
    displayPomodoro.textContent = formatarMinutoSegundos(segundosPomodoro);
    pomodoroRodando = true;

    intervaloPomodoro = setInterval(() => {
        segundosPomodoro--;
        displayPomodoro.textContent = formatarMinutoSegundos(segundosPomodoro);

        if (segundosPomodoro <= 0) {
            clearInterval(intervaloPomodoro);
            intervaloPomodoro = null;
            pomodoroRodando = false;
            tocarAlerta();

            //perguntar ao usuário o que fazer
            const proximo = confirm("Tempo esgotado! Iniciar o próximo ciclo?");
            if (proximo) {
                if (displayPomodoro.textContent.startsWith("00") === false) {
                }
            }
        }
    }, 1000);
}

function pararPomdoro() {
    if(!pomodoroRodando) return;
    clearInterval(intervaloPomodoro);
    intervaloPomodoro = null;
    pomodoroRodando = false;
}

function modoFoco() {
    pararPomdoro();
    marcarModoAtivo(btnFoco);
    modoAtual = "foco";
    iniciarPomodoro(TEMPO_FOCO);
}

function modoPausa() {
    pararPomdoro();
    marcarModoAtivo(btnPausa);
    modoAtual = "pausa"
    iniciarPomodoro(TEMPO_PAUSA);
}

function tocarAlerta() {
    const contextoAudio = new (window.AudioContext || window.webkitAudioContext) ();
    const oscilador = contextoAudio.createOscillator();
    const ganho = contextoAudio.createGain();

    oscilador.connect(ganho);
    ganho.connect(contextoAudio.destination);

    oscilador.type = "sine";
    oscilador.frequency = 880;
    ganho.gain.value = 0.3;

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + 0.5);
}


   // listener (conectar botões a função)
btnFoco.addEventListener("click", modoFoco);
btnPausa.addEventListener("click", modoPausa);

// 7. INICIALIZAÇÃO