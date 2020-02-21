import models from "../database/models";

exports.getAllFeed = async (req, res) => {

    try {

        const articles = await models.Article.findAll();
        const gifs = await models.Gif.findAll();

        const feeds = [...articles, ...gifs];

        const sorted = feeds.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return res.status(200).json({
            status: 'success',
            count: feeds.length,
            data: sorted,
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error || error.message,
        });
    }
};
