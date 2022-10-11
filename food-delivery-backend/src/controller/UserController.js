import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

export async function getUser(req, res) {
  let user = req.body;
  const queryString = `SELECT * FROM [User] WHERE username = '${user.username}' AND password = '${user.password}'`;
  const data = await executeQuery(queryString);

  if (data.at(0)) {
    user = data.at(0);
    const accessToken = jwt.sign(user, "secretKey", {
      expiresIn: "20m",
    });
    return res.json({ user, accessToken: accessToken });
  } else {
    return res.status(401).json("Username or password incorrect");
  }
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

  console.log(data);

  return res.json({ user: user, rowAffected: data.at(0) });
}
