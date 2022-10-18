import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const CategoryController = {
  getCategories: async (req, res) => {
    const queryString = `select c.category_id, 
                                c.category_name,
                                c.img_url,
                                c.[description],
                                count(f.food_id) as 'number_of_food'
                        from [category] c left join [food] f on c.category_id = f.category_id
                        group by c.category_id, 
                                c.category_name,
                                c.img_url,
                                c.[description]`;
    const data = await executeQuery(queryString);

    const categories = data;
    console.log(req.body);
    return res.json(categories);
  },
  insertCategory: async (req, res) => {
    const category = req.body;
    const queryString = `INSERT INTO [dbo].[Category]
                          ([category_name]
                          ,[description]
                          ,[img_url])
                          VALUES ('${category.category_name}', 
                                  '${category.description}',
                                  '${category.img_url}')`;
    const data = await executeNonQuery(queryString);

    console.log(data);

    return res.json({ category: category, rowAffected: data.at(0) });
  },
  deleteCategory: async (req, res) => {
    const categoryId = req.body.categoryId;

    console.log(categoryId);
    let queryString = `select category_id from category where category_name = 'Default Category'`;

    const defaultCategoryId = await executeNonQuery(queryString);
    queryString = `update food set category_id = ${defaultCategoryId} where category_id = '${categoryId}'`;

    await executeNonQuery(queryString);

    queryString = `delete from category where category_id = '${categoryId}'`;

    const data = await executeNonQuery(queryString);
    console.log(data);

    return res.json({ categoryId: categoryId, rowAffected: data.at(0) });
  },
  updateCategory: async (req, res) => {
    console.log(req.body);
    const category = req.body;
    const queryString = `UPDATE [dbo].[Category]
                  SET [category_name] = '${category.category_name}'
                     ,[description] =  '${category.description}'
                    ,[img_url] = '${category.img_url}'
                  WHERE [category_id] =  ${category.category_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({
      category_id: category.category_id,
      rowAffected: data.at(0),
    });
  },
};

export default CategoryController;
