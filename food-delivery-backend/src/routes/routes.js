import { getUser, insertUser, getUsers } from "./../controller/UserController";

const routes = (app) => {
  app
    .route("/signin")
    .get((req, res, next) => {
      console.log(`request from ${req.originalUrl}`);
      console.log(`request method ${req.method}`);
      next();
    }, getUser)
    .post(getUser);

  app.route("/signup").post(insertUser);
  app.route("/logout").post((req, res) => {});

  app.route("/authen/manage/user/get").get(getUsers);
};

export default routes;
