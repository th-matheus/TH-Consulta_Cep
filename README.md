# Atividade: Consultando CEP na API ViaCEP
Antes de realizar essa atividade, faça um colone desse repositorio para ter a estrutra básica do projeto.

## Objetivo
Nessa atividade vamos realizar requisições com dados obtidos por meio de um formulário. Utilizaremos a API ViaCEP para fazer consulta em um CEP passado por um <form>.

## Passo a passo
Vá até o arquivo ```script.js``` para começarmos.

1. Armazene o elemento form em uma variável. Você pode utilizar seu id, ```'cep-form'``` para isso.
```js
const cepForm = document.getElementById("cep-form")
```
2. O elemento ```<form>``` tem um evento chamado submit, ou seja, de envio do formulário. Vamos adicionar um EventListener no elemento que armazenamos acima para monitorar quando acontecer o evento submit.
```js
cepForm.addEventListener("submit", callback)
```
3. Agora crie uma função callback para o evento submit, chame ela de handleSubmit().
4. O <form> tem um comportamento de recarregar a página assim que um submit acontece. Utilize o método preventDefault() para prevenir esse comportamento.
```js
async function handleSubmit(event) {
    event.preventDefault();
}
```
5. Se você der um console.log() da variável cepForm, notará que ele retorna um elemento <form>, mas também é possível acessar os filhos desse elemento como se fosse uma array. Seguindo esse raciocínio vamos buscar o valor do CEP passado no input.
```js
async function handleSubmit(event) {
    event.preventDefault();
    const input = cepForm[0];
    const inputValue = input.value;
}
```
6. Agora utilize o cep passado pelo usuário, para fazer a requisição na API, da seguinte forma:
```js
async function handleSubmit(event) {
    event.preventDefault();
    const input = cepForm[0];
    const inputValue = input.value;
    const response = await fetch(
    `https://viacep.com.br/ws/${inputValue}/json/unicode/`
  )
    .then((res) => res.json())
    .catch(() => {});
}
```
7. Chame a função handleSubmit no EventListener que você criou.

## Agora é com você
Você fez todos os passos para realizar a requisição e obter a resposta. Agora mostre no documento o logradouro, bairro e uf que são alguns valores de uma resposta válida.

### Dicas!
- Uma boa dica é realizar um console.log() na variável response.
- Se tiver alguma dúvida sobre a resposta da requisição, utilize o Insomnia para explorar a API.
