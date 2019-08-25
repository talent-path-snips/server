const { pool } = require('../db/pgConfig');

exports.getAllUsers = (req, res, next) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
