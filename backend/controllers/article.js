import db from '../database';
import Article from '../models/article';
import Comment from '../models/comment';


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
      return res.status(201).json({
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
        return res.status(500).json({
          status: 'error',
          error: err,
        });
      },
    );
};

exports.getArticle = async (req, res) => {

  try {

    const article = await db('articles')
      .where('id', req.params.id)
      .select('*');

    if (article.length === 0) {
      throw 'Article Not Found!';
    }

    const { id } = article[0];

    const comments = await db('comments')
      .where('postid', id)
      .select('*');

    const commentsArray = [];

    comments.map((comment) => (
      commentsArray.push({
        commentId: comment.id,
        comment: comment.description,
        authorId: comment.authorid,
      })
    ));

    return res.status(200).json({
      status: 'success',
      data: {
        id: id,
        createdOn: article[0].created_on,
        title: article[0].title,
        article: article[0].description,
        comments: commentsArray,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error,
    });
  }
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
    .andWhere('authorid', req.body.userId)
    .update(article, ['title', 'description'])
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'Article Not Found!',
        });
      }
      const { title, description } = data[0];
      return res.status(200).json({
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
        return res.status(500).json({
          status: 'error',
          error: err,
        });
      },
    );
};

exports.deleteArticle = async (req, res) => {
  // Delete Article In DB
  db('articles')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      if (data === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'Article Not Found!',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully deleted',
        },
      });
    })
    .catch(
      (err) => {
        return res.status(500).json({
          status: 'error',
          error: err,
        });
      },
    );
};

exports.commentArticle = async (req, res) => {

  try {
    // Get Article from DB
    const articles = await db('articles')
      .where('id', req.params.id)
      .select('*');

    if (articles.length === 0) {
      throw 'Article Not Found!';
    }
    const { title } = articles[0];

    // Create Comment Object
    const comment = new Comment();
    comment.description = req.body.description;
    comment.authorid = req.body.userId;
    comment.postid = req.params.id;

    const comments = await db('comments')
      .returning('*')
      .insert(comment);

    if (comments.length === 0) {
      throw 'Error while Updating Comment!';
    }
    const { description, created_on } = comments[0];

    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: created_on,
        articleTitle: title,
        // article: article,
        comment: description,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error,
    });
  }
};

exports.getAllArticles = (req, res) => {

  const { userId } = req.body;

  db('articles')
    .where('authorid', userId)
    .select('*')
    .then((data) => {

      return res.status(200).json({
        status: 'success',
        data: {
          message: data,
        },
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: '',
        error: error,
      });
    });
};
