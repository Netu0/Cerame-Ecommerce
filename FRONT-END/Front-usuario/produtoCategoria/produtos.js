const URL_API = 'http://localhost/FRONT-END/api/produto';

document.addEventListener('DOMContentLoaded', function () {
  // Faz a solicitação ao servidor para buscar e exibir os produtos
  fetch(`${URL_API}/get.php`)
    .then(response => response.json())
    .then(data => exibirProdutos(data))
    .catch(error => console.log(error));
});

function exibirProdutos(data) {
  const listaProdutos = document.getElementById('produtos');

  // limpar a lista de produtos antes de exibir os novos
  listaProdutos.innerHTML = '';

  data.forEach(produto => {
    // Cria um elemento de produto
    const produtoItem = document.createElement('div'); // Cria um elemento div para cada produto
    produtoItem.className = 'produto'; // Atribui a classe 'produto' a cada div

    // Cria a imagem do produto
    const produtoImagem = document.createElement('img'); // cria o elemento img
    produtoImagem.className = 'produto-imagem'; // Atribui a classe 'produto-imagem" para cada imagem recebida
    produtoImagem.src = produto.caminho_imagem; // indica o caminho (URL) da imagem que será exibida
    produtoItem.appendChild(produtoImagem);

    // Cria o nome do produto
    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome'; // atribui a classe 'produto-nome' para ser persolanizado 
    produtoNome.textContent = produto.nome; // indica o nome do produto que será exibido
    produtoItem.appendChild(produtoNome); // Adiciona o nome do produto a cada div

    // Cria o preço do produto
    const produtoPreco = document.createElement('p'); // Cria o elemento 
    produtoPreco.className = 'produto-preco'; // Atribui a classe 'produto-preço' 
    produtoPreco.textContent = 'Preço: R$ ' + produto.preco; // Indica o preço do produto que será exibido
    produtoItem.appendChild(produtoPreco); // Adciona o preço a cada div

    // Cria o botão adicionar ao carrinho
    const botaoAdicionar = document.createElement('button'); // Cria o elemento buttom
    botaoAdicionar.className = 'adicionar-carrinho'; // Atribui classe
    botaoAdicionar.textContent = 'Adicionar ao Carrinho'; // Texto que está no botão
    produtoItem.appendChild(botaoAdicionar); // Adiciona o botão a cada div

    // Adiciona um evendo de click para adicionar um produto ao carrinho
    botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(produto))

    // Adiciona um evento de clique ao elemento de produto
    produtoItem.addEventListener('click', () => exibirDetalhesProduto(produto, produtoItem, listaProdutos));
    // exibe os detalhes do produto quando o elemento de produto é clicado

    listaProdutos.appendChild(produtoItem); //adicionando cada iem de produto 
    //(representado pela div produtoItem) como um filho (child element) do elemento listaProdutos


    //sem a lsita de produtos os elementos não seriam exibidos na página html
  });
}

function exibirDetalhesProduto(produto, produtoItem, listaProdutos) { // Função que recebe 3 parâmetros
  // Verifica se o produto já possui um popup aberto
  const possuiPopup = produtoItem.classList.contains('produto-com-popup');
  // Verifica se a classe 'produto-com-popup' está presente na çista de classes do elemento 'produtoItem'


  // IMPEDE QUE O POPUP APAREÇA AO CLICAR NO BOTÃO ADCIONAR CARRINHO
  if (event.target.classList.contains('adicionar-carrinho')) {
    return;
  }


  // Verifica se já existe um popup aberto
  let popup = document.querySelector('.popup'); //utiliza o método querySelector() para selecionar o
  //primeiro elemento no documento HTML que corresponda ao  '.popup'
  if (popup) {
    if (possuiPopup) {
      return; // Retorna se o produto já possui um popup aberto
    } else {
      popup.remove(); // Remove o popup existente
    }
  }

  // Cria um elemento de popup para exibir os detalhes do produto
  popup = document.createElement('div');
  popup.className = 'popup';

  // Cria a imagem do produto
  const produtoImagem = document.createElement('img');
  produtoImagem.className = 'produto-imagem-popup';
  produtoImagem.src = produto.caminho_imagem;
  popup.appendChild(produtoImagem);

  // Cria o nome do produto
  const produtoNome = document.createElement('h3');
  produtoNome.className = 'produto-nome-popup';
  produtoNome.textContent = produto.nome; // Atribui o nome do produto
  popup.appendChild(produtoNome);

  // Cria a descriçãoo do produto
  const produtoDescricao = document.createElement('p');
  produtoDescricao.className = 'produto-descricao-popup';
  produtoDescricao.textContent = produto.descricao;
  popup.appendChild(produtoDescricao);

  // Cria o preço do produto
  const produtoPreco = document.createElement('p');
  produtoPreco.className = 'produto-preco-popup';
  produtoPreco.textContent = 'Preço: R$ ' + produto.preco;
  popup.appendChild(produtoPreco);

  // Cria o botão adicionar ao carrinho
  const botaoAdicionar = document.createElement('button');
  botaoAdicionar.className = 'adicionar-carrinho-popup';
  botaoAdicionar.textContent = 'Adicionar ao Carrinho';
  popup.appendChild(botaoAdicionar);

  // Adiciona a classe 'produto-com-popup' ao elemento de produto
  produtoItem.classList.add('produto-com-popup');

  // Adiciona o popup à lista de produtos
  listaProdutos.appendChild(popup);

  /*
  CLICAR FORA FRACASSADO

  document.addEventListener('click', (event) => {

  if (!popup.contains(event.target)) { ????????????????
    popup.remove();
    produtoItem.classList.remove('produto-com-popup'); 
    document.querySelectorAll('.produto').forEach(item => item.style.pointerEvents = 'auto');
  }
});
  */


  // Adiciona um evento de clique ao popup para fechá-lo
  popup.addEventListener('click', () => {
    popup.remove(); // Remove o popup ao clicar nele
    produtoItem.classList.remove('produto-com-popup'); // Remove a classe 'produto-com-popup' do elemento de produto
    document.querySelectorAll('.produto').forEach(item => item.style.pointerEvents = 'auto'); // Habilita o clique nos produtos novamente
  });

  // RESOLVENDO PROBLEMA DE CLICAR COM O POPUP ABERTO E DEPOIS ELE SUMIR

  // Desabilita o clique nos produtos enquanto o popup está aberto
  document.querySelectorAll('.produto').forEach(item => item.style.pointerEvents = 'none');

  // Adiciona um evento de clique ao botão adicionar ao carrinho
  botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(produto));
}

function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o produto já está no carrinho
  const produtoNoCarrinho = carrinho.find(item => item.id === produto.id);
  if (produtoNoCarrinho) {
    // Incrementa a quantidade do produto no carrinho
    produtoNoCarrinho.quantidade++;
  } else {
    // Adiciona o produto ao carrinho
    produto.quantidade = 1;
    carrinho.push(produto);
  }

  // Salva o carrinho atualizado no Local Storage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

