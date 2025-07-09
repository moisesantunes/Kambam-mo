async function fetchGet(url){
    const response = await fetch(url)
    const data = await response.json()
    return data
}
///criar tarefa
async function fetchPostNova(){
    let obj= {
        tarefa:"Nova Tarefa (editar)",
        descrição:"Detalhes da tarefa",
        criadaem: new Date(),
        estado:"criada"
    }
    
    
    await fetch("/api/novatarefa", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response =>response.json()) 
    .then((tarefa) => {
        console.log("trefa salva",tarefa)
        //loadcard(tarefa.id)
        
    })
    .catch(err => console.log("err",err))
}

/////editar tarefa

async function fetchPostEdit(){
    let obj= {
        tarefa:document.getElementById("cabeca").innerText,
        descrição:document.getElementById("corpo").innerHTML,
        criadaem: document.getElementById("criadaem").innerText,
        estado:"criada",
        id:document.getElementById("id").innerText,
        
    }
    const estadot= document.getElementsByName("estado")
 for (var i = 0; i < estadot.length; i++) {
     if(estadot[i].checked){
         obj.estado=estadot[i].value
         estadot[i].checked=true
     }
 }
    await fetch("/api/edittarefa", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })

    .then(response =>response.json()) 
    .then((json) => {
        console.log(json.estado)
        loadcard(json.id)
    })
    .catch(err => console.log("err",err))
    
}




/*
function cardBasic(tarefa){
  // document.getElementById(id).innerHTML+=
  let card =`<div onclick="cardDetail('${tarefa.id}')" class="${tarefa.estado}">
        <h3>${tarefa.tarefa} </h3>
        <p class="">${tarefa.descrição}</p>
    </div>`
    return card;
}
*/
/*
function cardDetail(id){
    fetchGet("/api/tarefa/"+id)
    .then((res)=>{
        alert(res.id)
        let card =`<div onclick="cardDetail('${res.id}')" class="${res.estado}">
            <h3>${res.tarefa} </h3>
            <p class="">${res.descrição}</p>
            <p class="">${res.criadaem}</p>
        </div>`
        const parser =new DOMParser().parseFromString(card,"text/html")
    document.getElementById("fichario").innerHTML = parser.body.innerHTML
        
    })
    return false;
}
*/

function loadcard(url){
   location.href="/tarefa/"+url
}