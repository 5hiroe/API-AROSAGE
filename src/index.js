import express from 'express'
import configure from './configurations/configuration.js'
import swaggerJsdoc from 'swagger-jsdoc';
//import swaggerUi from 'swaggerUi';
import swaggerUi from 'swagger-ui-express';




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


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Arosaje',
      version: '1.0.0',
      description: 'Documentation de mon API',
    },
  },
  apis: ['../routes/auth.js'], // Spécifiez le chemin vers vos fichiers de routes ou de contrôleurs
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  //app.listen(process.env.PORT, (err) => {
  //  if (err) {
  //    console.log(err)
  //  } else {
  //    console.log(`Server Initialized ON ${process.env.PORT}`)
  //  }
  //})
}

main()
