require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');

const auth = require('./middlewares/auth');
const requestLogger = require('./middlewares/request-logger');
const errorLogger = require('./middlewares/error-logger');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/news-explorer', CLIENT_ORIGIN } = process.env;

const allowedOrigins = (CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

const app = express();

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', authRoutes);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('A solicitação não foi encontrada'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Mongo conectado'))
  .catch((err) => console.error('Erro Mongo:', err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
