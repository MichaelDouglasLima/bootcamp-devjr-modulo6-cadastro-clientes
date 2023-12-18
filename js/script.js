
// Verificando o tamanho do CEP antes de fazer a requisição
function validarCEP() {
    var CEP = document.getElementById("inputCEP").value;

    CEP = CEP.replace("-", "");

    if (CEP.length < 8) {
        mostrarErro("CEP inválido");
        preencherDados({});
        document.getElementById("inputNumber").disabled = true;

    } else {
        mostrarErro("");
        pesquisarCEP(CEP);
    }
}

function pesquisarCEP(cep) {
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    $.getJSON(url, (response) => {

        // Verificando explicitamente se o CEP informado não existe
        if (response.erro == true) {
            mostrarErro("Não encontrado");
            preencherDados({});
            document.getElementById("inputNumber").disabled = true;

        } else {
            mostrarErro("");
            preencherDados(response);
            document.getElementById("inputNumber").disabled = false;
        }

    });
}

function preencherDados(response) {
    document.getElementById("inputAddress").value = response.logradouro || "";
    document.getElementById("inputNeighborhood").value = response.bairro || "";
    document.getElementById("inputCity").value = response.localidade || "";
    document.getElementById("inputState").value = response.uf || "";
    document.getElementById("inputNumber").value = "";
}

function mostrarErro(msg) {
    document.getElementById("error").innerHTML = msg;
}