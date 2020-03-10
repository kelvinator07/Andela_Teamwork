import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import { isValidEmail, validatePassword, isEmpty } from '../helpers/validation';
import { errorMessage, successMessage, status } from '../helpers/status';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import 'dotenv/config';

exports.signup = async (req, res) => {

    const { email, firstname, lastname, password, gender, jobrole, department, address, avatarurl, userrole } = req.body;

    const createdAt = moment(new Date());
    const updatedAt = moment(new Date());

    if (isEmpty(email) || isEmpty(firstname) || isEmpty(lastname) || isEmpty(password)) {
        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }
    // const hashedPassword = hashPassword(password);
    const saltRounds = 10;
    // Hash password
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    const createUserQuery = `INSERT INTO
      users(email, firstname, lastname, password, gender, jobrole, department, address, avatarurl, userrole, updatedAt, createdAt)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`;
    const values = [
        email, firstname, lastname, req.body.password, gender,
        jobrole, department, address, avatarurl, userrole, updatedAt, createdAt,
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;
        const token = jwt.sign(
            {userId: dbResponse.id},
            process.env.JWT_SECRET_TOKEN,
            {expiresIn: '24h'});
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }


    // try {
    //     // Check If Email Exists from DB
    //     const user = await models.User.findOne({
    //         where: {email: req.body.email}
    //     });
    //
    //     if (user) {
    //         throw 'Email Already Exist!';
    //     }
    //
    //     const saltRounds = 10;
    //     // Hash password
    //     req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    //
    //     // Insert User Into DB
    //     const userReturned = await models.User.create(req.body);
    //
    //     if (userReturned === null) {
    //         return res.status(500).json({
    //             status: 'error',
    //             error: 'Internal Server Error!',
    //         });
    //     }
    //
    //     const {id} = userReturned;
    //
    //     return res.status(201).json({
    //         status: 'success',
    //         data: {
    //             message: `User account successfully created with id: ${id}`,
    //             token: '',
    //             userId: id,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(401).json({
    //         status: 'error',
    //         error: error || error.message,
    //     });
    // }
};

exports.signin = async (req, res) => {

    const { email, password } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }
    const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
    return res.status(200).json({ message: `Teamwork App! on Port ${process.env.PORT}` });
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        // compare password If user is found
        const valid = await bcrypt.compare(password, dbResponse.password);

        if (!valid) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        const token = jwt.sign(
            {userId: dbResponse.id},
            process.env.JWT_SECRET_TOKEN,
            {expiresIn: '24h'});
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }


    // try {
    //
    //     const user = await models.User.findOne({
    //         where: {email: req.body.email}
    //     });
    //
    //     if (user === null) {
    //         throw 'User Doesn\'t Exist!';
    //     }
    //
    //     const {id, password} = user;
    //
    //     // compare password If user is found
    //     const valid = await bcrypt.compare(req.body.password, password);
    //
    //     if (!valid) {
    //         console.log('Not Valid');
    //         return res.status(401).json({
    //             status: 'error',
    //             error: 'User Details Incorrect!',
    //         });
    //     }
    //
    //     const token = jwt.sign(
    //         {userId: id},
    //         process.env.JWT_SECRET_TOKEN,
    //         {expiresIn: '24h'});
    //
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             token: token,
    //             userId: id,
    //         },
    //     });
    //
    // } catch (error) {
    //     return res.status(401).json({
    //         status: 'error',
    //         error: error || error.message,
    //     });
    // }
};
