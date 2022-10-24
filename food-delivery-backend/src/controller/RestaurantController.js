import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const RestaurantController = {
  getRestaurants: async (req, res) => {
    const queryString = `SELECT * FROM [restaurant]`;
    const data = await executeQuery(queryString);

    const restaurants = data;
    // console.log(restaurants);
    return res.json(restaurants);
  },
  insertRestaurant: async (req, res) => {
    const restaurant = req.body;
    console.log(restaurant);
    const queryString = `INSERT INTO [dbo].[restaurant]
                          ([restaurant_name]
                          ,[address]
                          ,[description]
                          ,[img_url]
                          ,[is_active])
                          VALUES (N'${restaurant.restaurant_name}', 
                                  N'${restaurant.address}',
                                  N'${restaurant.description}',
                                  '${restaurant.img_url}',
                                  '${restaurant.is_active}')`;
    const data = await executeNonQuery(queryString);

    return res.json({ restaurant: restaurant, rowAffected: data.at(0) });
  },
  deleteRestaurant: async (req, res) => {
    const restaurantId = req.body.restaurantId;
    console.log(restaurantId);
    const queryString = `DELETE FROM restaurant where restaurant_id=${restaurantId}`;
    const data = await executeNonQuery(queryString);
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
