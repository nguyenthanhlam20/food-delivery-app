import { jwt } from "jsonwebtoken";

export const verify = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      } else {
        req.user = user;
      }

      next();
    });
  } else {
    res.statu(401).json("You are not authenticated");
  }
};
