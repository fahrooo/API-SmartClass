import * as mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

export const publishMessage = async (req, res) => {
  const topic = req.body.topic;
  const message = req.body.message;
  console.log(message);

  try {
    const url = process.env.MQTT_HOST;
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      message: error,
    });
  }
};

export const subscribeMessage = async (req, res) => {
  const topic = req.body.topic;

  try {
    const url = process.env.MQTT_HOST;
    let client = mqtt.connect(url);

    await client.on("connect", () => {
      console.log("Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });

    await client.on("message", (topic, payload) => {
      // console.log("Received Message:", topic, payload.toString());
      client.end();
      return res.status(200).json({
        status: 200,
        message: payload.toString(),
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      message: error,
    });
  }
};
