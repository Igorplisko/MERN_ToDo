const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   email: {
      type: String,

   }
})





module.exports = model('User', schema)