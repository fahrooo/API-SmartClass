import * as mqtt from "mqtt";
import dotenv from "dotenv";
import { WebSocket } from "ws";
import Mqtt from "../models/MqttModel";

export const getMqtt = async (req, res) => {
  const serverMqtt = await Mqtt.findAll();

  if (serverMqtt.length > 0) {
    return res.status(200).json({
      status: 200,
      data: serverMqtt[0],
    });
  }
};

export const putMqtt = async (req, res) => {
  const id = req.params.id;
  const { nama } = req.body;

  const serverMqtt = await Mqtt.update({ nama: nama }, { where: { id: id } });

  return res.status(200).json({
    status: 200,
    message: "MQTT update successfully",
  });
};

export const publishMessage = async (req, res) => {
  const topic = req.body.topic;
  const message = req.body.message;

  try {
    const serverMqtt = await Mqtt.findAll();
    const url = serverMqtt[0].nama;
    let client = mqtt.connect(url);

    await client.on("connect", function () {
      client.publish(topic, message);
      res.status(200).json({
        status: 200,
        msg: "Message Sent successfully",
        data: {
          topic: topic,
          message: message,
        },
      });
    });
  } catch (error) {}
};

export const subscribeMessage = async (req, res) => {
  const topic = req.body.topic;

  try {
    const serverMqtt = await Mqtt.findAll();
    const url = serverMqtt[0].nama;
    let client = mqtt.connect(url);

    await client.on("connect", () => {
      console.log("Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });

    await client.on("message", (topic, payload) => {
      // console.log("Received Message:", topic, payload.toString());
      if (payload) {
        client.end();
        return res.status(200).json({
          status: 200,
          message: payload.toString(),
        });
      } else {
        return res.status(200).json({
          status: 400,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendBufferAudio = async (req, res) => {
  const buffer = req.body.buffer;

  try {
    const ws = new WebSocket("ws://localhost:8000/getbuffer");
    ws.on("error", console.error);
    ws.on("open", function open() {
      ws.send(buffer);
    });
  } catch (error) {
    console.log(error);
  }
};
