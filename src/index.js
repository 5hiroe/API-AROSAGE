import express from 'express'
import configure from './configurations/configuration.js'

async function main () {
  const app = express()

  await configure(app)
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Server Initialized ON ${process.env.PORT}`)
    }
  })
}

main()
