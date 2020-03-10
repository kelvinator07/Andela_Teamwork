import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(quertText, params) {
        pool.query(quertText, params, (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        });
    },
};