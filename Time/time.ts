var formTime = document.getElementById("formTime") as HTMLFormElement;
var tabelaTime = document.getElementById("tbTimes") as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Time {
    id: number;
    nomeTime: string;
    nomeAbreviado: string;
  }
  
  function atualizarTabelaTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t : Time)  =>{
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
    })
  }

  function editarTime(id:number) {
    const time = times.find((t : Time) => t.id == id);
    if(!time) return;
  
    (document.getElementById("nomeTime") as HTMLInputElement).value = time.nomeTime;
    (document.getElementById("nomeAbreviado") as HTMLInputElement).value = time.nomeAbreviado;
  
    const timeIndex = times.findIndex((t:Time) => t.id == id);
      //valida se encontrou alum item
      if(timeIndex !== -1) {
        //remove da lista
        times.splice(timeIndex, 1);
      }
      salvarLocalStorageTimes()
      atualizarTabelaTimes()
  }

  function removerTime (id:number) {
    const timeIndex = times.findIndex((t:Time) => t.id == id);
      //valida se encontrou alum item
      if(timeIndex !== -1) {
        //remove da lista
        times.splice(timeIndex, 1);
      }
      salvarLocalStorageTimes()
      atualizarTabelaTimes()
  }

  function salvarLocalStorageTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
  }

  function salvarTimes(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novoTime: Time = {
        id: Date.now(),
        nomeTime: (document.getElementById("nomeTime") as HTMLInputElement).value,
        nomeAbreviado: (document.getElementById("nomeAbreviado") as HTMLInputElement).value,
    };
    times.push(novoTime)
    atualizarTabelaTimes()
    salvarLocalStorageTimes()
    formTime.reset()
    alert('Cadastrado com sucesso')
  }

  formTime.addEventListener("submit", salvarTimes)
  atualizarTabelaTimes()