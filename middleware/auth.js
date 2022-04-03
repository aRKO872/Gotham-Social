const jwt = require("jsonwebtoken");
const config = require("config");

//exporting a middleware function for authentication which works on request and response, and triggers
//callback function next after function is done executing to start the next piece of middleware.
module.exports = (req, res, next) => {
  //get token
  const token = req.header("x-auth-token");

  //if token is isEmpty
  if(!token){
    return res.status(401).json({ msg : "No token, authorization denied" });
  }

  //verify token
  try{
    //decode the JWT using verify function, which takes the token and the jwtSecret
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //setting user of the request to the user gottten from the payload of the jwt
    req.user = decoded.user;
    next();         //triggering the callback to be further implemented in a protected route
  }catch(err){
    res.status(401).json({ msg : "Token is not valid" });
  }

};
