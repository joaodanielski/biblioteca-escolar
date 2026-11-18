require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const { sequelize } = require('./models');
const seed = require('./seed');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => {
  res.send('Biblioteca Escolar no ar!');
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(async () => {
  await seed();
  app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
});