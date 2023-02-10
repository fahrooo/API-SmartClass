import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Units = db.define(
  "unit",
  {
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Units;

(async () => {
    await db.sync();
  })();