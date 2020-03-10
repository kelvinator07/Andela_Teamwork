import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    jobrole VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    avatarurl VARCHAR(255) NOT NULL,
    userrole VARCHAR(255) NOT NULL,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone
);`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Create Articles Table
 */
const createArticleTable = () => {
    const articleCreateQuery = `CREATE TABLE IF NOT EXIST Articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description text NOT NULL,
    authorId INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    share VARCHAR(255) NOT NULL,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    FOREIGN KEY (authorId) REFERENCES Users (id)
);`;

    pool.query(articleCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Create Comments Table
 */
const createCommentTable = () => {
    const commentCreateQuery = `CREATE TABLE IF NOT EXIST Comments (
    id SERIAL PRIMARY KEY,
    description text,
    authorId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    FOREIGN KEY (authorId) REFERENCES Users (id),
    FOREIGN KEY (postId) REFERENCES Articles (id),
    FOREIGN KEY (postId) REFERENCES Gifs (id)
);`;

    pool.query(commentCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Create Gifs Table
 */
const createGifTable = () => {
    const gifCreateQuery = `CREATE TABLE IF NOT EXIST Gifs (
    id SERIAL PRIMARY KEY,
    authorId INTEGER NOT NULL,
    title VARCHAR(255),
    imageurl VARCHAR(255),
    share VARCHAR(255),
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    FOREIGN KEY (authorId) REFERENCES Users (id)
);`;

    pool.query(gifCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Drop User Table
 */
const dropUserTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Articles Table
 */
const dropArticleTable = () => {
    const articlesDropQuery = 'DROP TABLE IF EXISTS articles';
    pool.query(articlesDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Comments Table
 */
const dropCommentTable = () => {
    const commentsDropQuery = 'DROP TABLE IF EXISTS Comments';
    pool.query(commentsDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Gifs Table
 */
const dropGifTable = () => {
    const gifsDropQuery = 'DROP TABLE IF EXISTS Gifs';
    pool.query(gifsDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
    createUserTable();
    createArticleTable();
    createCommentTable();
    createGifTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
    dropArticleTable();
    dropCommentTable();
    dropGifTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});


export {
    createAllTables,
    dropAllTables,
};

require('make-runnable');