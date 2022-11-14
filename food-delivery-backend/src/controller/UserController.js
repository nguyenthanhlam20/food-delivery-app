import DBProvider, { executeQuery, executeNonQuery } from "../dal/DBProvider";
import jwt from "jsonwebtoken";
const dbp = DBProvider();

const UserController = {
  getUser: async (req, res) => {
    let user = req.body;
    console.log("user detail", user);
    const queryString = `SELECT * FROM [User] WHERE username = '${user.username}' AND password = '${user.password}'`;
    const data = await executeQuery(queryString);
    console.log("user return", data);
    if (data.length > 0) {
      user = data[0];

      const accessToken = jwt.sign(user, "secretKey", {
        expiresIn: "20m",
      });
      console.log(accessToken);
      return res.json({ user: user, accessToken: accessToken });
    } else {
      return res.status(401).json("Username or password incorrect");
    }
  },
  getUsers: async (req, res) => {
    const queryString = `SELECT * FROM [User]`;
    const data = await executeQuery(queryString);

    const users = data;
    // console.log(data);
    return res.json({ users });
  },
  insertUser: async (req, res) => {
    const user = req.body;
    const queryString = `INSERT INTO [dbo].[User]
                          ([username]
                          ,[password]
                          ,[phone]
                          ,[role])
                          VALUES ('${user.username}', 
                                  '${user.password}',
                                  '${user.phone}', 
                                  'user')`;
    const data = await executeNonQuery(queryString);

    console.log(data);

    return res.json({ user: user, rowAffected: data });
  },
  updateUserInfo: async (req, res) => {
    const user = req.body;
    console.log("user is being updated", user);
    const queryString = `UPDATE [dbo].[User]
                          SET [phone] = '${user.phone}'
                            ,[first_name] = '${user.first_name}'
                            ,[last_name] = '${user.last_name}'
                            ,[gender] = '${user.gender}'
                            ,[dob] = '${user.dob}'
                            ,[address] = '${user.address}'
                            ,[img_url] = '${user.img_url}'
                            ,[img_name] = '${user.img_name}'
                            ,[email] = '${user.email}'
                        WHERE [username] = '${user.username}'`;
    const data = await executeNonQuery(queryString);

    console.log(data);

    return res.json({ user: user, rowAffected: data });
  },
  getUserByUsername: async (req, res) => {
    const username = req.body.username;
    console.log("get user info of", username);
    const queryString = `SELECT * FROM [User] WHERE username = '${username}'`;

    const data = await executeQuery(queryString);
    return res.json({ data: data[0] });
  },
};

export default UserController;
