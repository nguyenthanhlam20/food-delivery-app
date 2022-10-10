import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";

const dbp = DBProvider();

export async function getUser(req, res) {
  let user = req.body;
  // user = {
  //   username: "admin",
  //   password: "admin",
  // };
  // console.log(user);
  const queryString = `SELECT * FROM [User] WHERE username = '${user.username}' AND password = '${user.password}'`;
  const data = await executeQuery(queryString);
  return res.json({ user: data.at(0) });
}

export async function insertUser(req, res) {
  const user = req.body;
  const queryString = `INSERT INTO [dbo].[User]
                        ([username]
                        ,[password]
                        ,[email])
                        VALUES ('${user.username}', 
                                '${user.password}',
                                '${user.email}')`;
  const data = await executeNonQuery(queryString);

  return res.json({ user: user, rowAffected: data.at(0) });
}
