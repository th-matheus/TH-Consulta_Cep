const ruaForm = document.getElementById("ruaForm");
const resultRuaCont = document.getElementById("resultRuaContainer");
const resultRua = document.getElementById("resultRua");

function criaCardEndereço(obj) {
    resultRuaCont.innerHTML += `
    <div class="cardEndereco">
        <p><span>CEP: </span>${obj.cep}</p>
        <p><span>Rua/Av: </span>${obj.logradouro}</p>
        <p><span>Bairro: </span>${obj.bairro}</p>
        <p><span>Cidade: </span>${obj.localidade}</p>
        <p><span>Estado: </span>${obj.uf}</p>
        <p><span>Complemento: </span>${obj.complemento}</p>
        <p><span>DDD: </span>${obj.ddd}</p>
    </div>
    `;
};

function mostraInfoCepRua(arr) {
    if(arr.length !== 0) {
        resultRuaCont.innerHTML = "";
        arr.forEach((endereco) => {
            criaCardEndereço(endereco);
        });
    } else {
        resultRuaCont.innerHTML = `
        <div class="cardEndereco">Endereço não Encontrado</div>
        `;
    };
};

function filtraPorBairro(arr, bairro) {
    return arr.filter(endereco => {
        let bairroResult = endereco.bairro.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return bairroResult === bairro;
    });
};

function handleRuaSubmit(e) {
    e.preventDefault();
    const estado = ruaForm[3].value;
    const cidade = ruaForm[1].value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const rua = ruaForm[0].value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const bairro = ruaForm[2].value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`;

    console.log(bairro);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if(bairro.length !== 0) {
                const filtro = filtraPorBairro(response, bairro)
                mostraInfoCepRua(filtro);
            } else {
                mostraInfoCepRua(response);
            };
        });
};

ruaForm.addEventListener("submit", handleRuaSubmit);