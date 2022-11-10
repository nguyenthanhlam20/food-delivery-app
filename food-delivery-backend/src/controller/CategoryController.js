import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const CategoryController = {
  getCategories: async (req, res) => {
    let queryString = `select c.category_id, 
                                c.category_name,
                                c.[is_active],
                                c.[description],
                                count(f.food_id) as 'number_of_food'
                        from [category] c left join [food] f on c.category_id = f.category_id
                        group by c.category_id, 
                                c.category_name,
                                c.[is_active],
                                c.[description]`;
    let data = await executeQuery(queryString);

    let categories = data;

    const handleGetImage = async (category) => {
      queryString = `select i.image_id as [uid], 
                         i.image_name as [name],
                         i.url
                    from [Category_Image] ci join Category c
                    on ci.category_id = c.category_id join [Image] i
                    on i.image_id = ci.image_id where c.category_id = ${category.category_id}`;
      data = await executeQuery(queryString);

      category.images = data;
      return category;
    };

    let newCategories = [];
    for (let i = 0; i < categories.length; i++) {
      let cate = await handleGetImage(categories[i]).then((response) => {
        return response;
      });
      newCategories.push(cate);
    }

    // console.log("categories", newCategories);
    return res.json(newCategories);
  },
  getCategoryImages: async (req, res) => {
    const categoryId = req.body.categoryId;
    console.log(categoryId);
    const queryString = `select i.image_id as [uid], 
                          i.image_name as [name],
                          i.url
                    from [Category_Image] ci join Category c
                    on ci.category_id = c.category_id join [Image] i
                    on i.image_id = ci.image_id where c.category_id = ${categoryId}`;
    const data = await executeQuery(queryString);

    // console.log("category images: ", data);

    return res.json({ category_images: data });
  },
  insertCategory: async (req, res) => {
    const category = req.body;
    console.log("Category is being inserted", category);
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
                      ('${image.name}',
                        '${image.url}', 
                        '${status}')`;
      executeNonQuery(queryString);
      // console.log("run here");

      queryString = `INSERT INTO [dbo].[Category_Image]
                        ([category_id]
                         ,[image_id])
                    VALUES
                      ((SELECT IDENT_CURRENT('Category')),(SELECT IDENT_CURRENT('Image')))`;

      executeNonQuery(queryString);
    });

    // console.log(data);

    return res.json({ category: category, rowAffected: data });
  },
  deleteCategory: async (req, res) => {
    const categoryId = req.body.categoryId;

    console.log("category id being deleted", categoryId);
    let queryString = `select category_id from category where category_name = 'Default Category'`;

    const response = await executeQuery(queryString);

    const defaultCategoryId = response.at(0).category_id;

    console.log("default category id", defaultCategoryId);
    queryString = `update food set category_id = ${defaultCategoryId} where category_id = '${categoryId}'`;

    await executeNonQuery(queryString);

    queryString = `delete from category where category_id = '${categoryId}'`;

    const data = await executeNonQuery(queryString);
    // console.log(data);

    return res.json({ categoryId: categoryId, rowAffected: data.at(0) });
  },
  changeActiveStatus: async (req, res) => {
    const category = req.body;
    console.log(category);

    const queryString = `UPDATE [dbo].[Category]
                         SET [is_active] = '${!category.is_active}'
                         WHERE [category_id] =  ${category.category_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({ category: category, rowAffected: data });
  },

  updateCategory: async (req, res) => {
    const category = req.body;
    console.log(req.body);
    const oldImages = category.old_images;
    const newImages = category.new_images;

    let queryString = `SELECT image_id
                    INTO [Temp_Image]
                    FROM [Image]
                    Where image_id in (SELECT i.image_id from [Image] i join Category_Image ci
                                           on i.image_id = ci.image_id join [Category] c 
                                           on c.category_id = ci.category_id
                                           where c.category_id = ${category.category_id})
                    DELETE FROM Category_Image where category_id =  ${category.category_id}
                    DELETE FROM [Image] where image_id in (SELECT * FROM [Temp_Image])
                    DROP TABLE [Temp_Image]`;

    console.log("query", queryString);

    await executeNonQuery(queryString);

    queryString = `UPDATE [dbo].[Category]
                 SET [category_name] = '${category.category_name}'
                    ,[description] =  '${category.description}'
                    ,[is_active] = '${category.is_active}'
                 WHERE [category_id] =  ${category.category_id}`;
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

      queryString = `INSERT INTO [dbo].[Category_Image]
                    ([category_id]
                     ,[image_id])
                VALUES
                  (${category.category_id},(SELECT IDENT_CURRENT('Image')))`;
      executeNonQuery(queryString);
    });

    return res.json({
      categoryId: category.category_id,
      rowAffected: data,
    });
  },
};

export default CategoryController;
