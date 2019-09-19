const bcrypt = require('bcrypt');
const Author = require('../models/Author.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.signup = async ({ body: { username, password } }, response, next) => {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 1);
    const author = await Author.insert({ username, password: hashedPassword });
    response.status(201).send(author);
  } catch (err) {
    next(err);
  }
};

exports.login = async ({ body: { username, password } }, response, next) => {
  try {
    // find the user
    const author = await Author.select(username);
    // error if not found
    if (!author) throw new ErrorWithHttpStatus('User does not exist', 401);

    // check password
    const isCorrectPassword = await bcrypt.compare(password, author.password);
    if (!isCorrectPassword)
      throw new ErrorWithHttpStatus('Incorrect password', 401);

    response.send('Logged in');
  } catch (error) {
    next(error);
  }
};
