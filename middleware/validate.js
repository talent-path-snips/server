const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.send(401);

  const token = authorization.split(' ')[1];
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    console.log(result);

    next();
  } catch (error) {
    response.send(error);
  }
};
