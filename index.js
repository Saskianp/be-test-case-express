const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const borrowRoutes = require('./routes/borrow');

const app = express();
app.use(express.json());

// Swagger options
const swaggerOptions = {
  definition: { 
    openapi: '3.0.0', 
    info: {
      title: 'Library API Documentation',
      version: '1.0.0',
      description: 'Express Library API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/books.js', './routes/members.js', './routes/borrow.js'],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/borrow', borrowRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});