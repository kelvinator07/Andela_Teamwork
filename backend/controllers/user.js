import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database';
import User from '../models/user';


exports.signup = (req, res) => {

  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds).then(
    (hashPassword) => {

      const user = new User();
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.password = hashPassword;
      user.gender = req.body.gender;
      user.jobrole = req.body.jobrole;
      user.department = req.body.department;
      user.department = req.body.department;
      user.address = req.body.address;
      user.userrole = req.body.userrole;

      // db.insert(user).returning('*').into('users').then((data) => {
      //   res.send(data);
      // });
      // Returns [1]
      db('users')
        .returning('*')
        .insert(user).then((data) => {
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

exports.signin = (req, res) => {

  db('users').where({
    email: req.body.email,
  }).select('*').then(
    (user) => {
      if (user.length === 0) {
        return res.status(401).json({
          status: 'error',
          error: 'User Not Found!',
        });
      }
      // compare password If user is found
      bcrypt.compare(req.body.password, user[0].password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              status: 'error',
              error: 'Incorrect Password!',
            });
          }

          const token = jwt.sign(
            { userId: user[0].id },
            'RANDOM_SECRET_TOKEN',
            { expiresIn: '24h' });

          res.status(200).json({
            status: 'success',
            data: {
              token: token,
              userId: user[0].id,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            status: 'error',
            error: error.detail,
          });
        },
      );
    },
  )
    .catch(
      (error) => {
        res.status(500).json({
          status: 'error',
          error: error.detail,
        });
      },
    );
};
