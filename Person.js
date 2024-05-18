const mongoose = require("mongoose");

const { Schema } = mongoose;

const PersonSchema = new Schema({
   name: { type: String },
   number: { type: String },
});

PersonSchema.set("toJSON", {
   transform: (doc, ret) => {
      (ret.id = ret._id.toString()), delete ret._id;
      delete ret.__v;
   },
});

module.exports = mongoose.model("Person", PersonSchema);

// async function open() {
//    await mongoose.connect(connectionString);
//    //    console.log("database connected!");
// }

// async function close() {
//    await mongoose.connection.close();
//    //    console.log("database connection closed");
// }

// const addData = async (person) => {
//    // check if person already exist on the database
//    const personExist = await Person.findOne({ name: person.name }).exec();
//    if (!personExist) {
//       const newPerson = new Person(person);
//       await newPerson.save();
//       console.log(
//          `added ${newPerson.name} number ${newPerson.number} to the phonebook!`,
//       );
//    }
// };

// // get all the numbers from database

// const getAllNums = async () => {
//    const allNums = await Person.find({}).select("name number");
//    console.log("Phonebook:");
//    allNums.forEach((person) => {
//       console.log(person.name, " ", person.number);
//    });
// };

// (async () => {
//    await open();
//    await Promise.all(data.map(async (person) => await addData(person)));

//    // check the command line arguments if we receive any new data?
//    const name = process.argv[3];
//    const number = process.argv[4];

//    if (name && number) {
//       await addData({ name, number });
//    } else {
//       await getAllNums();
//    }

//    await close();
// })();
