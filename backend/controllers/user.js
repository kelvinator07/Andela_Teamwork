import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database';
import User from '../models/user';


exports.signup = async (req, res) => {

  try {

    // Check If Email Exists from DB
    const emails = await db.select('email')
      .from('users');

    for (let i = 0; i < emails.length; i++) {
      if (emails[i].email === req.body.email) {
        throw 'Email Already Exist!';
      }
    }

    const saltRounds = 10;

    const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);

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
    user.avatarurl = req.body.avatarurl;
    user.userrole = req.body.userrole;

    // Insert User Into DB
    const userReturned = await db('users')
      .returning('*')
      .insert(user);

    const { id } = userReturned[0];

    if (userReturned.length === 0) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal Server Error!',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        message: `User account successfully created with id: ${id}`,
        token: '',
        userId: id,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      error: error,
    });
  }
};

exports.signin = (req, res) => {

  db('users')
    .where({ email: req.body.email })
    .select('*')
    .then((user) => {
      if (user.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'User Not Found!',
        });
      }

      const { id, password } = user[0];

      // compare password If user is found
      bcrypt.compare(req.body.password, password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              status: 'error',
              error: 'Incorrect Password!',
            });
          }

          const token = jwt.sign(
            { userId: id },
            'RANDOM_SECRET_TOKEN',
            { expiresIn: '24h' });

          return res.status(200).json({
            status: 'success',
            data: {
              token: token,
              userId: id,
            },
          });
        },
      ).catch(
        (error) => {
          return res.status(500).json({
            status: 'error',
            error: error.detail,
          });
        },
      );
    },
    )
    .catch(
      (error) => {
        return res.status(500).json({
          status: 'error',
          error: error.detail,
        });
      },
    );
};
