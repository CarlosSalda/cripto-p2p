const mongoose = require('mongoose')
const { Schema } = mongoose

const operationSchema = new Schema({
  datetime: Date,
  totalDolars: Number,
  totalPesos: Number,
  asset: {
    criptoAsset: String,
    nominalAmount: Number,
    currentCotization: Number,
    pesosAmount: Number
  },
  userEmail: String,
  field: Number
})

mongoose.model('Operations', operationSchema, 'Operations')
