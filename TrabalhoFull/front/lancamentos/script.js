//ID das Informações de Débito
var nmrLancamento = document.querySelector("#nmrLancamento");
var data = document.querySelector("#data");
var descricao = document.querySelector("#descricao");
var valor = document.querySelector("#valor");
var tipo = document.querySelector("#tipo");

//ID das Informações de Crédito
var nmrLancamento = document.querySelector("#nmrLancamentoC");
var data = document.querySelector("#dataC");
var descricao = document.querySelector("#descricaoC");
var valor = document.querySelector("#valorC");
var tipo = document.querySelector("#tipoC");

//Para clonagem
const linhamodeloC = document.querySelector(".linhamodeloC");
const listaLancamentosC = document.querySelector("#lista-lancamentosC");
const linhamodelo = document.querySelector(".linhamodelo");
const listaLancamentos = document.querySelector("#lista-lancamentos");

//Calculo de caixa
var totalCaixa = document.querySelector(".totalCaixa");

// inputs de cadastro
var inputDescricao = document.querySelector("#inpDescricao");
var inputValor = document.querySelector("#inpValor");
var inputTipo = document.querySelector("#inpTipo");

//soma
var listaSoma = document.querySelector(".lista-soma");
var linhamodeloCalc = document.querySelector(".linhamodeloCalc");

var soma = 0;
var sub = 0;

function carregar() {
    fetch("http://localhost:3000/lancamentos/listarLancamentos")

        .then(res => { return res.json() })
        .then(lancamentos => {
            lancamentos.forEach(lancamento => {
                data = new Date(lancamento.data)
                dataFormatada = data.toLocaleDateString('pt-br', { timeZone: "UTC" })

                if (lancamento.tipo == "D") {
                    let linha = linhamodelo.cloneNode(true);
                    linha.classList.remove("model");

                    let colunas = linha.querySelectorAll("td");
                    colunas[0].innerHTML = lancamento.nmr_lancamento;
                    colunas[1].innerHTML = dataFormatada;
                    colunas[2].innerHTML = lancamento.descricao;
                    colunas[3].innerHTML = "R$ " + lancamento.valor;
                    colunas[4].innerHTML = lancamento.tipo;

                    listaLancamentos.appendChild(linha);
                    soma = soma += parseFloat(lancamento.valor);

                }

                if (lancamento.tipo == "C") {
                    let linha = linhamodeloC.cloneNode(true);
                    linha.classList.remove("model");

                    let colunas2 = linha.querySelectorAll("td");
                    colunas2[0].innerHTML = lancamento.nmr_lancamento;
                    colunas2[1].innerHTML = dataFormatada;
                    colunas2[2].innerHTML = lancamento.descricao;
                    colunas2[3].innerHTML = "R$ " + lancamento.valor;
                    colunas2[4].innerHTML = lancamento.tipo;

                    listaLancamentosC.appendChild(linha);
                    sub = sub += parseFloat(lancamento.valor);

                }
            });

            let linha = linhamodeloCalc.cloneNode(true);
            linha.classList.remove("model");

            result = sub - soma;

            linha.querySelector(".total").innerHTML = result;
            listaSoma.appendChild(linha);
        })
}


function filtrarDatas(e) {
    let tab1 = document.querySelector("#lista-lancamentos")
    let tab2 = document.querySelector("#lista-lancamentosC")

    tab1.innerHTML = ""
    tab2.innerHTML = ""

    tab1.appendChild(linhamodelo)

    fetch("http://localhost:3000/lancamentos/listarLancamentos")
        .then(res => { return res.json() })
        .then(lancamentos => {
            lancamentos.forEach(lancamento => {
                let dataL = new Date(lancamento.data)
                dataFormatada = dataL.toLocaleDateString('pt-br', { timeZone: "UTC" })
                let dataE = new Date(e)
                dataFormatadaE = dataE.toLocaleDateString('pt-br', { timeZone: "UTC" })


                console.log(dataFormatada, dataFormatadaE)
                if (dataFormatadaE == dataFormatada) {

                    let linha = linhamodelo.cloneNode(true)
                    linha.classList.remove("model")


                    let colunas2 = linha.querySelectorAll("td");
                    colunas2[0].innerHTML = lancamento.nmr_lancamento;
                    colunas2[1].innerHTML = dataFormatada;
                    colunas2[2].innerHTML = lancamento.descricao;
                    colunas2[3].innerHTML = "R$ " + lancamento.valor;
                    colunas2[4].innerHTML = lancamento.tipo;

                    if (lancamento.tipo === "C") {
                        document.querySelector("#lista-lancamentos").appendChild(linha)

                    } else {
                        document.querySelector("#lista-lancamentosC").appendChild(linha)
                        
                    }

                }

                else if (dataFormatadaE == "todos") {
                    tab1.innerHTML = ""
                    tab2.innerHTML = ""

                    tab1.appendChild(modelo)
                    carregar()
                }
            })
        })
}

function cadastrarLancamentos() {

    let lancamento = {
        "descricao": inputDescricao.value,
        "valor": inputValor.value,
        "tipo": inputTipo.value
    };
    fetch("http://localhost:3000/lancamentos/cadastrarLancamentos", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(lancamento)
    })
        .then(res => { return res.json() })
        .then(resp => {
            if (resp.nmr_lancamento !== undefined) {
                alert("Falha ao lançar");
                window.location.reload();
            } else {
                alert("Lançado");
                window.location.reload();
            }
        })
}