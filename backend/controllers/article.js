import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import { isEmpty } from '../helpers/validation';
import { errorMessage, status } from '../helpers/status';

exports.createArticle = async (req, res) => {

    const { title, description, category, share } = req.body;

    const authorid = req.body.userId;

    const createdAt = moment(new Date());
    const updatedAt = moment(new Date());

    if (isEmpty(title) || isEmpty(description) || isEmpty(category) || isEmpty(share)) {
        errorMessage.error = 'title, description, category and share field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    const createArticleQuery = `INSERT INTO
      articles(title, description, authorid, category, share, updatedAt, createdAt)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
    const values = [ title, description, authorid, category, share, updatedAt, createdAt ];

    try {

        const { rows } = await dbQuery.query(createArticleQuery, values);
        const dbResponse = rows[0];
        const {id, title, createdAt} = dbResponse;
        return res.status(status.created).json({
            status: 'success',
            data: {
                message: 'Article successfully created',
                articleId: id,
                title: title,
                createdOn: createdAt,
            },
        });
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Unable to add Article';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

    // // using sequelize
    // try {
    //
    //     const article = await models.Article.create(req.body);
    //
    //     const {id, title, createdAt} = article;
    //
    //     return res.status(201).json({
    //         status: 'success',
    //         data: {
    //             message: 'Article successfully created',
    //             articleId: id,
    //             title: title,
    //             createdOn: createdAt,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'error',
    //         error: error || error.message,
    //     });
    // }
};

exports.getArticle = async (req, res) => {

    const getArticleQuery = 'SELECT * FROM articles WHERE id = $1';
    let dataResponse = {};

    try {

        const { rows } = await dbQuery.query(getArticleQuery, [req.params.id]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMessage.error = 'Article Not Found!';
            return res.status(status.notfound).send(errorMessage);
        }

        dataResponse = dbResponse;

    } catch (error) {
        errorMessage.error = 'An error Occurred 2';
        return res.status(status.error).send(errorMessage);
    }

    const getArticleCommentsQuery = 'SELECT * FROM comments WHERE postid = $1';

    try {

        const {id, title, description, createdat} = dataResponse;

        const { rows } = await dbQuery.query(getArticleCommentsQuery, [id]);
        const dbResponse = rows;

        const commentsArray = [];

        if (dbResponse[0] !== undefined) {
            dbResponse.map((comment) => (
                commentsArray.push({
                    commentId: comment.id,
                    comment: comment.description,
                    authorId: comment.authorid,
                })
            ));
        }

        return res.status(status.success).json({
            status: 'success',
            data: {
                id: id,
                createdOn: createdat,
                title: title,
                article: description,
                comments: commentsArray,
            },
        });

    } catch (error) {
        errorMessage.error = 'An error Occurred';
        return res.status(status.error).send(errorMessage);
    }

    // try {
    //
    //     const article = await models.Article.findOne({
    //         where: {id: req.params.id}
    //     });
    //
    //     if (article === null) {
    //         throw 'Article Not Found!';
    //     }
    //
    //     const {id, title, description, createdAt} = article;
    //
    //     const comments = await models.Comment.findAll({
    //         where: {postId: id}
    //     });
    //
    //     const commentsArray = [];
    //
    //     comments.map((comment) => (
    //         commentsArray.push({
    //             commentId: comment.id,
    //             comment: comment.description,
    //             authorId: comment.authorid,
    //         })
    //     ));
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             id: id,
    //             createdOn: createdAt,
    //             title: title,
    //             article: description,
    //             comments: commentsArray,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'failed',
    //         error: error || error.message,
    //     });
    // }
};

exports.editArticle = async (req, res) => {

    const postId = req.params.id;
    const { title, description, category, share, userId } = req.body;
    const authorId = userId;

    const findArticleQuery = 'SELECT * FROM articles WHERE id=$1 AND authorId=$2';
    const updateArticle = `UPDATE articles SET title=$1, description=$2, category=$3, share=$4 WHERE id=$5 returning *`;

    try {
        const { rows } = await dbQuery.query(findArticleQuery, [postId, authorId]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Article Cannot be found';
            return res.status(status.notfound).send(errorMessage);
        }
        const values = [ req.body.title, req.body.description, category, share, postId ];
        const response = await dbQuery.query(updateArticle, values);
        const dbResult = response.rows[0];
        const { title, description } = dbResult;
        return res.status(status.success).json({
            status: 'success',
            data: {
                message: 'Article successfully updated',
                title,
                article: description,
            },
        });
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Duplicate';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

    // try {
    //
    //     const postId = req.params.id;
    //
    //     const findArticle = await models.Article.findOne({
    //         where: {id: postId, authorId: req.body.userId}
    //     });
    //
    //     if (findArticle === null) {
    //         throw 'Article Not Found';
    //     }
    //
    //     const {title, description, category, share, userId} = req.body;
    //
    //     // Update Article In DB
    //     const [editedArticle] = await models.Article.update({title, description, category, share, authorId: userId}, {
    //         where: {id: postId}
    //     });
    //
    //     if (editedArticle !== 1) {
    //         throw 'Error updating Article. Please Try Again';
    //     }
    //
    //     const updatedArticle = await models.Article.findOne({
    //         where: {id: postId}
    //     });
    //
    //     // const { title, description } = updatedArticle;
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             message: 'Article successfully updated',
    //             title: updatedArticle.title,
    //             article: updatedArticle.description,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'failed',
    //         error: error || error.message,
    //     });
    // }
};

exports.deleteArticle = async (req, res) => {
    // Delete Article In DB

    const postId = req.params.id;
    const authorid = req.body.userId;
    const deleteArticleQuery = 'DELETE FROM articles WHERE id=$1 AND authorid = $2 returning *';
    try {
        const { rows } = await dbQuery.query(deleteArticleQuery, [postId, authorid]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Article Not Found';
            return res.status(status.notfound).send(errorMessage);
        }
        return res.status(status.success).json({
            status: 'success',
            data: {
                message: 'Article successfully deleted',
            },
        });
    } catch (error) {
        return res.status(status.error).send(error);
    }

    // try {
    //
    //     const postId = req.params.id;
    //
    //     const findArticle = await models.Article.findOne({
    //         where: {id: postId, authorId: req.body.userId}
    //     });
    //
    //     if (findArticle === null) {
    //         throw 'Article Not Found';
    //     }
    //
    //     // Delete Article In DB
    //     const deletedArticle = await models.Article.destroy({
    //         where: {id: postId}
    //     });
    //
    //     if (deletedArticle !== 1) {
    //         throw 'Error deleting Article. Please Try Again';
    //     }
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             message: 'Article successfully deleted',
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'error',
    //         error: error || error.message,
    //     });
    // }
};

exports.commentArticle = async (req, res) => {

    const postId = req.params.id;
    const {description, userId} = req.body;
    const authorId = userId;

    const findArticleQuery = 'SELECT * FROM articles WHERE id=$1';
    const commentArticle = `INSERT INTO comments(description, authorid, postid, updatedAt, createdAt)
      VALUES($1, $2, $3, $4, $5) returning *`;
    const createdAt = moment(new Date());
    const updatedAt = moment(new Date());
    const values = [description, authorId, postId, updatedAt, createdAt];
    let title;
    try {
        const { rows } = await dbQuery.query(findArticleQuery, [postId]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Article Cannot be found';
            return res.status(status.notfound).send(errorMessage);
        }
        title  = dbResponse.title;
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

    try {
        const { rows } = await dbQuery.query(commentArticle, values);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Error while adding Comment!';
            return res.status(status.conflict).send(errorMessage);
        }

        const {createdat} = dbResponse;

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Comment successfully created',
                createdOn: createdat,
                articleTitle: title,
                // article: article,
                comment: description,
            },
        });

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }


    // try {
    //     // Get Article from DB
    //     const postId = req.params.id;
    //
    //     const article = await models.Article.findOne({
    //         where: {id: postId}
    //     });
    //
    //     if (article === null) {
    //         throw 'Article Not Found!';
    //     }
    //
    //     const {title} = article;
    //
    //     const {description, userId} = req.body;
    //
    //     const comment = await models.Comment.create({description, authorId: userId, postId});
    //
    //     if (comment === null) {
    //         throw 'Error while adding Comment!';
    //     }
    //
    //     const {createdAt} = comment;
    //
    //     return res.status(201).json({
    //         status: 'success',
    //         data: {
    //             message: 'Comment successfully created',
    //             createdOn: createdAt,
    //             articleTitle: title,
    //             // article: article,
    //             comment: description,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'failed',
    //         error: error || error.message,
    //     });
    // }
};

exports.getAllArticles = async (req, res) => {

    const getAllArticlesQuery = 'SELECT * FROM articles WHERE authorid=$1 ORDER BY createdAt DESC';
    const authorid = req.body.userId;
    try {
        const { rows } = await dbQuery.query(getAllArticlesQuery, [authorid]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'There are no articles';
            return res.status(status.bad).send(errorMessage);
        }

        return res.status(status.success).json({
            status: 'success',
            data: {
                message: dbResponse,
            },
        });
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }

    // try {
    //     const {userId} = req.body;
    //
    //     // Check If User Exists from DB
    //     const user = await models.User.findOne({
    //         where: {id: userId}
    //     });
    //
    //     if (user === null) {
    //         throw 'User Doesn\'t Exist!';
    //     }
    //
    //     const articles = await models.Article.findAll({
    //         where: {authorId: userId}
    //     });
    //
    //     if (articles === null) {
    //         throw 'Articles Not Found';
    //     }
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             message: articles,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'failed',
    //         error: error || error.message,
    //     });
    // }
};
