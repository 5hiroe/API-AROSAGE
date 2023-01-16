import mongoose from 'mongoose'

/**
 * Mongo configuration
 */
export async function configure(app) {
  mongoose.set('strictQuery', true)
  
  return mongoose
  .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Mongo Initialized')
    })
    .catch((error) => {
      console.log('Mongo Failed: ', error)
    })
}