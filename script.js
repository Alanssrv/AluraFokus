const html = document.querySelector('html');

const imagemContexto = document.querySelector('[data-imagem-contexto]');
const botoesContexto = document.querySelectorAll('button[data-contexto]');
const tituloContexto = document.querySelector('.app__title');
const musicaFoco = document.querySelector('[data-musica]');
const botaoComecarPausar = document.querySelector('[data-botao-comecar]');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoRelogioSegundos = 5;

botoesContexto.forEach(botao => botao.addEventListener('click', () => {
    botoesContexto.forEach((botaoContexto) => botaoContexto.classList.remove('active'));
    alterarFoco(botao);
}));

function alterarFoco(botao) {
    botao.classList.add('active');
    const contexto = botao.getAttribute('data-contexto');
    html.setAttribute('data-contexto', contexto);
    imagemContexto.setAttribute('src', `/imagens/${contexto}.png`);
    tituloContexto.innerHTML = selecionarTitulo(contexto);
}

musicaFoco.addEventListener('change', () => {
    if (musica.paused)
        musica.play();
    else 
        musica.pause();
});

let intervaloId = null;
const contagemRegressiva = () => {
    if (tempoRelogioSegundos <= 0) {
        new Audio('sons/beep.mp3').play();
        pararTemporizador();
        return;
    }
    tempoRelogioSegundos--;
    console.log(tempoRelogioSegundos);
}

botaoComecarPausar.addEventListener('click', iniciarTemporizador);

function iniciarTemporizador() {
    if (intervaloId) {
        new Audio('sons/pause.mp3').play();
        pararTemporizador();
        return;
    }
    new Audio('sons/play.wav').play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function pararTemporizador() {
    clearInterval(intervaloId);
    intervaloId = null;
}

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
