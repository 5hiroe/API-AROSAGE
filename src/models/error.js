import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    error: { type: String },
    stack: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('Error', schema)
