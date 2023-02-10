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

export const putUnits = async (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;

  try {
    const unitbyId = await Units.findAll({
      where: {
        id: id,
      },
    });

    if (unitbyId.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Unit not found",
      });
    }

    const unit = await Units.update(
      {
        nama: nama,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Unit updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const deleteUnits = async (req, res) => {
  const id = req.params.id;

  try {
    const unitbyId = await Units.findAll({
      where: {
        id: id,
      },
    });

    if (unitbyId.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Unit not found",
      });
    }

    const unit = await Units.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Unit delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
