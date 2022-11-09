import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const CartController = {
  getCartInfo: async (req, res) => {
    const username = req.body.username;
    const queryString = `SELECT * FROM [CART] WHERE [username] = ${username}`;

    const data = executeQuery(queryString);

    return res.json({ cart: data });
  },

  insertFood: async (req, res) => {
    const cart = req.body.cart;
    const queryString = `INSERT INTO [CART]([food_id], [quantity], [username]) VALUES(${cart.food_id}, ${cart.quantity},'${cart.username}')`;

    const data = executeQuery(queryString);

    return res.json({ rowAffected: data });
  },
  deleteFood: async (req, res) => {
    const cart = req.body.cart;
    const queryString = `DELETE FROM [CART] WHERE [food_id] = ${cart.food_id} AND [username] = '${cart.username}')`;

    const data = executeQuery(queryString);

    return res.json({ rowAffected: data });
  },

  updateFood: async (req, res) => {
    const cart = req.body.cart;
    const queryString = `UPDATE [CART] SET [quantity] = ${cart.quantity} WHERE [food_id] = ${cart.food_id} AND [username] = '${cart.username}')`;

    const data = executeQuery(queryString);

    return res.json({ rowAffected: data });
  },
};

export default CartController;
