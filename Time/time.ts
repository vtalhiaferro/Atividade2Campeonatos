var formTime = document.getElementById("formTime") as HTMLFormElement;
var tabelaTime = document.getElementById("tbTimes") as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Time {
    id: number;
    nomeTime: string;
    nomeAbreviado: string;
  }
  
  function atualizarTabelaTime() {
    tabelaTime.innerHTML = "";
    times.forEach((t : Time)  =>{
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
    })
  }