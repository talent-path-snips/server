const db = require('../db');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.insert = async ({ username, password }) => {
  try {
    if (!username || !password)
      throw new ErrorWithHttpStatus('Missing properties', 400);
    const result = await db.query(
      `INSERT INTO author (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    return result.rows[0];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

exports.select = async username => {
  try {
    const results = await db.query(`SELECT * FROM author WHERE username = $1`, [
      username,
    ]);
    return results.rows[0];
  } catch (error) {
    throw new ErrorWithHttpStatus('Database error');
  }
};
