const express = require("express")

const app = express()

const data = [
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

app.get("/api/persons", (req, res)=>{


    res.json(data)
})

app.get("/info", (req, res)=>{
  const persons = data.length;
const content = `<p>Phonebook has info for ${persons} people</p>`
const date = new Date(); 
console.log("🚀 ~ app.get ~ date:", date)

const currentDate = `<p>${date}</p>`
  res.send(`${content} ${currentDate}`)
})

const port = 3001;


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})