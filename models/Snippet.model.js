const format = require('pg-format');
const db = require('../db');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

/**
 * a snippet object
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/**
 * Inserts a new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Missing properties', 400);
    const result = await db.query(
      `INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [code, title, description, author, language]
    );
    return result.rows[0];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Selects snippets from DB.
 * Can accept optional query object to filter results;
 * otherwise, returns all snippets.
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} array of Snippet objects
 */
exports.select = async query => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );

    const results = await db.query(formattedSelect, Object.values(query));
    return results.rows;
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 */
exports.update = async (id, newData) => {
  try {
    /* Hans' Solution */
    const { author, code, title, description, language } = newData;
    await db.query(
      `UPDATE snippet
      SET 
        author = COALESCE($2, author),
        code = COALESCE($3, code),
        title = COALESCE($4, title),
        description = COALESCE($5, description),
        language=COALESCE($6, language)
      WHERE id = ($1)`,
      [id, author, code, title, description, language]
    );
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error', 500);
  }
};

/**
 * Deletes a snippet
 * @param {string} id
 */
exports.delete = async id => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    // check if some number of rows were deleted
    if (result.rowCount === 0)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404);

    /* Old code
    // Read in the db file
    const snippets = await readJsonFromDb('snippets');
    // filter snippets for everything except snippet.id
    const filteredSnips = snippets.filter(snippet => snippet.id !== id);
    if (filteredSnips.length === snippets.length)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404); // short circuit if id not found

    // write the file
    return writeJsonToDb('snippets', filteredSnips);
    */
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error', 500);
  }
};
