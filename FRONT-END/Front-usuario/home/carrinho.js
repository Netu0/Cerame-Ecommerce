document.addEventListener('DOMContentLoaded', function () {
  // o código dentro da função será executado assim que o documento HTML for completamente carregado

  // recuperando o valor armazenado no localStorage com a chave 'carrinho'
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  // A função JSON.parse() é usada para converter a string JSON armazenada no 
  //localStorage em um objeto JavaScript.  

  const listaCarrinho = document.getElementById('carrinho');
  const valorTotal = document.createElement('p'); // Cria um parágrafo
  valorTotal.className = 'valor-total';

  // Limpa o carrinho antes de exibir os produtos
  listaCarrinho.innerHTML = '';

  carrinho.forEach(produto => {
    // Cria um elemento para exibir o produto no carrinho
    const produtoCarrinho = document.createElement('div');
    produtoCarrinho.className = 'produto-carrinho';

    // Cria a imagem do produto
    const produtoImagem = document.createElement('img');
    produtoImagem.src = produto.caminho_imagem;
    produtoImagem.alt = produto.nome;
    produtoCarrinho.appendChild(produtoImagem);

    // Cria o nome do produto
    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome';
    produtoNome.textContent = produto.nome;
    produtoCarrinho.appendChild(produtoNome);

    // Cria o preço do produto
    const produtoPreco = document.createElement('p');
    produtoPreco.textContent = 'Preço: R$ ' + produto.preco;
    produtoCarrinho.appendChild(produtoPreco);

    // Cria a quantidade do produto
    const produtoQuantidade = document.createElement('p');
    produtoQuantidade.textContent = 'Quantidade: ' + produto.quantidade;
    produtoCarrinho.appendChild(produtoQuantidade);

    // Cria o botão de remover produto
    const botaoRemover = document.createElement('span');
    botaoRemover.textContent = 'Remover';
    botaoRemover.className = 'botao-remover';
    botaoRemover.addEventListener('click', () => removerDoCarrinho(produto));
    produtoCarrinho.appendChild(botaoRemover);

    // Adiciona o elemento do produto ao carrinho
    listaCarrinho.appendChild(produtoCarrinho);
  });

  // Calcula o valor total da compra

  // Método reduce no array carrinho para calcular o valor total dos produtos no carrinho
  const total = carrinho.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
  valorTotal.className = 'valor-total-carrinho';
  valorTotal.textContent = 'Valor Total: R$ ' + total.toFixed(2); //duas casas decimais
  listaCarrinho.appendChild(valorTotal);
});

function removerDoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Remove o produto do carrinho
  carrinho = carrinho.filter(item => item.id !== produto.id);

  // Salva o carrinho atualizado no Local Storage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Recarrega a página para atualizar o carrinho
  location.reload();
}




/*
document.addEventListener('DOMContentLoaded', function () {
  const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
  btnFinalizarCompra.addEventListener('click', function () {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Faça uma solicitação para o servidor para gerar o ID da compra
    fetch('api/compra/get.php', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const idCompra = data.id; // Obtenha o ID gerado pelo servidor

        // Obtenha os IDs dos produtos
        const idsProdutos = carrinho.map(produto => produto.id);

        // Crie o objeto com os dados a serem enviados
        const dadosCompra = {
          idCompra: idCompra,
          idsProdutos: idsProdutos
        };

        // Faça a solicitação para o servidor para adicionar os IDs na tabela
        fetch('api/compra/create.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosCompra)
        })
          .then(response => response.json())
          .then(data => {
            // Lide com a resposta do servidor, se necessário
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  });
});
*/
