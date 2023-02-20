import { Op, where } from "sequelize";
import Perangkat from "../models/PerangkatModel";

export const getPerangkat = async (req, res) => {
  const { nama } = req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  const totalRows = await Perangkat.count({
    where: {
      nama: { [Op.substring]: nama },
    },
  });

  const totalPage = Math.ceil(totalRows / limit);
  try {
    const perangkat = await Perangkat.findAll({
      where: {
        nama: { [Op.substring]: nama },
      },
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: perangkat.length ? 200 : 404,
      message: perangkat.length ? "Data Found" : "Data Not Found",
      data: perangkat.length ? perangkat : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + perangkat.length - 1,
      totalRows: perangkat.length ? totalRows : null,
      totalPage: perangkat.length ? totalPage : null,
    });
  } catch (error) {
    return res.status(200).json({
      status: 500,
      message: error,
    });
  }
};

export const postPerangkat = async (req, res) => {
  const { nama } = req.body;

  const checkNamaPerangkat = await Perangkat.findAll({
    where: {
      nama: nama,
    },
  });

  if (checkNamaPerangkat.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Perangkat already exist",
    });
  }

  try {
    const perangkat = await Perangkat.create({
      nama: nama,
    });

    return res.status(200).json({
      status: 200,
      message: "Created successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Created failed",
    });
  }
};

export const putPerangkat = async (req, res) => {
  const id = req.params.id;
  const { nama } = req.body;

  const checkNamaPerangkat = await Perangkat.findAll({
    where: {
      nama: nama,
    },
  });

  if (checkNamaPerangkat.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Perangkat already exist",
    });
  }

  try {
    const perangkat = await Perangkat.update(
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
      message: "Update successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Update failed",
    });
  }
};

export const deletePerangkat = async (req, res) => {
  const id = req.params.id;

  try {
    const perangkatbyid = await Perangkat.findAll({
      where: {
        id: id,
      },
    });

    if (perangkatbyid.length > 0) {
      const perangkat = await Perangkat.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({ status: 404, message: "Perangkat not found" });
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: "Deleted failed" });
  }
};
