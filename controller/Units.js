import Units from "../models/UnitsModel";
import { Op, where } from "sequelize";

export const getUnitsAll = async (req, res) => {
  try {
    const unit = await Units.findAll({ order: [["nama", "ASC"]] });

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

export const getUnits = async (req, res) => {
  const { filter_nama, nama } = req.body;
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  if (filter_nama == true) {
    const totalRows = await Units.count({
      where: {
        nama: { [Op.substring]: nama },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const users = await Units.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
    });
  } else {
    const totalRows = await Units.count({});

    const totalPage = Math.ceil(totalRows / limit);

    const users = await Units.findAll({
      order: [["nama", "ASC"]],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: users.length ? 200 : 404,
      message: users.length ? "Data Found" : "Data Not Found",
      data: users.length ? users : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + users.length - 1,
      totalRows: users.length ? totalRows : null,
      totalPage: users.length ? totalPage : null,
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
