import express from 'express'
import configure from './configurations/configuration.js'
//import path from ('path');
import swaggerJsdoc  from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/auth.js';
//import routes from ('./routes/auth.js');




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


// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.1',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'Endpoints related to users',
    },
    {
      name: 'Products',
      description: 'Endpoints related to products',
    },
  ],
  definitions: {
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
      },
    },
    Product: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
      },
    },
  },
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/signup': {
      post: {
        tags: ['Products'],
        summary: 'Post for signup',
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

//app.use('/', routes);
//app.use(express.static(path.join(__dirname, 'public')));


  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Server Initialized ON ${process.env.PORT}`)
    }
  })
}

main()
