import Waktu from "../models/WaktuModel";

export const getWaktu = async (req, res) => {
  try {
    const waktu = await Waktu.findAll();

    return res.status(200).json({
      status: 200,
      data: waktu,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      error: error,
    });
  }
};

export const postWaktu = async (req, res) => {
  const { time_start, time_end } = req.body;

  try {
    const waktu = await Waktu.create({ time_start, time_end });

    return res.status(200).json({
      status: 200,
      message: "Waktu created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const putWaktu = async (req, res) => {
  const id = req.params.id;
  const { time_start, time_end } = req.body;

  try {
    const waktubyId = await Waktu.findAll({
      where: {
        id: id,
      },
    });

    if (waktubyId.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Waktu not found",
      });
    }

    const waktu = await Waktu.update(
      { time_start, time_end },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Waktu updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const deleteWaktu = async (req, res) => {
  const id = req.params.id;

  try {
    const waktubyId = await Waktu.findAll({
      where: {
        id: id,
      },
    });

    if (waktubyId.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Waktu not found",
      });
    }

    const waktu = await Waktu.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Waktu delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
