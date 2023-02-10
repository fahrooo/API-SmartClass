import Units from "../models/UnitsModel";
import { Op, where } from "sequelize";

export const getUnits = async (req, res) => {
  try {
    const unit = await Units.findAll();

    return res.status(200).json({
      status: 200,
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      error: error,
    });
  }
};

export const postUnits = async (req, res) => {
  const nama = req.body.nama;

  try {
    const unit = await Units.create({ nama });

    return res.status(200).json({
      status: 200,
      message: "Unit created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
