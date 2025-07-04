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

const tarefas=[
    {
    tarefa:"fazer alguma coisa",
    descrição:"uma coisa a ser feita",
    id:uniqid(),
    criadaem:"01/01/2025",
    estado:"criada",/* ["criada","iniciada","concluida"] */
},
{
    tarefa:"outra coisa",
    descrição:"uma coisa a ser feita",
    id:uniqid(),
    criadaem:"01/01/2025",
    estado:"feita",/* ["criada","iniciada","concluida"] */
},
{
    tarefa:"so coisas",
    descrição:"uma coisa a ser feita",
    id:uniqid(),
    criadaem:"01/01/2025",
    estado:"iniciada",/* ["criada","iniciada","concluida"] */
}

    ]
/*
Rotas   

*/
////// config body body-parser
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


/////ejs config
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 // so you can render('index')
//////fim config ejs



app.get("/estatisticas",async (req,res)=>{
    res.render("estatisticas",{
        titulo:"ESTATISTICAS",
        dados:"dados",
    })
})

app.get('/', async (req, res) => {
    let tarefas;
    try {
        tarefas= await fs.readFile("tarefas.json",{encoding:"utf-8"})
    } catch (e) {
       console.log(e)
    }
    res.render('index',{
        titulo:"Tarefas",
	    //tarefas: JSON.parse(tarefas),
	    tarefas:tarefas
	})
})


app.get('/novatarefa', (req, res)=>{
	res.render('formTarefa',{
	    titulo:"Nova Tarefa",
	    tarefas:tarefas,
	})
})

//////ROTAS API
app.get('/api/tarefas', (req, res)=>{
	res.json(tarefas)
})

app.get('/api/tarefa/:id', (req, res)=>{
	let tarefa=""
	tarefa = tarefas.find((item)=>item.id ==req.params.id)
	
	res.json(tarefa)
})





///////////
app.get('/tarefas', async (req, res) => {
    let tarefas;
    try {
        tarefas = JSON.parse(await fs.readFile("tarefas.json",{encoding:"utf-8"}))
    } catch (e) {
        res.send("Problema na leitura do arquivo")
    }
    res.render("tarefas",{
        tarefas:tarefas,
        titulo:"Todas as Tarefas",
    })
})

/*
app.post("/novatarefa", async (req, res)=>{
    let tarefas;
    let diass=""
    let obj={}
    obj.id=uniqid()
    obj.nome= req.body.nome;
    obj.rg=req.body.rg
    obj.pags=[]
    obj.diasq=0
    obj.diasd=[]
    if (typeof req.body.diasd=="string") {
        obj.diasd=[req.body.diasd]
        obj.diasq=obj.diasd.length
        obj.diass=req.body.diasd
    }
    if (typeof req.body.diasd =="object") {
        obj.diasd= req.body.diasd;
        obj.diasq= req.body.diasd.length;
        obj.diass=req.body.diasd.join(",")
    }
    passageiros.push(obj)
    try {
        pessoas = JSON.parse(await fs.readFile("passageiros.json",{encoding:"utf-8"}))
        pessoas.push(obj)
        await fs.writeFile("passageiros.json",JSON.stringify(pessoas))
    } catch (e) {
        console.log(e)
    }
    res.redirect("/passageiro/"+obj.id)
})


app.get('/passageiro/:id', async(req,res)=>{
    if (req.params.id == undefined) {
      res.redirect("/")  
    }
    let pessoa;
    try {
        let pessoas = JSON.parse(await fs.readFile("passageiros.json",{encoding:"utf-8"}))
        pessoa = pessoas.find((item)=>item.id ==req.params.id)
    
        
    } catch (e) {
        console.log(e)
    }
    res.render("formeditpassageiro",{
        titulo:"Editar passageiro",
        pessoa:pessoa,
        evento:evento,
        lista:listadias
	})
})
app.post('/editpassageiro/:id', async (req,res)=>{
    let pessoas;
    try {
        pessoas = JSON.parse(await fs.readFile("passageiros.json",{encoding:"utf-8"}))
    } catch (e) {}
    let pessoa = pessoas.find((item)=>item.id ==req.params.id)
    let total =0
    pessoa.nome= req.body.nome;
    pessoa.rg=req.body.rg
    pessoa.obs= req.body.obs || ""
    if (!req.body.pags) {pessoa.pags=[]}
    if (typeof req.body.pags == "string") {
        pessoa.pags= [req.body.pags]
    }
    if (typeof req.body.pags == "object") {
        pessoa.pags= req.body.pags
    }
    if (req.body.parcela) {
            pessoa.pags.push(req.body.parcela);
    }
    for (var i = 0; i < pessoa.pags.length; i++) {
        total+=Number(pessoa.pags[i])
    }
    pessoa.total=total
    pessoa.diasq=0
    pessoa.diasd=[]
    pessoa.diass=""
    if (typeof req.body.diasd=="string") {
        pessoa.diasd=[req.body.diasd]
        pessoa.diasq=pessoa.diasd.length
        pessoa.diass=req.body.diasd
    }
    if (typeof req.body.diasd =="object") {
        pessoa.diasd= req.body.diasd;
        pessoa.diasq= req.body.diasd.length;
        pessoa.diass=req.body.diasd.join(",")
    }
    try {
        await fs.writeFile("passageiros.json",JSON.stringify(pessoas))
    } catch (e) {}
    pessoa.pagss=pessoa.pags.join(",")
    res.redirect("/passageiro/"+pessoa.id)
})


*/

app.listen(port, () => {
    console.log(`ta rodando na porta ${port}`)
})
	  

