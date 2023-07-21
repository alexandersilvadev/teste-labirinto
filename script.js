const modeloLabirinto = [
  "WWWWWWWWWWWWWWWWWWWWW", // linha 0
  "W   W     W     W W W", // linha 1
  "W W W WWW WWWWW W W W", // linha 2
  "W W W   W     W W   W", // linha 3
  "W WWWWWWW W WWW W W W", // linha 4
  "W         W     W W W", // linha 5
  "W WWW WWWWW WWWWW W W", // linha 6
  "W W   W   W W     W W", // linha 7
  "W WWWWW W W W WWW W F", // linha 8
  "S     W W W W W W WWW", // linha 9
  "WWWWW W W W W W W W W", // linha 10
  "W     W W W   W W W W", // linha 11
  "W WWWWWWW WWWWW W W W", // linha 12
  "W       W       W   W", // linha 13
  "WWWWWWWWWWWWWWWWWWWWW", // linha 14
];

// Nunca vai ser atualizado, é uma referencia da posicao inicial.
const posicaoInicial = { linha: 9, coluna: 0 };
// Vai ser atualizado conforme o movimento seja valido
let posicaoAtual = { linha: 9, coluna: 0 };
let movimentos = 0;

function criarLabirinto(labirinto, posicao) {
  // Div final que receberá todas as linhas
  const divLabirinto = document.querySelector("#labirinto");
  divLabirinto.innerHTML = "";

  for (let linha = 0; linha < labirinto.length; linha++) {
    // Criando cada 'linha' do tabuleiro
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    for (let coluna = 0; coluna < labirinto[linha].length; coluna++) {
      // Criando cada 'casa' do tabuleiro
      const celula = document.createElement("div");
      celula.classList.add("celula");

      const celulaAtual = labirinto[linha][coluna];

      if (celulaAtual === "W") {
        // 1 - Quando a celula é W
        celula.classList.add("parede");
      } else if (linha === posicao.linha && coluna === posicao.coluna) {
        // 2 - Quando a celula é "S"
        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        // 3 - Quando a celula é "F"
        celula.classList.add("chegada");
      } else if (celulaAtual === " ") {
        // 4 - Quando a celula é " "
        celula.classList.add("caminho");
      }

      // Adicionando as 'casas' (colunas) a linha
      divLinha.appendChild(celula);
    }
    // Adicionando as linhas ao labirinto
    divLabirinto.appendChild(divLinha);
  }
}

// NOVO: Adição de mais um parâmetro (labirinto) para a função.
function validarMovimento(labirinto, posicao) {
  const totalLinhas = labirinto.length; // 15
  const totalColunas = labirinto[0].length; // 21
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  if (
    linha < 0 ||
    linha >= totalLinhas ||
    coluna < 0 ||
    coluna >= totalColunas ||
    labirinto[linha][coluna] === "W"
  ) {
    return false;
  }

  // if (modeloLabirinto[linha][coluna] === "W") {
  //   return false;
  // }

  return true;
}

function moverJogador(labirinto, teclaPressionada) {
  // Armazena um 'historico' do movimento pretendido pelo jogador
  const novaPosicao = {
    linha: posicaoAtual.linha,
    coluna: posicaoAtual.coluna,
  };
  // Identificando a tecla apertada;
  if (teclaPressionada === "ArrowUp") {
    novaPosicao.linha -= 1;
    // console.log(novaPosicao);
  } else if (teclaPressionada === "ArrowDown") {
    novaPosicao.linha += 1;
    // console.log(novaPosicao);
  } else if (teclaPressionada === "ArrowLeft") {
    novaPosicao.coluna -= 1;
    // console.log(novaPosicao);
  } else if (teclaPressionada === "ArrowRight") {
    novaPosicao.coluna += 1;
    // console.log(novaPosicao);
  }

  if (validarMovimento(labirinto, novaPosicao)) {
    /* 
      Caso o movimento seja valido, atualiza a referencia de posicao anterior
      do jogador.
    */
    posicaoAtual = novaPosicao;

    // Atualizar movimentos
    movimentos++; // movimentos += 1

    const encontrouChegada = verificarCondicaoDeVitoria(labirinto, novaPosicao);

    if (encontrouChegada) {
      console.log("CHEGOU AO FIM PARABENS");
      alternarResultado();
    }

    criarLabirinto(labirinto, posicaoAtual);
  }
  // Mostra a posição atual do jogador no tabuleiro.
  console.log(posicaoAtual);
}

function alternarResultado() {
  const containerResultado = document.querySelector("#container-resultado");
  // console.log(containerResultado);
  if (containerResultado.classList.contains("esconder")) {
    containerResultado.classList.remove("esconder");
    containerResultado.classList.add("mostrar");
  } else {
    // else if containerResultado.classList.contains("mostrar")
    containerResultado.classList.remove("mostrar");
    containerResultado.classList.add("esconder");
  }

  const pResultado = document.querySelector("#resultado");
  pResultado.innerText = `Você venceu em ${movimentos} movimento(s)!!`;
}

function verificarCondicaoDeVitoria(labirinto, posicao) {
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  // if (labirinto[posicao.linha][posicao.coluna] === 'F'){
  // if (labirinto[linha][coluna] === "F") {
  //   return true;
  // }

  // return false;

  return labirinto[linha][coluna] === "F";
}

document.addEventListener("keydown", function (evento) {
  // NOVO: Desabilitando a rolagem da pagina pelas teclas de seta do teclado.
  evento.preventDefault();
  const teclaPressionada = evento.key;

  moverJogador(modeloLabirinto, teclaPressionada);
});

const btnResetarJogo = document.querySelector("#btn-resetar-jogo");
btnResetarJogo.addEventListener("click", function (evento) {
  console.log("Botão de Resetar funcionando");

  // Resetando a posição inicial.
  posicaoAtual = posicaoInicial;

  // Resetando a quantidade de movimentos
  movimentos = 0;

  // Esconder section de resultado
  alternarResultado();

  /*
    Tentar implementar a tag DIALOG para mostrar o resultado.
  */

  criarLabirinto(modeloLabirinto, posicaoInicial);
});

/*
  Adicionar tag img dentro das divs celula para armazenar a imagem
  do jogador no HTML.
*/

criarLabirinto(modeloLabirinto, posicaoAtual);
