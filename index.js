const express = require('express');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const borrowRoutes = require('./routes/borrow');

const app = express();

app.use(express.json());

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