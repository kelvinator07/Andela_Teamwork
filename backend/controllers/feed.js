import db from '../database';


exports.getAllFeed = async (req, res) => {

  try {

    const { userId } = req.body;

    const articles = await db('articles')
      .where('authorid', userId)
      .select('*');


    const gifs = await db('gifs')
      .where('authorid', userId)
      .select('*');


    const feeds = [...articles, ...gifs];

    const sorted = feeds.sort((a, b) =>
      new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

    return res.status(200)
      .json({
        status: 'success',
        data: sorted,
      });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error,
    });
  }
};
