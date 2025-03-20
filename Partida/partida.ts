//Variáveis globais
var formPartida = document.getElementById("formPartida") as HTMLFormElement;
var tabelaPartida = document.getElementById("tbPartidas") as HTMLElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

JSON.parse(localStorage.getItem("campeonatos") || "[]").forEach((c: Campeonato) => {
    (document.getElementById("campeonato") as HTMLFormElement).innerHTML += `<option>${c.nome}</option>`
});

interface Partida {
  id: number;
  timeMandante: string;
  timeVisitante: string;
  campeonato: string;
  dataJogo: string;
}


function atualizarTabelaPartidas() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p : Partida)  =>{
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
    })
}


function editarPartida(id:number) {
    const partida = partidas.find((p : Partida) => p.id == id);
    if(!partida) return;
  
    (document.getElementById("timeMandante") as HTMLInputElement).value = partida.timeMandante;
    (document.getElementById("timeVisitante") as HTMLInputElement).value = partida.timeVisitante;
    (document.getElementById("campeonato") as HTMLSelectElement).value = partida.campeonato;
    (document.getElementById("dataJogo") as HTMLInputElement).value = partida.dataJogo;
  
    const partIndex = partidas.findIndex((p:Partida) => p.id == id);
      //valida se encontrou alum item
      if(partIndex !== -1) {
        //remove da lista
        partidas.splice(partIndex, 1);
      }
      salvarLocalStoragePartidas()
      atualizarTabelaPartidas()
  }


  function removerPartida (id:number) {
    const partIndex = partidas.findIndex((p:Partida) => p.id == id);
      //valida se encontrou alum item
      if(partIndex !== -1) {
        //remove da lista
        partidas.splice(partIndex, 1);
      }
      salvarLocalStoragePartidas()
      atualizarTabelaPartidas()
  }


  function salvarLocalStoragePartidas() {
    let partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
  }
  

  function salvarPartida(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novoPartida: Partida = {
        id: Date.now(),
        timeMandante: (document.getElementById("timeMandante") as HTMLInputElement).value,
        timeVisitante: (document.getElementById("timeVisitante") as HTMLInputElement).value,
        campeonato: (document.getElementById("campeonato") as HTMLSelectElement).value,
        dataJogo: (document.getElementById("dataJogo") as HTMLInputElement).value,
    };
    partidas.push(novoPartida)
    atualizarTabelaPartidas()
    salvarLocalStoragePartidas()
    formPartida.reset()
    alert('Cadastrado com sucesso')
  }

  formPartida.addEventListener("submit", salvarPartida)
  atualizarTabelaPartidas()