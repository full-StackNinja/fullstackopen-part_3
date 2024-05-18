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

