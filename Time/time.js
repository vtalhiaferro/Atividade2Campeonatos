"use strict";
var formTime = document.getElementById("formTime");
var tabelaTime = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTabelaTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t) => {
        tabelaTime.innerHTML += `
      <tr>
           <td>${t.nomeTime}</td>
           <td>${t.nomeAbreviado}</td>
           <td>
                <button onclick="editarTime(${t.id})"> Editar </button>
                <button onclick="removerTime(${t.id})"> Remover </button>
           </td>
      </tr>
    `;
    });
}
function editarTime(id) {
    const time = times.find((t) => t.id == id);
    if (!time)
        return;
    document.getElementById("nomeTime").value = time.nomeTime;
    document.getElementById("nomeAbreviado").value = time.nomeAbreviado;
    const timeIndex = times.findIndex((t) => t.id == id);
    //valida se encontrou alum item
    if (timeIndex !== -1) {
        //remove da lista
        times.splice(timeIndex, 1);
    }
    salvarLocalStorageTimes();
    atualizarTabelaTimes();
}
function removerTime(id) {
    const timeIndex = times.findIndex((t) => t.id == id);
    //valida se encontrou alum item
    if (timeIndex !== -1) {
        //remove da lista
        times.splice(timeIndex, 1);
    }
    salvarLocalStorageTimes();
    atualizarTabelaTimes();
}
function salvarLocalStorageTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}
function salvarTimes(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoTime = {
        id: Date.now(),
        nomeTime: document.getElementById("nomeTime").value,
        nomeAbreviado: document.getElementById("nomeAbreviado").value,
    };
    times.push(novoTime);
    atualizarTabelaTimes();
    salvarLocalStorageTimes();
    formTime.reset();
    alert('Cadastrado com sucesso');
}
formTime.addEventListener("submit", salvarTimes);
atualizarTabelaTimes();
