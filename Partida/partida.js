"use strict";
//Variáveis globais
var formPartida = document.getElementById("formPartida");
var tabelaPartida = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
JSON.parse(localStorage.getItem("campeonatos") || "[]").forEach((c) => {
    document.getElementById("campeonato").innerHTML += `<option>${c.nome}</option>`;
});
function atualizarTabelaPartidas() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
        tabelaPartida.innerHTML += `
      <tr>
           <td>${p.timeMandante}</td>
           <td>${p.timeVisitante}</td>
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
    document.getElementById("timeMandante").value = partida.timeMandante;
    document.getElementById("timeVisitante").value = partida.timeVisitante;
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
        timeMandante: document.getElementById("timeMandante").value,
        timeVisitante: document.getElementById("timeVisitante").value,
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
