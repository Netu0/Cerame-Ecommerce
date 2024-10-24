const URL = "http://localhost/FRONT-END/api/auth";

function login() {
    const fEmail = document.getElementById("email");
    const fSenha = document.getElementById("senha");

    const user = {
        username: fEmail.value,
        password: fSenha.value,
    };

    console.log(user)

    fetch(`${URL}/auth.php`, {
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        // mode: "cors"
    })
        .then(response => {
            // Verifica o status da resposta
            if (response.ok) {
                // Se o status for OK, obtém os dados JSON da resposta
                return response.json();
            } else {
                // Se o status for diferente de OK, lança um erro com a mensagem correspondente
                throw new Error("Email ou Senha Inválidos");
            }
        })
        .then(data => {
            // Verifica se o token não é nulo
            if (data.token !== null) {
                
                // Armazena o token no localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.usuario));

                const user = JSON.parse(localStorage.getItem("user"));
                if (user.adm && user.adm === 1) {
                    window.location.replace("http://localhost/FRONT-END/Front-adm/admin_Inicial.html");
                } else {
                    window.location.replace("http://localhost/FRONT-END/front-usuario/home/index.html");
                }

            } else {
                // Exibe um alerta informando que o email ou senha são inválidos
                alert("Email ou Senha Inválidos");
            }
        })
        .catch(err => {
            console.log(err);
            // Exibe um alerta genérico para qualquer outro erro
            alert("Erro ao fazer a solicitação");
        });
}
