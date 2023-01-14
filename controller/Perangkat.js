import * as mqtt from "mqtt";

export const relayPost = async (req, res) => {
  const topic = req.body.topic;
  const message = req.body.message;
  try {
    const url = "mqtt://siss-dev.pindad.com";
    let client = mqtt.connect(url);

    client.on("connect", function () {
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

export const relayGet = async (req, res) => {
  const topic = req.body.topic;
  try {
    const url = "mqtt://siss-dev.pindad.com";
    let client = mqtt.connect(url);

    client.on("connect", () => {
      console.log("Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });

    client.on("message", (topic, payload) => {
      console.log("Received Message:", topic, payload.toString());
    //   res.status(200).json({
    //     status: 200,
    //     message: "Fetch Data Successfully",
    //     message: payload.toString(),
    //   });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      message: error,
    });
  }
};
