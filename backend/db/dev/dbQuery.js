import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(quertText, params) {
        pool.query(quertText, params)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};