import models from "../database/models";
import 'babel-polyfill';
import dbQuery from "../db/dev/dbQuery";
import {errorMessage, status} from "../helpers/status";

exports.getAllFeed = async (req, res) => {

    const getAllArticlesQuery = 'SELECT * FROM articles';
    let feeds = [];

    try {
        const { rows } = await dbQuery.query(getAllArticlesQuery);
        const dbResponse = rows;
        feeds = [...dbResponse];
        console.log(' 2 ', feeds);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }

    const getAllGifsQuery = 'SELECT * FROM gifs';

    try {

        const { rows } = await dbQuery.query(getAllGifsQuery);
        const dbResponse = rows;

        feeds = [ ...feeds, ...dbResponse];

        const sorted = feeds.sort((a, b) =>
            new Date(b.createdat).getTime() - new Date(a.createdat).getTime());

        return res.status(status.success).json({
            status: 'success',
            count: feeds.length,
            data: sorted,
        });
    } catch (error) {
        errorMessage.error = 'An error Occurred';
        return res.status(status.error).send(errorMessage);
    }


    // try {
    //
    //     const articles = await models.Article.findAll();
    //     const gifs = await models.Gif.findAll();
    //
    //     const feeds = [...articles, ...gifs];
    //
    //     const sorted = feeds.sort((a, b) =>
    //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         count: feeds.length,
    //         data: sorted,
    //     });
    //
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'failed',
    //         error: error || error.message,
    //     });
    // }
};
