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
  app.listen(8082, () => {
    console.log('API running on port 8082');
  });


// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Arosaje API',
    version: '1.0.1',
  },
  host: 'localhost:8082',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'Endpoints related to users',
    },
    {
      name: 'Botanist',
      description: 'Endpoints related to botanist',
    },
    {
      name: 'Download',
      description: 'Endpoints related to download',
    },
    {
      name: 'Feedback',
      description: 'Endpoints related to feedback',
    },
    {
      name: 'Keep',
      description: 'Endpoints related to keep',
    },
    {
      name: 'Plant',
      description: 'Endpoints related to plant',
    },
    {
      name: 'Profile',
      description: 'Endpoints related to plant',
    },
    {
      name: 'Upload',
      description: 'Endpoints related to plant',
    },
  ],
  "components": {
    "schemas": {
      "User": {
      "$ref": "./models/user.js" 
    
    }
    
    
      
    },
    Botanist: {
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
    '/signup': {
      post: {
        tags: ['Users'],
        summary: 'Post for signup',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Users'],
        summary: 'Post for login',
        parameters: [
          {
            name: "email_user",
            in: "path",
            required: true,
          },
          {
            name: "password_user",
            in: "path",
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            schema: {
              $ref: "./models/user.js"
            },
          },
        },
      },
    },
    '/user': {
      get: {
        tags: ['Users'],
        summary: 'Get for all users',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/locations': {
      get: {
        tags: ['Users'],
        summary: 'Get for location',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/signup': {
      post: {
        tags: ['Botanist'],
        summary: 'Post for signup',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/botanist/login': {
      post: {
        tags: ['Botanist'],
        summary: 'Post for login',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/botanist': {
      get: {
        tags: ['Botanist'],
        summary: 'Get for all botanist',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/locations': {
      get: {
        tags: ['Botanist'],
        summary: 'Get for location',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/user/:id': {
      get: {
        tags: ['Download'],
        summary: 'Dowload user picture',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/plant/:id': {
      get: {
        tags: ['Download'],
        summary: 'Dowload plant picture',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/': {
      post: {
        tags: ['Feedback'],
        summary: 'Create feedback',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/keep/:id': {
      get: {
        tags: ['Feedback'],
        summary: 'Get feedback by keep',
        parameters: [
          {
            name: "email",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "password",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/': {
      post: {
        tags: ['Keep'],
        summary: 'Create keep',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/user/all': {
      get: {
        tags: ['Keep'],
        summary: 'Get keep by user',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/all': {
      get: {
        tags: ['Keep'],
        summary: 'Get all keep',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/:id': {
      get: {
        tags: ['Keep'],
        summary: 'Get Keep by id',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/': {
      post: {
        tags: ['Plant'],
        summary: 'Post create plant',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/all': {
      get: {
        tags: ['Keep'],
        summary: 'Get all plant',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/user/all': {
      get: {
        tags: ['Keep'],
        summary: 'Get all plant by user',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/:id': {
      get: {
        tags: ['Plant'],
        summary: 'Get Plant by id',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/:id': {
      put : {
        tags: ['Plant'],
        summary: 'Put Plant by id',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      },
    },
    '/:id': {
      delete: {
        tags: ['Plant'],
        summary: 'Delete Plant by id',
        parameters: [
          {
            name: "lastname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
          {
            name: "firstname_user",
            in: "path",
            schema: {
              $ref: "/models/user"
            },
            required: true,
          },
        ],
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
