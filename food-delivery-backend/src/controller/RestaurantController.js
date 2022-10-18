import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const RestaurantController = {
  getRestaurants: async (req, res) => {
    const queryString = ``;
    const data = await executeQuery(queryString);

    const categories = data;
    console.log(req.body);
    return res.json(categories);
  },
  insertRestaurant: async (req, res) => {
    const restaurant = req.body;
    const queryString = `INSERT INTO [dbo].[restaurant]
                          ([restaurant_name]
                          ,[adrress]
                          ,[description]
                          ,[img_url]
                          ,[is_active])
                          VALUES ('${restaurant.restaurant_name}', 
                                  '${restaurant.adrress}',
                                  '${restaurant.description}',
                                  '${restaurant.img_url}',
                                  '${restaurant.is_active}')`;
    const data = await executeNonQuery(queryString);

    console.log(data);

    return res.json({ restaurant: restaurant, rowAffected: data.at(0) });
  },
  deleteRestaurant: async (req, res) => {
    const restaurantId = req.body.restaurantId;

    return res.json({ restaurantId: restaurantId, rowAffected: data.at(0) });
  },
  changeRestaurantStatus: async (req, res) => {
    const restaurant = req.body;
    const queryString = `UPDATE [dbo].[restaurant]
                  SET [is_active] =  '${restaurant.is_active}'
                  WHERE [restaurant_id] =  ${restaurant.restaurant_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({
      restaurant_id: restaurant.restaurant_id,
      rowAffected: data.at(0),
    });
  },
  updateRestaurant: async (req, res) => {
    console.log(req.body);
    const restaurant = req.body;
    const queryString = `UPDATE [dbo].[restaurant]
                  SET [restaurant_name] = '${restaurant.restaurant_name}'
                    ,[description] =  '${restaurant.description}'
                    ,[address] =  '${restaurant.address}'
                    ,[is_active] =  '${restaurant.is_active}'
                    ,[img_url] = '${restaurant.img_url}'
                  WHERE [restaurant_id] =  ${restaurant.restaurant_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({
      restaurant_id: restaurant.restaurant_id,
      rowAffected: data.at(0),
    });
  },
};

export default RestaurantController;
