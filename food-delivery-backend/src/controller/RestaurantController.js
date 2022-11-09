import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();
import { FoodController } from "./FoodController";

const RestaurantController = {
  getRestaurantById: async (req, res) => {
    const restaurantId = req.body.restaurant_id;
    console.log(restaurantId);
    let queryString = `select c.restaurant_id, 
                            c.restaurant_name,
                            c.[is_active],
                            c.[address],
                            c.[phone],
                            c.[email],
                            c.[description]
                        from [restaurant] c WHERE c.restaurant_id = ${restaurantId}`;
    let data = await executeQuery(queryString);

    let restaurant = data[0];

    // Get restaurant images
    queryString = `select i.image_id as [uid], 
                    i.image_name as [name],
                    i.url
                    from [Restaurant_Image] ci join restaurant c
                  on ci.restaurant_id = c.restaurant_id join [Image] i
                  on i.image_id = ci.image_id where c.restaurant_id = ${restaurant.restaurant_id}`;
    data = await executeQuery(queryString);
    restaurant.images = data;

    // Get restaurant food
    queryString = `select f.food_id,
                          f.food_name,
                          f.category_id,
                          f.restaurant_id,
                          f.description,
                          f.unit_price,
                          f.is_active
                         from food f join category c on f.category_id = c.category_id where f.restaurant_id = ${restaurant.restaurant_id}`;
    data = await executeQuery(queryString);
    const foods = data;

    console.log("foods", foods);

    const handleGetImage = async (food) => {
      queryString = `select i.image_id as [uid], 
                            i.image_name as [name],
                            i.url
                   from [Food_Image] ci join Food c
                       on ci.food_id = c.food_id join [Image] i
                       on i.image_id = ci.image_id where c.food_id = ${food.food_id}`;
      data = await executeQuery(queryString);
      food.images = data;

      return food;
    };

    let newFoods = [];

    for (let i = 0; i < foods.length; i++) {
      let fo = await handleGetImage(foods[i]).then((response) => {
        return response;
      });

      // console.log("new food", newFood);
      newFoods.push({ ...fo, index: i });
    }

    restaurant.foods = newFoods;

    // console.log("restaurants", newRestaurants);
    return res.json(restaurant);
  },
  getRestaurants: async (req, res) => {
    let queryString = `select c.restaurant_id, 
                                c.restaurant_name,
                                c.[is_active],
                                c.[address],
                                c.[phone],
                                c.[email],
                                c.[description]
                        from [restaurant] c`;
    let data = await executeQuery(queryString);

    let restaurants = data;

    const handleGetImage = async (restaurant) => {
      queryString = `select i.image_id as [uid], 
                         i.image_name as [name],
                         i.url
                    from [Restaurant_Image] ci join restaurant c
                    on ci.restaurant_id = c.restaurant_id join [Image] i
                    on i.image_id = ci.image_id where c.restaurant_id = ${restaurant.restaurant_id}`;
      data = await executeQuery(queryString);

      restaurant.images = data;
      return restaurant;
    };

    let newRestaurants = [];
    for (let i = 0; i < restaurants.length; i++) {
      let cate = await handleGetImage(restaurants[i]).then((response) => {
        return response;
      });
      newRestaurants.push(cate);
    }

    // console.log("restaurants", newRestaurants);
    return res.json(newRestaurants);
  },
  changeActiveStatus: async (req, res) => {
    const restaurant = req.body;
    console.log("restaurant is being change status", restaurant);
    const queryString = `UPDATE [dbo].[restaurant]
                  SET [is_active] =  '${!restaurant.is_active}'
                  WHERE [restaurant_id] =  ${restaurant.restaurant_id}`;

    const data = await executeNonQuery(queryString);

    console.log("data return after change restaurant status", data);
    return res.json({
      restaurant_id: restaurant.restaurant_id,
      rowAffected: data,
    });
  },
  getRestaurantImages: async (req, res) => {
    const restaurantId = req.body.restaurantId;
    console.log(restaurantId);
    const queryString = `select i.image_id as [uid], 
                          i.image_name as [name],
                          i.url
                    from [Restaurant_Image] ci join Restaurant c
                    on ci.restaurant_id = c.restaurant_id join [Image] i
                    on i.image_id = ci.image_id where c.restaurant_id = ${restaurantId}`;
    const data = await executeQuery(queryString);

    console.log("restaurant images: ", data);

    return res.json({ restaurant_images: data });
  },
  insertRestaurant: async (req, res) => {
    const restaurant = req.body;
    console.log(restaurant);
    let queryString = `INSERT INTO [dbo].[restaurant]
                          ([restaurant_name]
                          ,[address]
                          ,[phone]
                          ,[email]
                          ,[description]
                          ,[is_active])
                          VALUES (N'${restaurant.restaurant_name}', 
                                  N'${restaurant.address}',
                                  N'${restaurant.phone}',
                                  N'${restaurant.email}',
                                  N'${restaurant.description}',
                                  '${restaurant.is_active}')`;
    const data = await executeNonQuery(queryString);

    queryString = "SELECT IDENT_CURRENT('Restaurant') as [restaurant_id]";

    const response = await executeQuery(queryString);
    const restaurantId = response[0].restaurant_id;
    console.log("RESPONSE", response);
    const images = restaurant.images;

    images.map((image) => {
      const status = image.status == "done" ? 1 : 0;

      queryString = `INSERT INTO [dbo].[Image]
                      ([image_name]
                      ,[url]
                      ,[status])
                      VALUES
                      ('${image.name}',
                        '${image.url}', 
                        '${status}')`;
      executeNonQuery(queryString);

      queryString = `INSERT INTO [dbo].[Restaurant_Image]
                        ([restaurant_id]
                         ,[image_id])
                    VALUES
                      (${restaurantId},(SELECT IDENT_CURRENT('Image')))`;

      executeNonQuery(queryString);
    });

    console.log("data", data);

    return res.json({
      restaurant: restaurant,
      rowAffected: data,
      currentRestaurantId: restaurantId,
    });
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
    console.log("restaurant is being change status", restaurant);
    const queryString = `UPDATE [dbo].[restaurant]
                  SET [is_active] =  '${restaurant.is_active}'
                  WHERE [restaurant_id] =  ${restaurant.restaurant_id}`;

    const data = await executeNonQuery(queryString);

    console.log("data return after change restaurant status", data);
    return res.json({
      restaurant_id: restaurant.restaurant_id,
      rowAffected: data,
    });
  },
  updateRestaurant: async (req, res) => {
    const restaurant = req.body;
    console.log("restaurant is being updated", req.body);
    const oldImages = restaurant.old_images;
    const newImages = restaurant.images;

    let queryString = `SELECT image_id
                    INTO [Temp_Image]
                    FROM [Image]
                    Where image_id in (SELECT i.image_id from [Image] i join Restaurant_Image ci
                                           on i.image_id = ci.image_id join [restaurant] c
                                           on c.restaurant_id = ci.restaurant_id
                                           where c.restaurant_id = ${restaurant.restaurant_id})
                    DELETE FROM Restaurant_Image where restaurant_id =  ${restaurant.restaurant_id}
                    DELETE FROM [Image] where image_id in (SELECT * FROM [Temp_Image])
                    DROP TABLE [Temp_Image]`;

    await executeNonQuery(queryString);

    queryString = `UPDATE [dbo].[Restaurant]
                 SET [restaurant_name] = '${restaurant.restaurant_name}'
                    ,[address] = '${restaurant.address}'
                    ,[phone] = '${restaurant.phone}'
                    ,[email] = '${restaurant.email}'
                    ,[description] =  '${restaurant.description}'
                 WHERE [restaurant_id] =  ${restaurant.restaurant_id}`;
    const data = await executeNonQuery(queryString);

    newImages.map((image) => {
      const status = image.status == "done" ? 1 : 0;
      queryString = `INSERT INTO [dbo].[Image]
                  ([image_name]
                  ,[url]
                  ,[status])
                  VALUES
                  ('${image.name}',
                    '${image.url}',
                    '${status}')`;
      executeNonQuery(queryString);

      queryString = `INSERT INTO [dbo].[Restaurant_Image]
                    ([restaurant_id]
                     ,[image_id])
                VALUES
                  (${restaurant.restaurant_id},(SELECT IDENT_CURRENT('Image')))`;
      executeNonQuery(queryString);
    });

    return res.json({
      restaurantId: restaurant.restaurant_id,
      rowAffected: data,
    });
  },
};

export default RestaurantController;
