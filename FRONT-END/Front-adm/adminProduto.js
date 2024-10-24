// URL base da API que será consumida
const URL_API = 'http://localhost/FRONT-END/api/produto';

// Elemento HTML Table para inserir os usuários
const tbprod = document.getElementById('tb_produto');


/**
 * Função: showProductList
 * 
 * Objetivo: Invocar a API, solicitando a lista de usuários cadastrados
 * e apresentar na tabela HTML.
 */
const showProductList = () => {
    // Método fetch faz a requisição HTTP para a URL de listagem de usuários    
    fetch(`${URL_API}/get.php`)
        .then(function (response) { // Quando chegar a resposta, converte em JSON
            return response.json();
        })
        .then(function (produtoList) { // Recebe a lista de usuários (do then anterior)

            // Percorre a lista de usuários, adicionando cada um na tabela HTML
            produtoList.forEach(produto => {
                addTableRow(produto); // Adiciona uma linha na tabela HTML
            })
        });

}

/**
 * Método responsável por adicionar uma linha na tabela HTML.
 * 
 * @param {*} produto  produto, podendo conter os atributos nome, descrição, 
 * preço, quantidade, caminho_imagem.
 */
const addTableRow = (produto) => {
    // Criar um objeto que representa uma linha de tabela (elemento <tr>)
    const tr = document.createElement('tr');

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Primeira célula da linha = nome do produto
    const td1 = document.createElement('td');
    td1.innerHTML = produto.nome; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Segunda célula da linha = e-mail do usuário
    const td2 = document.createElement('td');
    td2.innerHTML = produto.descricao; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Terceira célula da linha = data de nascimento do usuário
    const td3 = document.createElement('td');
    td3.innerHTML = produto.preco; // Seta o texto do elemento

    // Criar um objeto que representa uma célula da linha (elemento <td>)
    // Quarta célula da linha = botões de ação

    const td4 = document.createElement('td');
    td4.innerHTML = produto.quantidade;

    //Cria um objeto que representa uma linha
    //quinta célula
    
    const td5 = document.createElement('td');
    const img = document.createElement('img');
    img.src = produto.caminho_imagem; // Define o atributo src da imagem com o caminho
    img.style.maxHeight = '100px'; // Define a altura máxima da imagem para melhor exibição
    td5.appendChild(img); // Adiciona a imagem na célula TD5


    const td6 = document.createElement('td');
    td6.innerHTML = produto.id_categoria;
    
    // Botão delete

    const td7 = document.createElement('td');

    // Criar o botão para remover o usuário
    const btRemove = document.createElement('button');
    btRemove.innerHTML = "Excluir"; // Seta o texto do elemento
    btRemove.classList.add("btn"); // Define uma classe (CSS)
    btRemove.classList.add("btn-sm"); // Define uma classe (CSS)
    btRemove.classList.add('text-right');
    btRemove.classList.add("btn-danger"); // Define uma classe (CSS)
    btRemove.onclick = function () { // Define a ação de clique do botão
        del(tr, produto); // Invoca a função JS para deletar o usuário
    };


    // mudei de td 4 para td 6
    td7.appendChild(btRemove); // Adicionar o botão na célula TD4

    tr.appendChild(td1); // Adiciona a célula TD1 na linha (tr)
    tr.appendChild(td2); // Adiciona a célula TD2 na linha (tr)
    tr.appendChild(td3); // Adiciona a célula TD3 na linha (tr)
    tr.appendChild(td4); // Adiciona a célula TD4 na linha (tr)
    tr.appendChild(td5); // Adiciona a célula TD5 na linha (tr)
    tr.appendChild(td6); // Adiciona a célula TD6 na linha (tr)
    tr.appendChild(td7); // Adiciona a célula TD6 na linha (tr)

    // Adicionando a linha (tr) no corpo <tbody> da tabela
    tbprod.tBodies[0].appendChild(tr);
}

/**
 * Método responsável por adicionar um novo usuário na API e, posteriormente,
 * adicionar na tabela HTML.
 * 
 * @param {*} nome
 * @param {*} descricao 
 * @param {*} preco 
 * @param {*} quantidade
 * @param {*} caminho_imagem
 * @param {*} id_categoria
 */
const add = (nome, descricao, preco, quantidade, caminho_imagem, id_categoria) => {
    // Cria um objeto representando o usuário
    const produto = { nome, descricao, preco, quantidade, caminho_imagem, id_categoria };
    console.log(produto);

    // Invoca a URL da API responsável por adicionar um usuário
    fetch(`${URL_API}/create.php`, {
        method: "POST", // Método HTTP 
        headers: { // Cabeçalhos da requisição
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto) // Corpo da requisição
    })
        .then(async response => {
            // Caso o código de status da resposta seja 200 ou 201, 
            // então transforma o conteúdo da resposta em JSON
            if (response.status == 200 || response.status == 201)
                return response.json();
            // Caso o código de status da resposta seja 400
            // então lança uma exceção, contendo o texto da mensagem
            // devolvida pela API
            else if (response.status == 400)
                throw new Error((await response.json()).message);
            // Caso outro código seja retornado, então transforma
            // a resposta em texto.                
            else
                throw new Error(await response.text());
        })
        .then(data => {
            console.log(data)
            addTableRow(data); // Adiciona o usuário da tabela HTML

            closeFormCadastro();
        }).catch(err => { // Caso apresente erro, entre neste catch
            console.log(err);
            alert(err);
        });
}

/**
 * Método responsável por deletar um usuário na API e remover a linha na tabela.
 * 
 * @param {*} tr Objeto de referência para a linha da tabela
 * @param {*} produto Objeto produto
 */
const del = (tr, produto) => {
    console.log("Deletar o usuário: " + produto.id);

    fetch(`${URL_API}/delete.php?id=${produto.id}`, { method: "POST" })
        .then(response => {
            console.log(response);

            if (response.status == 200)
                tr.remove();
            else
                alert("Falha ao remover " + produto.nome);
        })
        .catch(err => {
            console.log(err);
        });
}




// Invoca o método showProductList() para atualizar a lista de usuários na página
showProductList();



function openFormCadastro() {
    const div = document.getElementById("formCadastro");
    div.style.display = "block";

    resetForm();
}

function closeFormCadastro() {
    const div = document.getElementById("formCadastro");
    div.style.display = "none";

    resetForm();
}

function resetForm() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("caminho_imagem").value = "";
    document.getElementById("id_categoria").value = "";
}