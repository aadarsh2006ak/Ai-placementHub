/**
 * Custom middleware factory to sanitize request body, query, and params against NoSQL operator injection.
 * It deletes keys starting with '$' or containing '.' to prevent query modification.
 * Fits Express v5 request properties.
 * 
 * @returns {import('express').RequestHandler}
 */
function mongoSanitize() {
  return (req, res, next) => {
    const sanitize = (obj) => {
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            sanitize(obj[key]);
          }
        }
      }
    };

    if (req) {
      if (req.body) sanitize(req.body);
      if (req.query) sanitize(req.query);
      if (req.params) sanitize(req.params);
    }

    next();
  };
}

module.exports = mongoSanitize;
