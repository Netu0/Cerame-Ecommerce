
// URL base da API que será consumida
const URL_API = 'http://localhost/FRONT-END/api/usuario';

// Elemento HTML Table para inserir os usuários
const tbprod = document.getElementById('tb_usuario');


const URL = "http://localhost/FRONT-END/api/auth";

function register() {



    const add = (nome, email, nascimento, senha) => {
        // Cria um objeto representando o usuário
        const usuario = { nome, email, nascimento, senha};
        console.log(usuario);
    
        // Invoca a URL da API responsável por adicionar um usuário
        fetch(`${URL_API}/create.php`, {
            method: "POST", // Método HTTP 
            headers: { // Cabeçalhos da requisição
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario) // Corpo da requisição
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
}
