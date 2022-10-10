import { getUser, insertUser } from "./../controller/UserController";

const routes = (app) => {
  // app.route("/user").get((req, res, next) => {
  //   // middleware
  //   console.log(`Request from: ${req.originalUrl}`);
  //   console.log(`Request type: ${req.method}`);
  //   // res.send("ok");
  //   next();
  // }, getUser);

  app
    .route("/signin")
    .get((req, res, next) => {
      console.log(`request from ${req.originalUrl}`);
      console.log(`request method ${req.method}`);
      next();
    }, getUser)
    .post(getUser);

  app.route("/signup").post(insertUser);
};

export default routes;
