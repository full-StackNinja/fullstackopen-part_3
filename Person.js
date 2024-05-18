const mongoose = require("mongoose");

const { Schema } = mongoose;

const PersonSchema = new Schema({
   name: { type: String, minLength: 3, required: true },
   number: {
      type: String,
      minLength: 8,
      validate: {
         validator: function (v) {
            return /^(\d{2}||\d{3})-\d+$/.test(v);
         },
         message: "invalid phone number",
      },
   },
});

PersonSchema.set("toJSON", {
   transform: (doc, ret) => {
      (ret.id = ret._id.toString()), delete ret._id;
      delete ret.__v;
   },
});

module.exports = mongoose.model("Person", PersonSchema);
