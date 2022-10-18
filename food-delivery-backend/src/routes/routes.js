import UserController from "../controller/UserController";
import CategoryController from "../controller/CategoryController";

import { CONSTANT_ROUTE } from "../constants";
import { Links } from "./links";

const routes = (app) => {
  Links.map((link) => {
    if (link.method === "get") {
      app.route(link.route).get((req, res, next) => {
        console.log(`request from ${req.originalUrl}`);
        console.log(`request method ${req.method}`);
        next();
      }, link.handleAction);
    } else {
      app.route(link.route).post((req, res, next) => {
        console.log(`request from ${req.originalUrl}`);
        console.log(`request method ${req.method}`);
        next();
      }, link.handleAction);
    }
  });
};

export default routes;
