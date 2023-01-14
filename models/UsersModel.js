import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    nama: {
      type: DataTypes.STRING,
    },
    nik: {
      type: DataTypes.BIGINT,
    },
    unit: {
      type: DataTypes.INTEGER,
    },
    jabatan: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["super admin", "admin", "operator", "peserta"],
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;

(async () => {
    await db.sync();
  })();