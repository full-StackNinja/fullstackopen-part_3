const express = require("express")
const morgan = require("morgan")
const app = express()



let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.use(express.json())

morgan.token('req-body', function(req){return JSON.stringify(req.body)})



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))



app.get("/info", (req, res)=>{
  const persons = data.length;
const content = `<p>Phonebook has info for ${persons} people</p>`
const date = new Date(); 
console.log("🚀 ~ app.get ~ date:", date)

const currentDate = `<p>${date}</p>`
  res.send(`${content} ${currentDate}`)
})

app.get("/api/persons", (req, res)=>{


    res.json(data)
})

app.post("/api/persons", (req, res)=>{
  const {name, number} = req.body
  if(!name) return res.status(422).send("name is required")
  if(!number) return res.status(422).send("number is required")
  const nameExist = data.find(person=>person.name === name)
if(nameExist) return res.status(422).send("name must be unique")
  const id = Number.parseInt(Math.random()*Number.MAX_SAFE_INTEGER, 10);
  const newPerson = {
    id, name, number
  }
  data.push(newPerson)
  res.status(201).send(newPerson)

})

app.get("/api/persons/:id", (req, res)=>{
  const id = Number.parseInt(req.params.id, 10);
  console.log("🚀 ~ app.get ~ id:", typeof id)

  const person = data.find(person => {
    console.log("🚀 ~ app.get ~ person:", person)
    return person.id === id
  })
  
  if(person){
    res.json(person)
    return
  }
  res.status(404).send(`Person with id ${id} not found`)
})

app.delete("/api/persons/:id", (req, res)=>{
  const id = Number.parseInt(req.params.id, 10)
  const person = data.find(person=>person.id === id)
  if(!person) return res.status(404).send(`Person with id ${id} not found`)
    data = data.filter(person=> person.id!==id)
  res.status(200).send(person)
})



const port = 3001;


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})