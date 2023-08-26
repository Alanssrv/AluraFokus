const html = document.querySelector('html');

const imagemContexto = document.querySelector('[data-imagem-contexto]');
const botoesContexto = document.querySelectorAll('button[data-contexto]');
const tituloContexto = document.querySelector('.app__title');
botoesContexto.forEach(botao => botao.addEventListener('click', () => {
    alterarFoco(botao);
}));

function alterarFoco(botao) {
    const contexto = botao.getAttribute('data-contexto');
    html.setAttribute('data-contexto', contexto);
    imagemContexto.setAttribute('src', `/imagens/${contexto}.png`);
    tituloContexto.innerHTML = selecionarTitulo(contexto);
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
