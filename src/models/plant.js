import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    picture: { type: String },
    instruction: { type: String },
    status: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Plant', schema)
