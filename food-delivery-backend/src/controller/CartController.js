import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const CartController = {
  getCartInfo: async (req, res) => {
    const username = req.body.username;
    console.log("get cart of username", username);
    let queryString = `select f.food_id, 
                               f.food_name,
                               f.[is_active],
                               f.[description],
                               f.[unit_price],
                               c.[category_id],
                               c.[category_name],
                               r.[restaurant_id],
                               r.restaurant_name,
                               ca.quantity,
                               ca.username
                  from [food] f join [category] c on f.[category_id] = c.[category_id] 
                                join [Restaurant] r on r.restaurant_id = f.restaurant_id 
                                join [Cart] ca on ca.food_id = f.food_id where ca.username = '${username}' `;
    let data = await executeQuery(queryString);

    let foods = data;

    const handleGetImage = async (food) => {
      queryString = `select i.image_id as [uid], 
                            i.image_name as [name],
                            i.url
                    from [Food_Image] ci join food c
                        on ci.food_id = c.food_id join [Image] i
                        on i.image_id = ci.image_id where c.food_id = ${food.food_id}`;
      data = await executeQuery(queryString);

      food.images = data;
      return food;
    };

    let newFoods = [];
    for (let i = 0; i < foods.length; i++) {
      let food = await handleGetImage(foods[i]).then((response) => {
        return response;
      });
      newFoods.push(food);
    }

    const info = {
      username: username,
      foods: newFoods,
    };

    // console.log("foods", newFoods);

    return res.json({ info: info });
  },

  insertFood: async (req, res) => {
    const cart = req.body;
    console.log("food is being inserted", cart);
    const queryString = `INSERT INTO [CART]([food_id], [quantity], [username]) VALUES(${cart.food_id}, ${cart.quantity},'${cart.username}')`;

    const data = await executeNonQuery(queryString);
    console.log("result after updated food ", data);

    return res.json({ rowAffected: data });
  },
  deleteFood: async (req, res) => {
    const cart = req.body;
    console.log("food in cart is being deleted ", cart);

    const queryString = `DELETE FROM [CART] WHERE [food_id] = ${cart.food_id} AND [username] = '${cart.username}'`;

    const data = await executeNonQuery(queryString);

    return res.json({ rowAffected: data });
  },

  updateFood: async (req, res) => {
    const cart = req.body;
    console.log("food in cart is being updated ", cart);
    const queryString = `UPDATE [CART] SET [quantity] = ${cart.quantity} WHERE [food_id] = ${cart.food_id} AND [username] = '${cart.username}'`;

    const data = await executeNonQuery(queryString);
    console.log("result after updated food ", data);

    return res.json({ rowAffected: data });
  },

  clearCart: async (req, res) => {
    const username = req.body.username;
    console.log("cart of username is being cleared", username);
    const queryString = `DELETE FROM [CART] WHERE [username] = '${username}'`;

    const data = await executeNonQuery(queryString);

    console.log("result after clear cart ", data);

    return res.json({ rowAffected: data });
  },
};

export default CartController;
