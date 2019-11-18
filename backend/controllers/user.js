import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database';
import User from '../models/user';


exports.signup = (req, res) => {

  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds).then(
    (hashPassword) => {
      // const user = new User({
      //   // id: '',
      //   firstname: req.body.firstname,
      //   lastname: req.body.lastname,
      //   email: req.body.email,
      //   password: hashPassword,
      //   gender: req.body.gender,
      //   jobrole: req.body.jobrole,
      //   department: req.body.department,
      //   address: req.body.address,
      //   avatarurl: req.body.avatarurl,
      //   userrole: req.body.userrole,
      // });

      req.body.password = hashPassword;
      // console.log('User req > ', req.body);
      // res.send(req.body);
      // db.insert(user).returning('*').into('users').then((data) => {
      //   res.send(data);
      // });
      // Returns [1]
      db('users')
        .returning('*')
        .insert(req.body).then((data) => {
          // res.send(data);
          // console.log('data > ', data);
          res.status(201).json({
            status: 'success',
            data: {
              message: `User account successfully created  with id: ${data[0].id}`,
              token: '',
              userId: data[0].id,
            },
          });
        })
        .catch(
          (error) => {
            res.status(500).json({
              status: 'error',
              error: error.detail,
            });
          },
        );
    },
  ).catch(
    (error) => {
      res.status(500).json({
        status: 'error',
        error: error.detail,
      });
    },
  );
};
