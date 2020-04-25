const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  address:{
    type: String,
    required: true
  },
  totalPrice:{
    type: Number,
    required: true
  },
  orders:[
    {
      pizzaType: {
        type: String
      },
      price: {
        type: Number
      },
      amount: {
        type: Number
      }
    }
  ],
  date:{
    type: Date,
    default: Date.now
  }
});
module.exports = Post = mongoose.model("order", PostSchema);