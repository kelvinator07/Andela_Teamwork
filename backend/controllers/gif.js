import cloudinary from '../config/cloudinaryConfig';
import models from "../database/models";


exports.createGif = async (req, res) => {

  console.log('** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **');

  // let filename = req.files.dataFile.path;

    // Save Image To DB
    try {

      const { file } = req;
      // File Upload
      const result = await cloudinary.v2.uploader.upload(file, { tags: req.body.title }, (error, result) => {

        console.log();
        console.log('** File Upload');
        if (error) {
          console.log('** File error', error);
          console.warn(error);
        }
        console.log('* public_id for the uploaded image is generated by Cloudinary\'s service.');
        console.log('* public_id ', result.public_id);
        console.log('* url ', result.url);
      });

      const gif = await models.Gif.create({
        authorId: req.body.userId,
        title: result.original_filename,
        imageurl: result.url,
        share: 'Yes'
      });

      if (gif === null) {
        throw 'Something went wrong while saving Gif. Please try again.';
      }

      const {id, title, imageurl, createdAt} = gif;

      return res.status(201).json({
        status: 'success',
        data: {
          gifId: id,
          message: 'GIF image successfully posted',
          createdAt,
          title,
          imageurl,
        },
      });

    } catch (error) {
      return res.status(500).json({
        status: error,
        error: error.message,
      });
    }
};

exports.getGif = async (req, res) => {

  try {

    const gifId = req.params.id;

    const gif = await models.Gif.findOne({
      where: { id: gifId }
    });

    if (gif === null) {
      throw 'Gif Not Found!';
    }

    const {id, title, imageurl, share, createdAt} = gif;

    const comments = await models.Comment.findAll({
      where: { postId: id }
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
        title: title,
        url: imageurl,
        share: share,
        comments: commentsArray,
        createdOn: createdAt,
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error || error.message,
    });
  }
};

exports.deleteGif = async (req, res) => {

  try {

    const postId = req.params.id;

    const findGif = await models.Gif.findOne({
      where: { id: postId, authorId: req.body.userId }
    });

    if (findGif === null) {
      throw 'Gif Not Found';
    }

    // Delete Gif In DB
    const deletedGif = await models.Gif.destroy({
      where: { id: postId }
    });

    if (deletedGif !== 1) {
      throw 'Error deleting Gif. Please Try Again';
    }

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Gif post successfully deleted',
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error || error.message,
    });
  }
};


exports.commentGif = async (req, res) => {

  try {
    // Get Gif from DB
    const gifId = req.params.id;

    const gif = await models.Gif.findOne({
      where: { id: gifId }
    });

    if (gif === null) {
      throw 'Gif Not Found!';
    }

    const { title } = gif;

    const { description, userId } = req.body;

    const comment = await models.Comment.create({description, authorId: userId, gifId});

    if (comment === null) {
      throw 'Error while adding Comment!';
    }

    const { createdAt } = comment;

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
