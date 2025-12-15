let altura = 0
let largura = 0
let vidas = 1
let tempo = 15
const MOSQUITO_TAMANHO = 90

const NIVEIS_CONFIG = {
  'normal': 1500,
  'dificil': 1000,
  'chucknorris': 750
};

let nivel = window.location.search.replace('?', '')
let criaMosquitoTempo = NIVEIS_CONFIG[nivel] || NIVEIS_CONFIG['normal']

function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight
  largura = window.innerWidth
}

ajustaTamanhoPalcoJogo() 
window.addEventListener('resize', ajustaTamanhoPalcoJogo);

let cronometro = setInterval(function() {
  tempo -= 1

  if(tempo < 0) {
    clearInterval(cronometro)
    clearInterval(criaMosca) 
    window.location.href = 'vitoria.html'
  } else {
    document.getElementById('cronometro').innerHTML = tempo
  }
}, 1000)

function posicaoRandomica() {
  if(document.getElementById('mosquito')) {
    document.getElementById('mosquito').remove()

    if(vidas >= 3) {
      window.location.href = 'fim_de_jogo.html'
    } else {
      document.getElementById('v' + vidas).src = "src/imagens/coracao_vazio.png"
      vidas++
    }
  }

  let posicaoX = Math.floor(Math.random() * largura) - MOSQUITO_TAMANHO
  let posicaoY = Math.floor(Math.random() * altura) - MOSQUITO_TAMANHO

  posicaoX = posicaoX < 0 ? 0 : posicaoX
  posicaoY = posicaoY < 0 ? 0 : posicaoY

  let mosquito = document.createElement('img')
  mosquito.src = 'src/imagens/mosquito.png' 
  mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
  mosquito.style.left = posicaoX + 'px'
  mosquito.style.top = posicaoY + 'px'
  mosquito.style.position = 'absolute'
  mosquito.id = 'mosquito'

  mosquito.onclick = function() {
    this.remove()
  }
  document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
  const classes = ['mosquito1', 'mosquito2', 'mosquito3'];
  const indice = Math.floor(Math.random() * classes.length);
  return classes[indice];
}

function ladoAleatorio() {
  const lados = ['ladoA', 'ladoB'];
  const indice = Math.floor(Math.random() * lados.length);
  return lados[indice];
}

let criaMosca = setInterval(function() {
  posicaoRandomica()
}, criaMosquitoTempo);
