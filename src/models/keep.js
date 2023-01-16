import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    keeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date },
    endDate: { type: Date },
    plants: [{ type: String }],
    status: { type: String },
    instruction: { type: String },
    location: {
        name: { type: String },
        type: { type: String },
        coordinates: { type: [Number] }
    }
  },
  { timestamps: true }
)

schema.index({ location: '2dsphere' })
export default mongoose.model('Keep', schema)
