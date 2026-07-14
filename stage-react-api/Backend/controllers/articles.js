const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      const articleResponse = article.toObject();
      delete articleResponse.owner;
      res.status(201).send(articleResponse);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Dados inválidos ao criar o artigo'));
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        return Promise.reject(new NotFoundError('Artigo não encontrado'));
      }

      if (article.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Você não tem permissão para excluir este artigo'));
      }

      return Article.findByIdAndDelete(articleId).then(() => {
        res.send({ message: 'Artigo removido' });
      });
    })
    .catch(next);
};
