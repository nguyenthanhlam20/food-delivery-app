import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import BillController from "./BillController";

const dbp = DBProvider();

const OrderController = {
  getAll: async (req, res) => {
    let queryString = `SELECT * FROM [Order]`;

    let orders = await executeQuery(queryString);

    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      queryString = `SELECT * FROM [OrderDetail] WHERE order_id = ${order.order_id}`;

      let orderDetails = await executeQuery(queryString);

      for (let k = 0; k < orderDetails.length; k++) {
        let orderDetail = orderDetails[k];
        queryString = `select i.image_id as [uid],
                              i.image_name as [name],
                              i.url
                        from [Food_Image] ci join food c
                        on ci.food_id = c.food_id join [Image] i
                        on i.image_id = ci.image_id where c.food_id = ${orderDetail.food_id}`;

        let images = await executeQuery(queryString);
        orderDetails[k] = { food_images: images, ...orderDetail };
      }

      orders[i] = { order_details: orderDetails, ...order };
    }

    return res.json(orders);
  },
  getByUsername: async (req, res) => {
    const username = req.body.username;
    let queryString = `SELECT * FROM [Order] WHERE [username] = '${username}'`;

    let orders = await executeQuery(queryString);

    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      queryString = `SELECT * FROM [OrderDetail] WHERE order_id = ${order.order_id}`;

      let orderDetails = await executeQuery(queryString);

      for (let k = 0; k < orderDetails.length; k++) {
        let orderDetail = orderDetails[k];
        queryString = `select i.image_id as [uid],
                              i.image_name as [name],
                              i.url
                        from [Food_Image] ci join food c
                        on ci.food_id = c.food_id join [Image] i
                        on i.image_id = ci.image_id where c.food_id = ${orderDetail.food_id}`;

        let images = await executeQuery(queryString);
        orderDetails[k] = { food_images: images, ...orderDetail };
      }

      orders[i] = { order_details: orderDetails, ...order };
      console.log("first", orders[i]);
    }

    return res.json(orders);
  },
  insertOrder: async (req, res) => {
    const order = req.body;

    console.log("order is being inserted", order);

    let queryString = `INSERT INTO [dbo].[Order]
                                  ([username]
                                  ,[address]
                                  ,[phone]
                                  ,[fullname]
                                  ,[created_date]
                                  ,[shipped_date]
                                  ,[order_status]
                                  ,[payment_method]
                                  ,[delivery_method]
                                  ,[delivery_fee]
                                  ,[is_paid]
                                  ,[total])
                              VALUES
                                  ('${order.username}', '${order.address}', '${order.phone}',
                                  '${order.fullname}', '${order.created_date}', '${order.shipped_date}', 
                                  ${order.order_status}, '${order.payment_method}', '${order.delivery_method}',
                                  ${order.delivery_fee}, ${order.is_paid}, ${order.total})`;

    const data = await executeNonQuery(queryString);

    const foods = order.foods;

    for (let i = 0; i < foods.length; i++) {
      let food = foods[i];
      queryString = `INSERT INTO [dbo].[OrderDetail]
                                ([order_id]
                                ,[food_id]
                                ,[food_name]
                                ,[unit_price]
                                ,[quantity])
                              VALUES
                                ((SELECT IDENT_CURRENT('Order') as [order_id]), ${food.food_id},'${food.food_name}', ${food.unit_price}, ${food.quantity})`;
      await executeNonQuery(queryString);
    }

    return res.json({ rowAffected: data });
  },
  updateOrder: async (req, res) => {
    const order = req.body;
    console.log("order is being updated", order);

    const queryString = `UPDATE [Order] SET order_status = ${order.order_status} WHERE order_id = ${order.order_id}`;

    const data = await executeNonQuery(queryString);

    return res.json({ rowAffected: data });
  },
};

export default OrderController;
