const User = require('../models/User.model');

exports.getAllUsers = async (request, response, next) => {
  try {
    // 1. get data from User model
    const users = await User.select();
    // 2. send that out
    return response.send(users);
  } catch (err) {
    next(err);
  }
};
