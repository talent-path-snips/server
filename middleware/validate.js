const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.send(401);

  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    response.status(401).send();
  }
};
