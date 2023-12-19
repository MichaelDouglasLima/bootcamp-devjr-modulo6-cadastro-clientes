
var clientes = [];

function validarNumero() {
    numero = document.getElementById("inputNumber").value;

    if (numero == "") {
        mostrarErro("Informe um CEP Válido!");
        preencherDados({});
        document.getElementById("inputNumber").disabled = true;
    } else {
        save();
    }
}

// Salvar um Cliente
function save() {
    var novoCliente = {
        id: clientes.length + 1,
        name: document.getElementById("inputName").value,
        sobrenome: document.getElementById("inputSobrenome").value,
        cep: document.getElementById("inputCEP").value,
        address: document.getElementById("inputAddress").value,
        number: document.getElementById("inputNumber").value,
        neighborhood: document.getElementById("inputNeighborhood").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value
    };

    addNewRow(novoCliente);
    clientes.push(novoCliente);
    document.getElementById("formCliente").reset();
    document.getElementById("inputNumber").disabled = true;
}


function addNewRow(cliente) {
    // Acessar a Tabela de Clientes
    var table = document.getElementById("clientesTable");

    // Variável que Insere Dados na Tabela
    var newRow = table.insertRow();

    // Inserir id do Cliente
    var idNode = document.createTextNode(cliente.id);
    newRow.insertCell().appendChild(idNode);

    // Inserindo Nome Completo do Cliente
    var nomeCompletoNode = document.createTextNode(cliente.name + " " + cliente.sobrenome);
    var newNameCell = newRow.insertCell();
    newNameCell.appendChild(nomeCompletoNode);

    // Inserindo Endereco e Número do Cliente
    var addressNumberNode = document.createTextNode(cliente.address + ", " + cliente.number);
    var newAddressCell = newRow.insertCell();
    newAddressCell.appendChild(addressNumberNode);

    // Inserindo CEP do Cliente
    var cepNode = document.createTextNode(cliente.cep);
    newRow.insertCell().appendChild(cepNode);
    
    // Inserindo Bairro do Cliente
    var neighborhoodNode = document.createTextNode(cliente.neighborhood);
    newRow.insertCell().appendChild(neighborhoodNode);

    // Inserindo Cidade do Cliente
    var cityNode = document.createTextNode(cliente.city);
    newRow.insertCell().appendChild(cityNode);

    // Inserindo Estado do Cliente
    var stateNode = document.createTextNode(cliente.state);
    newRow.insertCell().appendChild(stateNode);
}

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