import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(quertText, params) {
        return new Promise((resolve, reject) => {
            pool.query(quertText, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    // }
    //     pool.query(quertText, params, (error, results) => {
    //         if (error) {
    //             throw error;
    //         }
    //         return results.rows;
    //     });
    // },
};