"use strict";
var formTime = document.getElementById("formTime");
var tabelaTime = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTabelaTime() {
    tabelaTime.innerHTML = "";
    times.forEach((t) => {
        tabelaTime.innerHTML += `
      <tr>
           <td>${t.nomeTime}</td>
           <td>${t.nomeAbreviado}</td>
           <td>
                <button onclick="editarCampeonato(${t.id})"> Editar </button>
                <button onclick="removerCampeonato(${t.id})"> Remover </button>
           </td>
      </tr>
    `;
    });
}
