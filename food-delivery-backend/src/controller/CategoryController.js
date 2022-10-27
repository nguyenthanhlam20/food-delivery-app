import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const CategoryController = {
  getCategories: async (req, res) => {
    const queryString = `select c.category_id, 
                                c.category_name,
                                c.[description],
                                count(f.food_id) as 'number_of_food'
                        from [category] c left join [food] f on c.category_id = f.category_id
                        group by c.category_id, 
                                c.category_name,
                                c.[description]`;
    const data = await executeQuery(queryString);

    const categories = data;
    console.log(req.body);
    return res.json(categories);
  },
  getCategoryImages: async (req, res) => {
    const categoryId = req.body.categoryId;
    console.log(categoryId);
    const queryString = `select i.image_id, 
                          i.image_name,
                          i.url
                    from [Category_Image] ci join Category c
                    on ci.category_id = c.category_id join [Image] i
                    on i.image_id = ci.image_id where c.category_id = ${categoryId}`;
    const data = await executeQuery(queryString);

    console.log("category images: ", data);

    return res.json({ category_images: data });
  },
  insertCategory: async (req, res) => {
    const category = req.body;
    const categoryImages = category.images;
    let queryString = `INSERT INTO [dbo].[Category]
                          ([category_name]
                          ,[is_active]
                          ,[description])
                          VALUES ('${category.category_name}',
                                  '${category.is_active}',
                                  '${category.description}')`;
    const data = await executeNonQuery(queryString);

    categoryImages.map((image) => {
      const status = image.status == "done" ? 1 : 0;

      queryString = `INSERT INTO [dbo].[Image]
                      ([image_name]
                      ,[url]
                      ,[status])
                      VALUES
                      ('${image.fileName}',
                        '${image.url}', 
                        '${status}')`;
      executeNonQuery(queryString);
      console.log("run here");

      queryString = `INSERT INTO [dbo].[Category_Image]
                        ([category_id]
                         ,[image_id])
                    VALUES
                      ((SELECT IDENT_CURRENT('Category')),(SELECT IDENT_CURRENT('Image')))`;

      executeNonQuery(queryString);
    });

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
                  WHERE [category_id] =  ${category.category_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({
      category_id: category.category_id,
      rowAffected: data.at(0),
    });
  },
};

export default CategoryController;
