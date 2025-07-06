async function fetchGet(url){
    const response = await fetch(url)
    const data = await response.json()
    return data
}


function cardBasic(tarefa){
  // document.getElementById(id).innerHTML+=
  let card =`<div onclick="cardDetail('${tarefa.id}')" class="${tarefa.estado}">
        <h3>${tarefa.tarefa} </h3>
        <p class="">${tarefa.descrição}</p>
    </div>`
    return card;
}
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
