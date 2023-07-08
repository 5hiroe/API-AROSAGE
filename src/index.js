import express from 'express'
import configure from './configurations/configuration.js'

async function main () {
  const app = express()

  await configure(app)
  
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  // Démarrez le serveur
  app.listen(3000, () => {
    console.log('API running on port 3000');
  });

  //app.listen(process.env.PORT, (err) => {
  //  if (err) {
  //    console.log(err)
  //  } else {
  //    console.log(`Server Initialized ON ${process.env.PORT}`)
  //  }
  //})
}

main()
