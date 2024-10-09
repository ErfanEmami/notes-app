const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).send('Not authenticated');
    }
    next();
  };
  
  export default authMiddleware;
  