const { pool } = require('../db/pgConfig');

/**
 * a user object
 * @typedef {Object} User
 * @property {string} username
 * @property {string} name
 * @property {string} profilePicture
 * @property {string} password
 */

/**
 * Selects users from DB.
 * Can accept optional query object to filter results;
 * otherwise, returns all snippets.
 * @param {Object} [query]
 * @returns {Promise<User[]>} array of Snippet objects
 */
exports.select = async (query = {}) =>
  (await pool.query('SELECT * FROM "user" ORDER BY username ASC')).rows;
