import db from '../database';
import Article from '../models/article';


exports.createArticle = (req, res) => {
  // Create Article Object
  const article = new Article();
  article.title = req.body.title;
  article.description = req.body.description;
  article.authorid = req.body.userId;
  article.category = req.body.category;
  article.share = true;

  // Save Article To DB
  db('articles')
    .returning('*')
    .insert(article)
    .then((data) => {
      const { id, title, created_on } = data[0];
      res.status(201)
        .json({
          status: 'success',
          data: {
            message: 'Article successfully posted',
            articleId: id,
            createdOn: created_on,
            title: title,
          },
        });
    })
    .catch(
      (err) => {
        res.status(500)
          .json({
            status: 'error',
            error: err,
          });
      },
    );
};

exports.editArticle = (req, res) => {
  // Edit Article Object
  const article = new Article();
  article.title = req.body.title;
  article.description = req.body.description;
  article.authorid = req.body.userId;
  article.category = req.body.category;
  article.share = true;

  // Update Article In DB
  db('articles')
    .where({ id: req.params.id })
    .update(article, ['title', 'description'])
    .then((data) => {
      if (data.length === 0) {
        return res.status(401).json({
          status: 'error',
          error: 'Article Not Found!',
        });
      }
      const { title, description } = data[0];
      res.status(201)
        .json({
          status: 'success',
          data: {
            message: 'Article successfully updated',
            title: title,
            article: description,
          },
        });
    })
    .catch(
      (err) => {
        res.status(500)
          .json({
            status: 'error',
            error: err,
          });
      },
    );
};
