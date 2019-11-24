import fs from 'fs';
import db from '../database';
import cloudinary from '../config/cloudinaryConfig';
import Gif from '../models/gif';
import Comment from '../models/comment';


exports.createGif = (req, res) => {

  console.log('** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **');

  // let filename = req.files.dataFile.path;

  const { file } = req;
  // File Upload
  cloudinary.uploader.upload(file, { tags: req.title }, (error, result) => {

    console.log();
    console.log('** File Upload');
    if (error) {
      console.warn(error);
    }
    console.log('* public_id for the uploaded image is generated by Cloudinary\'s service.');
    console.log('* ', result.public_id);
    console.log('* ', result.url);

    const gif = new Gif();
    gif.authorid = req.body.userId;
    gif.title = result.original_filename;
    gif.imageUrl = result.url;
    gif.share = true;

    // Save Image To DB
    db('gifs')
      .returning('*')
      .insert(gif).then((data) => {
        console.log(data);
        return res.status(201).json({
          status: 'success',
          data: {
            gifId: result.public_id,
            message: 'GIF image successfully posted',
            createdOn: result.created_at,
            title: result.original_filename,
            imageUrl: result.url,
          },
        });
      })
      .catch(
        (err) => {
          return res.status(500).json({
            status: 'error',
            error: err.detail,
          });
        },
      );
  });
};

exports.getGif = async (req, res) => {

  try {

    const gif = await db('gifs')
      .where('id', req.params.id)
      .select('*');

    if (gif.length === 0) {
      throw 'Gif Not Found!';
    }

    const { id } = gif[0];

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
        createdOn: gif[0].created_on,
        title: gif[0].title,
        url: gif[0].image_url,
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

exports.deleteGif = (req, res) => {

  // Delete Article In DB
  db('gifs')
    .where({ id: req.params.id })
    .andWhere('authorid', req.body.userId)
    .del()
    .then((data) => {
      if (data === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'Gif Not Found!',
        });
      }

      return res.status(200)
        .json({
          status: 'success',
          data: {
            message: 'Gif post successfully deleted',
          },
        });
    })
    .catch(
      (err) => {
        return res.status(500)
          .json({
            status: 'error',
            error: err,
          });
      },
    );
};


exports.commentGif = async (req, res) => {

  try {
    // Get Gif from DB
    const gif = await db
      .select('*')
      .from('gifs')
      .where({ id: req.params.id });

    if (gif.length === 0) {
      throw 'Gif Not Found!';
    }
    const { title } = gif;

    // Create Comment Object
    const comment = new Comment();
    comment.description = req.body.description;
    comment.authorid = req.body.userId;
    comment.postid = req.params.id;

    // Save Comment To DB
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
        gifTitle: title,
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
