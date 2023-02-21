import { Op } from "sequelize";
import Booking from "../models/BookingModel";
import Kelas from "../models/KelasModel";
import Units from "../models/UnitsModel";

export const getBooking = async (req, res) => {
  const {
    filter_unit,
    filter_status,
    filter_kelas,
    status,
    id_kelas,
    id_unit,
  } = req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(Booking, { foreignKey: "id_kelas" });
  Booking.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  if (filter_status == true && filter_unit == true && filter_kelas == true) {
    const totalRows = await Booking.count({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (filter_status == false && filter_unit == true && filter_kelas == true) {
    const totalRows = await Booking.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (filter_status == true && filter_unit == true && filter_kelas == false) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (filter_status == true && filter_unit == false && filter_kelas == false) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (filter_status == false && filter_unit == true && filter_kelas == false) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (filter_status == false && filter_unit == false && filter_kelas == false) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }
};

export const postBooking = async (req, res) => {
  const {
    id_user,
    id_kelas,
    id_waktu,
    waktu_pemesanan,
    is_booking,
    status,
    keterangan,
    code_akses,
  } = req.body;

  try {
    const booking = await Booking.create({
      id_user,
      id_kelas,
      id_waktu,
      waktu_pemesanan,
      is_booking,
      status,
      keterangan,
      code_akses,
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

export const putBooking = async (req, res) => {
  const id = req.params.id;
  const {
    id_user,
    id_kelas,
    id_waktu,
    waktu_pemesanan,
    is_booking,
    status,
    keterangan,
    code_akses,
  } = req.body;

  try {
    const booking = await Booking.update(
      {
        id_user,
        id_kelas,
        id_waktu,
        waktu_pemesanan,
        is_booking,
        status,
        keterangan,
        code_akses,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Updated failed",
    });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const bookingbyid = await Booking.findAll({
      where: {
        id: id,
      },
    });

    if (bookingbyid.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Booking not found",
      });
    }

    const booking = await Booking.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
