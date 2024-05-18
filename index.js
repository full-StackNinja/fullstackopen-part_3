const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./Person");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log("database connected!");
   })
   .catch((err) => {
      throw new Error(err.message);
   });

app.use(cors());

app.use(express.json());

morgan.token("req-body", function (req) {
   return JSON.stringify(req.body);
});

app.use(
   morgan(
      ":method :url :status :res[content-length] - :response-time ms :req-body",
   ),
);
// Load frontend HTML on start
app.use(express.static("dist"));

app.get("/info", (req, res, next) => {
   Person.countDocuments({})
      .then((count) => {
         const content = `<p>Phonebook has info for ${count} people</p>`;
         const date = new Date();
         const currentDate = `<p>${date}</p>`;
         res.send(`${content} ${currentDate}`);
      })
      .catch((err) => {
         next(err);
      });
});

app.get("/api/persons", async (req, res) => {
   const data = await Person.find({});
   res.json(data);
});

app.post("/api/persons", async (req, res, next) => {
   const { name, number } = req.body;
   if (!name) return res.status(422).send("name is required");
   if (!number) return res.status(422).send("number is required");
   const nameExist = await Person.findOne({ name: name });
   if (nameExist) return res.status(422).send("name must be unique");
   const newPerson = new Person({
      name,
      number,
   });
   newPerson
      .save()
      .then(() => {
         res.status(201).json(newPerson);
      })
      .catch((err) => {
         console.log("🚀 ~ app.post ~ err:", err);
         next(err);
      });
});

app.get("/api/persons/:id", async (req, res) => {
   const id = req.params.id;
   const person = await Person.findById(id);

   if (person) {
      res.json(person);
      return;
   }
   res.status(404).send(`Person with id ${id} not found`);
});

app.put("/api/persons/:id", async (req, res, next) => {
   try {
      const { id } = req.params;
      const { name, number } = req.body;
      const person = { _id: id, name, number };
      const updatedPerson = await Person.findByIdAndUpdate(id, person, {
         new: true,
         runValidators: true,
      });
      if (!updatedPerson)
         return res
            .status(404)
            .send(`Person with id ${id} has already been deleted`);
      res.json(updatedPerson);
   } catch (err) {
      console.log("🚀 ~ app.put ~ err.message:", err.message);
      console.log("🚀 ~ app.put ~ err.name:", err.name);
      next(err);
   }
});

app.delete("/api/persons/:id", async (req, res, next) => {
   try {
      const id = req.params.id;
      const person = await Person.findById(id);
      if (!person)
         return res.status(404).send(`Person with id ${id} not found`);
      const deletedPerson = await Person.findOneAndDelete({ _id: id });
      res.status(200).json(deletedPerson);
   } catch (err) {
      next(err);
   }
});

// Unknown endpoint error
app.use((req, res, next) => {
   res.status(404).json({ err: "Unknown endpoint!" });
});

// Error middleware
const errMiddleware = (err, req, res, next) => {
   console.log("🚀 ~ errMiddleware ~ err.message:", err.message);
   console.log("🚀 ~ errMiddleware ~ err.name:", err.name);
   if (err.name === "CastError") {
      return res.status(400).json({ error: "malformatted id" });
   } else if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
   }
   next(err);
};

app.use(errMiddleware);

const Port = process.env.PORT || 3001;

app.listen(Port, () => {
   console.log(`App is listening on port ${Port}`);
});
