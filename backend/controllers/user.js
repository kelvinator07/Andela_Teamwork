import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../database/models';

exports.signup = async (req, res) => {

    try {
        // Check If Email Exists from DB
        const user = await models.User.findOne({
            where: {email: req.body.email}
        });

        if (user) {
            throw 'Email Already Exist!';
        }

        const saltRounds = 10;
        // Hash password
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

        // Insert User Into DB
        const userReturned = await models.User.create(req.body);

        if (userReturned === null) {
            return res.status(500).json({
                status: 'error',
                error: 'Internal Server Error!',
            });
        }

        const {id} = userReturned;

        return res.status(201).json({
            status: 'success',
            data: {
                message: `User account successfully created with id: ${id}`,
                token: '',
                userId: id,
            },
        });

    } catch (error) {
        return res.status(401).json({
            status: 'error',
            error: error || error.message,
        });
    }
};

exports.signin = async (req, res) => {

    try {

        const user = await models.User.findOne({
            where: {email: req.body.email}
        });

        if (user === null) {
            throw 'User Doesn\'t Exist!';
        }

        const {id, password} = user;

        // compare password If user is found
        const valid = await bcrypt.compare(req.body.password, password);

        if (!valid) {
            console.log('Not Valid');
            return res.status(401).json({
                status: 'error',
                error: 'User Details Incorrect!',
            });
        }

        const token = jwt.sign(
            {userId: id},
            'RANDOM_SECRET_TOKEN',
            {expiresIn: '24h'});

        return res.status(200).json({
            status: 'success',
            data: {
                token: token,
                userId: id,
            },
        });

    } catch (error) {
        return res.status(401).json({
            status: 'error',
            error: error || error.message,
        });
    }
};
