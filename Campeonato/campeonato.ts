//Variáveis globais
var formCampeonato = document.getElementById(
  "formCampeonato"
) as HTMLFormElement;
var tabelaCampeonato = document.getElementById("tbCampeonatos") as HTMLElement;
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");

interface Campeonato {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

function atualizarTabela() {
  tabelaCampeonato.innerHTML = "";
  campeonatos.forEach((c : Campeonato)  =>{
    tabelaCampeonato.innerHTML += `
    <tr>
         <td>${c.nome}</td>
         <td>${c.categoria}</td>
         <td>${c.tipo}</td>
         <td>${c.dataInicio}</td>
         <td>${c.dataFim}</td>
         <td>
              <button onclick="editarCampeonato(${c.id})"> Editar </button>
              <button onclick="removerCampeonato(${c.id})"> Remover </button>
         </td>
    </tr>
  `;
  })
}

function editarCampeonato(id:number) {
  const campeonato = campeonatos.find((c : Campeonato) => c.id == id);
  if(!campeonato) return;

  (document.getElementById("nome") as HTMLInputElement).value = campeonato.nome;
  (document.getElementById("categoria") as HTMLSelectElement).value = campeonato.categoria;
  (document.getElementById("tipo") as HTMLSelectElement).value = campeonato.tipo;
  (document.getElementById("dataInicio") as HTMLInputElement).value = campeonato.dataInicio;
  (document.getElementById("dataFim") as HTMLInputElement).value = campeonato.dataFim;

  const campIndex = campeonatos.findIndex((c:Campeonato) => c.id == id);
    //valida se encontrou alum item
    if(campIndex !== -1) {
      //remove da lista
      campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage()
    atualizarTabela()
}

function removerCampeonato (id:number) {
  const campIndex = campeonatos.findIndex((c:Campeonato) => c.id == id);
    //valida se encontrou alum item
    if(campIndex !== -1) {
      //remove da lista
      campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage()
    atualizarTabela()
}

function salvarLocalStorage() {
  let campeonatosSalvar = JSON.stringify(campeonatos);
  localStorage.setItem("campeonatos", campeonatosSalvar);
}

function salvar(event:Event) {
  event?.preventDefault(); //cancelar o disparo do evento
  const novoCampeonato: Campeonato = {
    id: Date.now(),
    categoria: (document.getElementById("categoria") as HTMLSelectElement).value,
    dataFim: (document.getElementById("dataFim") as HTMLInputElement).value,
    dataInicio: (document.getElementById("dataInicio") as HTMLInputElement).value,
    nome: (document.getElementById("nome") as HTMLInputElement).value,
    tipo: (document.getElementById("tipo") as HTMLSelectElement).value,

  };
  campeonatos.push(novoCampeonato)
  atualizarTabela()
  salvarLocalStorage()
  formCampeonato.reset()
  alert('Cadastrado com sucesso')
}

formCampeonato.addEventListener("submit", salvar)
atualizarTabela()