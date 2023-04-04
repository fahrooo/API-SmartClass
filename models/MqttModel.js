import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Mqtt = db.define(
  "mqtt",
  {
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Mqtt;

(async () => {
  await db.sync();
})();
