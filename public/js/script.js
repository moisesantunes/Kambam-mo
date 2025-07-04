async function fetchGet(url){
   
    const response = await fetch(url)
    const data = await response.json()
   // console.log("os trampos sao: ",data)
    return data
    /*
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        return data;
    })
    */
   
}




function cardBasic(tarefa){
  // document.getElementById(id).innerHTML+=
  let card = String.raw`<div class="${tarefa.estado}">
        <h3>${tarefa.tarefa} </h3>
        <a href="javascript:void(0)" onclick="alert('${tarefa.id}')">${tarefa.id}</a>
    </div>`
    return card;
}
function cardDetail(id){
    fetchGet("/api/tarefa/"+id)
    .then((res)=>{
        alert(res.tarefa)
    })
    return false;
}
