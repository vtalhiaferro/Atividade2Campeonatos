"use strict";
//Variáveis globais
var formPartida = document.getElementById("formPartida");
var tabelaPartida = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
JSON.parse(localStorage.getItem("campeonatos") || "[]").forEach((c) => {
    document.getElementById("campeonato").innerHTML += `<option>${c.nome}</option>`;
});
JSON.parse(localStorage.getItem("times") || "[]").forEach((t) => {
    document.getElementById("time1").innerHTML += `<option>${t.nomeTime}</option>`;
});
JSON.parse(localStorage.getItem("times") || "[]").forEach((t) => {
    document.getElementById("time2").innerHTML += `<option>${t.nomeTime}</option>`;
});
function atualizarTabelaPartidas() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
        tabelaPartida.innerHTML += `
      <tr>
           <td>${p.time1}</td>
           <td>${p.time2}</td>
           <td>${p.campeonato}</td>
           <td>${p.dataJogo}</td>
           <td>
                <button onclick="editarPartida(${p.id})"> Editar </button>
                <button onclick="removerPartida(${p.id})"> Remover </button>
           </td>
      </tr>
    `;
    });
}
function editarPartida(id) {
    const partida = partidas.find((p) => p.id == id);
    if (!partida)
        return;
    document.getElementById("time1").value = partida.time1;
    document.getElementById("time2").value = partida.time2;
    document.getElementById("campeonato").value = partida.campeonato;
    document.getElementById("dataJogo").value = partida.dataJogo;
    const partIndex = partidas.findIndex((p) => p.id == id);
    //valida se encontrou alum item
    if (partIndex !== -1) {
        //remove da lista
        partidas.splice(partIndex, 1);
    }
    salvarLocalStoragePartidas();
    atualizarTabelaPartidas();
}
function removerPartida(id) {
    const partIndex = partidas.findIndex((p) => p.id == id);
    //valida se encontrou alum item
    if (partIndex !== -1) {
        //remove da lista
        partidas.splice(partIndex, 1);
    }
    salvarLocalStoragePartidas();
    atualizarTabelaPartidas();
}
function salvarLocalStoragePartidas() {
    let partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoPartida = {
        id: Date.now(),
        time1: document.getElementById("time1").value,
        time2: document.getElementById("time2").value,
        campeonato: document.getElementById("campeonato").value,
        dataJogo: document.getElementById("dataJogo").value,
    };
    partidas.push(novoPartida);
    atualizarTabelaPartidas();
    salvarLocalStoragePartidas();
    formPartida.reset();
    alert('Cadastrado com sucesso');
}
formPartida.addEventListener("submit", salvarPartida);
atualizarTabelaPartidas();
