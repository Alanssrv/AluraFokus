const html = document.querySelector('html');

const imagemContexto = document.querySelector('[data-imagem-contexto]');
const botoesContexto = document.querySelectorAll('button[data-contexto]');
const tituloContexto = document.querySelector('.app__title');
const musicaFoco = document.querySelector('[data-musica]');
const botaoComecarPausar = document.querySelector('[data-botao-comecar]');
const relogio = document.querySelector('#timer');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

const intervalosDeTempo = {'foco': 1500, 'descanso-curto': 300, 'descanso-longo': 900}
let intervaloId = null;
let tempoRelogioSegundos = 1500;
const iconeBotaoTemporizador = botaoComecarPausar.childNodes[1];
const textoBotaoTemporizador = botaoComecarPausar.childNodes[3];

botoesContexto.forEach(botao => botao.addEventListener('click', () => {
    pararTemporizador();
    botoesContexto.forEach((botaoContexto) => botaoContexto.classList.remove('active'));
    alterarContexto(botao);
}));

function alterarContexto(botao) {
    botao.classList.add('active');
    const contexto = botao.getAttribute('data-contexto');
    tempoRelogioSegundos = intervalosDeTempo[contexto];
    html.setAttribute('data-contexto', contexto);
    imagemContexto.setAttribute('src', `/imagens/${contexto}.png`);
    tituloContexto.innerHTML = selecionarTitulo(contexto);
    apresentarTempo();
}

musicaFoco.addEventListener('change', () => {
    if (musica.paused)
        musica.play();
    else 
        musica.pause();
});


const contagemRegressiva = () => {
    if (tempoRelogioSegundos <= 0) {
        new Audio('sons/beep.mp3').play();
        pararTemporizador();
        return;
    }
    tempoRelogioSegundos--;
    apresentarTempo();
}

botaoComecarPausar.addEventListener('click', iniciarTemporizador);

function iniciarTemporizador() {
    if (intervaloId) {
        new Audio('sons/pause.mp3').play();
        pararTemporizador();
        return;
    }
    new Audio('sons/play.wav').play();
    iconeBotaoTemporizador.src = 'imagens/pause.png';
    textoBotaoTemporizador.textContent = 'Pausar';
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function pararTemporizador() {
    iconeBotaoTemporizador.src = 'imagens/play_arrow.png';
    textoBotaoTemporizador.textContent = 'Começar';
    clearInterval(intervaloId);
    intervaloId = null;
}

function apresentarTempo() {
    const tempo = new Date(tempoRelogioSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'});
    relogio.innerHTML = `${tempoFormatado}`;
}

apresentarTempo();

function selecionarTitulo(contexto) {
    switch (contexto) {
        case 'foco':
            return `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
        case 'descanso-curto':
            return tituloContexto.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta</strong>`
        case 'descanso-longo':
            return tituloContexto.innerHTML = `Hora de voltar à superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa</strong>`
        default:
            return tituloContexto.innerHTML = '';
    }
}
