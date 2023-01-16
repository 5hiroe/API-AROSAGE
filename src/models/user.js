import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    birthdate: { type: Date },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    picture: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('User', schema)
