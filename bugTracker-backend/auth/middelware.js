import jwt from "jsonwebtoken";
const secretey = "fakfnasuhnfsnwfumvcsmimngnwdncvhhmcxxcmlkih";



 function authmid(req, res, next) {
  try {
    const token = req.cookies.item;
    if (!token) {
      return res.json({
        message: "no token provided",
      });
    }

    const decoded = jwt.verify(token, secretey);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token expired",
      err: err,
    });
  }
}

export default authmid;