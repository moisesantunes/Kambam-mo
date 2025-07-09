const express = require('express')
const engine = require('ejs-mate')
const bodyParser = require('body-parser')
const uniqid = require('uniqid'); 
const fs= require("node:fs/promises")

const app = express()
const port = 3001

app.use(express.static('public'))
/*
TAREFA ={}
nome tarefa=texto
descrição tarefa=texto
id tarefa
data criada=data (do front)
estado =opcoes
subtarefas =[lista]

SUBTAREFAS
nome subtarefa=texto
descrição subtarefa=texto
id subtarefa
id tarefa-referencia
data criada=data (do front)
estado =opcoes

*/


/*
Rotas   

*/
////// config body body-parser
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


/////ejs config
//use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 // so you can render('index')
//////fim config ejs


app.get('/', async (req, res) => {
   let tarefas;
    try {
        tarefas = await fs.readFile("tarefas.json",{encoding:"utf-8"})
//    console.log("dentro  try", JSON.parse(tarefas))
        
    } catch (e) {
       console.log(e)
    }
//    console.log("fora try",tarefas)
    res.render('index',{
        titulo:"Tarefas",
	    tarefas: JSON.parse(tarefas),
	})
})
app.get('/tarefa/:id', async (req, res) => {
   // let tarefa= await tarefas.find((item)=>item.id ==req.params.id)
   let tarefas;
    try {
        tarefas = JSON.parse(await fs.readFile("tarefas.json",{encoding:"utf-8"}))
    } catch (e) {
        res.send("Problema na leitura do arquivo")
    }
    res.render("tarefa",{
        tarefa: await tarefas.find((item)=>item.id ==req.params.id),

        titulo:"Todas as Tarefas",
    })
})


//////ROTAS API
app.get('/api/tarefas', (req, res)=>{
	res.json(tarefas)
})

app.get('/api/tarefa/:id', (req, res)=>{
	let tarefa=""
	tarefa = tarefas.find((item)=>item.id ==req.params.id)
	console.log("carregou")
	res.json(tarefa)
})
app.post("/api/novatarefa", async (req,res)=>{
   let tarefas;
   
   req.body.id=uniqid()
   try {
        tarefas = JSON.parse(await fs.readFile("tarefas.json",{encoding:"utf-8"}))
        tarefas.push(req.body)
        await fs.writeFile("tarefas.json",JSON.stringify(tarefas))
    } catch (e) {
        console.log(e)
    }
   // console.log(req.body)
    res.json(req.body)
})

app.post("/api/edittarefa",async (req,res)=>{
    let tarefas;
    let tarefa;
    
    try {
        tarefas = JSON.parse(await fs.readFile("tarefas.json",{encoding:"utf-8"}))
        tarefa = await tarefas.find((item)=>item.id ==req.body.id)
        tarefa.tarefa = req.body.tarefa
        tarefa.descrição= req.body.descrição
        tarefa.estado=req.body.estado
        await fs.writeFile("tarefas.json",JSON.stringify(tarefas))
   
    } catch (e) {
        console.log(e)
    }
    console.log("tarefa",tarefa)
    res.json(req.body)
      
})
///////////



app.listen(port, () => {
    console.log(`ta rodando na porta ${port}`)
})
	  

