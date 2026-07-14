const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Usuário não encontrado'));
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};
