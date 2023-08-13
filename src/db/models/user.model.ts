import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";

import sequelizeConnection from "../index.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: number;
  username: string;
  email: string;
  password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelizeConnection, tableName: "users", timestamps: false }
);

export default User;
