'use strict';

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const pubsub_topic = process.env.PUBSUB_TOPIC;

// Publish to Pub/Sub.
exports.publish = async (req, res) => {

  console.log( "Publishing to Pub/Sub Topic: " + pubsub_topic );

  // References an existing topic
  const topic = pubsub.topic( pubsub_topic );

  const messageObject = {
    data: {
      message: req.body,
    },
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');
  
  console.log( JSON.stringify(req.body) );

  // Publish the message.
  try {
    await topic.publish(messageBuffer);
    res.status(200).send('Webhook Successful.');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
};

