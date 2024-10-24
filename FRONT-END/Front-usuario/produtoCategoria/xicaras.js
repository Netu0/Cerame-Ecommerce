const URL_API = 'http://localhost/FRONT-END/api/produto';
const categoriaId = 29; // ID da categoria desejada

document.addEventListener('DOMContentLoaded', function () {
  // Faz a solicitação ao servidor para buscar e exibir os produtos da categoria específica
  fetch(`${URL_API}/get.php`)
    .then(response => response.json())
    .then(data => filtrarProdutosPorCategoria(data))
    .then(filteredData => exibirProdutos(filteredData))
    .catch(error => console.log(error));
});

function filtrarProdutosPorCategoria(data) {
  return data.filter(produto => produto.id_categoria === categoriaId);
}

function exibirProdutos(data) {
  const listaProdutos = document.getElementById('produtos');

  // Limpa a lista de produtos antes de exibir os novos
  listaProdutos.innerHTML = '';

  data.forEach(produto => {
    // Cria um elemento de produto
    const produtoItem = document.createElement('div');
    produtoItem.className = 'produto';

    // Cria a imagem do produto
    const produtoImagem = document.createElement('img');
    produtoImagem.className = 'produto-imagem';
    produtoImagem.src = produto.caminho_imagem;
    produtoItem.appendChild(produtoImagem);

    // Cria o nome do produto
    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome';
    produtoNome.textContent = produto.nome;
    produtoItem.appendChild(produtoNome);

    // Cria o preço do produto
    const produtoPreco = document.createElement('p');
    produtoPreco.className = 'produto-preco';
    produtoPreco.textContent = 'Preço: R$ ' + produto.preco;
    produtoItem.appendChild(produtoPreco);

    // Cria o botão adicionar ao carrinho
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.className = 'adicionar-carrinho';
    botaoAdicionar.textContent = 'Adicionar ao Carrinho';
    produtoItem.appendChild(botaoAdicionar);

    botaoAdicionar.addEventListener('click', () => adicionarAoCarrinho(produto));

    // Adiciona um evento de clique ao elemento de produto para exibir os detalhes do produto
    produtoItem.addEventListener('click', () => exibirDetalhesProduto(produto, produtoItem, listaProdutos));

    listaProdutos.appendChild(produtoItem);
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

