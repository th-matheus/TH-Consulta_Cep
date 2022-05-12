const cepForm = document.getElementById("cep-form");
const result = document.getElementById("result");


function mostraInfoCep(obj) {
    if(obj.cep) {
        result.innerHTML = `
        <p><span>CEP: </span>${obj.cep}</p>
        <p><span>Rua/Av: </span>${obj.logradouro}</p>
        <p><span>Bairro: </span>${obj.bairro}</p>
        <p><span>Cidade: </span>${obj.localidade}</p>
        <p><span>Estado: </span>${obj.uf}</p>
        <p><span>Complemento: </span>${obj.complemento}</p>
        <p><span>DDD: </span>${obj.ddd}</p>
        `;
    } else {
        result.innerHTML = `
        <p>CEP não encontrado em nosso banco de dados.</p>
        <p>Verifique se foi preenchido corretamente!</p>
        `
    };
};

async function handleSubmit(e) {
    e.preventDefault();
    const cep = cepForm[0].value.trim().replace(/ /g, "").replace(/-/g, "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(cep.length);
    if(cep.length !== 8) {
        result.innerHTML = `<p>Digite o CEP direito, seu cabra!</p>`
    } else {
        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                mostraInfoCep(response)
            });
    };
};

cepForm.addEventListener("submit", handleSubmit);