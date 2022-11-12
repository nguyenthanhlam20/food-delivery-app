import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
const dbp = DBProvider();

const BillController = {
  getAll: async (req, res) => {},
  getByUsername: async (req, res) => {},
  insertBill: async (req, res) => {
    const bill = req.body;
    const queryString = `INSERT INTO [dbo].[Bill]
                                  ([order_id]
                                  ,[total]
                                  ,[payment]
                                  ,[bill_status])
                              VALUES
                                  (SELECT IDENT_CURRENT('Order'), ${bill.total}, '${bill.payment}', ${bill.bill_status})`;

    const data = executeNonQuery(queryString);
    return res.json({ rowAffected: data });
  },
  updateBill: async (req, res) => {},
};

export default BillController;
