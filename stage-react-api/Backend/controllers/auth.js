const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const getCookieOptions = require('../utils/cookie-options');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.status(201).send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Já existe um usuário com este e-mail'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Dados inválidos ao criar o usuário'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('E-mail ou senha incorretos'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('E-mail ou senha incorretos'));
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
          { expiresIn: '7d' },
        );

        res.cookie('jwt', token, getCookieOptions());
        return res.send({ email: user.email, name: user.name });
      });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt', getCookieOptions());
  res.send({ message: 'Deslogado com sucesso' });
};
