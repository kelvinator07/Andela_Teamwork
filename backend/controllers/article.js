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
      res.status(201)
        .json({
          status: 'success',
          data: {
            message: 'Article successfully posted',
            articleId: data[0].id,
            createdOn: data[0].created_on,
            title: article.title,
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
