import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const FoodController = {
  getFoods: async (req, res) => {
    let queryString = `select f.food_id, 
                                f.food_name,
                                f.[is_active],
                                f.[description],
                                f.[unit_price],
                                c.[category_id],
                                c.[category_name],
                                r.[restaurant_id],
                                r.restaurant_name
                        from [food] f join [category] c on f.[category_id] = c.[category_id] 
                                      join [Restaurant] r on r.restaurant_id = f.restaurant_id `;
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

    // console.log("foods", newFoods);
    return res.json(newFoods);
  },
  getFoodImages: async (req, res) => {
    const foodId = req.body.foodId;
    console.log(foodId);
    const queryString = `select i.image_id as [uid], 
                          i.image_name as [name],
                          i.url
                    from [Food_Image] ci join food c
                    on ci.food_id = c.food_id join [Image] i
                    on i.image_id = ci.image_id where c.food_id = ${foodId}`;
    const data = await executeQuery(queryString);

    // console.log("food images: ", data);

    return res.json({ food_images: data });
  },
  insertFood: async (req, res) => {
    const food = req.body;
    console.log("food is being inserted", food);
    const foodImages = food.images;
    let queryString = `INSERT INTO [dbo].[food]
                          ([food_name]
                            ,[is_active]
                            ,[category_id]
                            ,[restaurant_id]
                            ,[unit_price]
                            ,[like]
                            ,[dislike]
                            ,[description])
                          VALUES ('${food.food_name}',
                                  '${food.is_active}',
                                  '${food.category_id}',
                                  '${food.restaurant_id}',
                                  ${food.unit_price},
                                  0,
                                  0,
                                  '${food.description}')`;
    const data = await executeNonQuery(queryString);

    foodImages.map((image) => {
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
      console.log("run here");

      queryString = `INSERT INTO [dbo].[food_Image]
                        ([food_id]
                         ,[image_id])
                    VALUES
                      ((SELECT IDENT_CURRENT('food')),(SELECT IDENT_CURRENT('Image')))`;

      executeNonQuery(queryString);
    });

    // console.log("data return after inserting food", data);

    return res.json({ food: food, rowAffected: data });
  },
  deleteFood: async (req, res) => {
    const foodId = req.body.foodId;

    console.log("food id being deleted", foodId);
    let queryString = `select food_id from food where food_name = 'Default food'`;

    const response = await executeQuery(queryString);

    const defaultfoodId = response.at(0).food_id;

    console.log("default food id", defaultfoodId);
    queryString = `update food set food_id = ${defaultfoodId} where food_id = '${foodId}'`;

    await executeNonQuery(queryString);

    queryString = `delete from food where food_id = '${foodId}'`;

    const data = await executeNonQuery(queryString);
    // console.log(data);

    return res.json({ foodId: foodId, rowAffected: data.at(0) });
  },
  changeActiveStatus: async (req, res) => {
    const food = req.body;
    console.log("food is being change status", food);

    const queryString = `UPDATE [dbo].[food]
                         SET [is_active] = '${!food.is_active}'
                         WHERE [food_id] =  ${food.food_id}`;

    const data = await executeNonQuery(queryString);

    console.log("data return after change status", data);

    return res.json({ food: food, rowAffected: data });
  },

  editFood: async (req, res) => {
    const food = req.body;
    console.log("food is being updated", food);
    // const oldImages = food.old_images;
    const newImages = food.images;

    // console.log("first");
    let queryString = `SELECT image_id
                       INTO [Temp_Table_${food.food_id}]
                       FROM [Image]
                       Where image_id in (SELECT i.image_id from [Image] i join Food_Image ci
                             on i.image_id = ci.image_id join [food] c 
                             on c.food_id = ci.food_id
                             where c.food_id = ${food.food_id})
                        DELETE FROM food_Image where food_id =  ${food.food_id}
                        DELETE FROM [Image] where image_id in (SELECT * FROM [Temp_Table_${food.food_id}])
                        DROP TABLE [Temp_Table_${food.food_id}]`;

    // console.log("second");
    await executeNonQuery(queryString);

    // console.log("third");
    queryString = `UPDATE [dbo].[food]
                 SET [food_name] = '${food.food_name}'
                    ,[category_id] = '${food.category_id}'
                    ,[restaurant_id] = '${food.restaurant_id}'
                    ,[unit_price] = ${food.unit_price}
                    ,[description] =  '${food.description}'
                    ,[is_active] = '${food.is_active}'
                 WHERE [food_id] =  ${food.food_id}`;
    // console.log("fourth", queryString);
    const data = await executeNonQuery(queryString);
    newImages.map((image) => {
      // const status = image.status == "done" ? 1 : 0;
      queryString = `INSERT INTO [dbo].[Image]
                  ([image_name]
                  ,[url]
                  ,[status])
                  VALUES
                  ('${image.name}',
                    '${image.url}', 
                    ${1})`;
      executeNonQuery(queryString);

      queryString = `INSERT INTO [dbo].[Food_Image]
                    ([food_id]
                     ,[image_id])
                VALUES
                  (${food.food_id},(SELECT IDENT_CURRENT('Image')))`;
      executeNonQuery(queryString);
    });
    // console.log("five");

    console.log("data return after updating food", data);

    return res.json({
      foodId: food.food_id,
      rowAffected: data,
    });
  },
};

export default FoodController;
