const express = require("express")

const app = express()

app.get("/api/persons", (req, res)=>{

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

    res.json(data)
})

const port = 3000;


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})