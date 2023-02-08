import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Datastream = db.define(
  "datastream",
  {
    id_perangkat: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    turn_on: {
      type: DataTypes.STRING,
    },
    turn_off: {
      type: DataTypes.STRING,
    },
    max_value: {
      type: DataTypes.INTEGER,
    },
    min_value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Datastream;

(async () => {
  await db.sync();
})();
