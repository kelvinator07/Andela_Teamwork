import models from '../database/models';
import Article from '../models/article';
import Comment from '../models/comment';

exports.createArticle = async (req, res) => {

    // using sequelize
    try {

        const article = await models.Article.create(req.body);

        const {id, title, createdAt} = article;

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Article successfully created',
                articleId: id,
                title: title,
                createdOn: createdAt,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            error: error || error.message,
        });
    }
};

exports.getArticle = async (req, res) => {

    try {

        const article = await models.Article.findOne({
            where: {id: req.params.id}
        });

        if (article === null) {
            throw 'Article Not Found!';
        }

        const {id, title, description, createdAt} = article;

        const comments = await models.Comment.findAll({
            where: {postId: id}
        });

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
                createdOn: createdAt,
                title: title,
                article: description,
                comments: commentsArray,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error || error.message,
        });
    }
};

exports.editArticle = async (req, res) => {

    try {

        const postId = req.params.id;

        const findArticle = await models.Article.findOne({
            where: {id: postId, authorId: req.body.userId}
        });

        if (findArticle === null) {
            throw 'Article Not Found';
        }

        const {title, description, category, share, userId} = req.body;

        // Update Article In DB
        const [editedArticle] = await models.Article.update({title, description, category, share, authorId: userId}, {
            where: {id: postId}
        });

        if (editedArticle !== 1) {
            throw 'Error updating Article. Please Try Again';
        }

        const updatedArticle = await models.Article.findOne({
            where: {id: postId}
        });

        // const { title, description } = updatedArticle;

        return res.status(200).json({
            status: 'success',
            data: {
                message: 'Article successfully updated',
                title: updatedArticle.title,
                article: updatedArticle.description,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error || error.message,
        });
    }
};

exports.deleteArticle = async (req, res) => {
    // Delete Article In DB

    try {

        const postId = req.params.id;

        const findArticle = await models.Article.findOne({
            where: {id: postId, authorId: req.body.userId}
        });

        if (findArticle === null) {
            throw 'Article Not Found';
        }

        // Delete Article In DB
        const deletedArticle = await models.Article.destroy({
            where: {id: postId}
        });

        if (deletedArticle !== 1) {
            throw 'Error deleting Article. Please Try Again';
        }

        return res.status(200).json({
            status: 'success',
            data: {
                message: 'Article successfully deleted',
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            error: error || error.message,
        });
    }
};

exports.commentArticle = async (req, res) => {

    try {
        // Get Article from DB
        const postId = req.params.id;

        const article = await models.Article.findOne({
            where: {id: postId}
        });

        if (article === null) {
            throw 'Article Not Found!';
        }

        const {title} = article;

        const {description, userId} = req.body;

        const comment = await models.Comment.create({description, authorId: userId, postId});

        if (comment === null) {
            throw 'Error while adding Comment!';
        }

        const {createdAt} = comment;

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Comment successfully created',
                createdOn: createdAt,
                articleTitle: title,
                // article: article,
                comment: description,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error || error.message,
        });
    }
};

exports.getAllArticles = async (req, res) => {

    try {
        const {userId} = req.body;

        // Check If User Exists from DB
        const user = await models.User.findOne({
            where: {id: userId}
        });

        if (user === null) {
            throw 'User Doesn\'t Exist!';
        }

        const articles = await models.Article.findAll({
            where: {authorId: userId}
        });

        if (articles === null) {
            throw 'Articles Not Found';
        }

        return res.status(200).json({
            status: 'success',
            data: {
                message: articles,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error || error.message,
        });
    }
};
