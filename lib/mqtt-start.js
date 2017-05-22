
var mqtt = require('mqtt');



/**
 * mqttStart - start connection to MQTT broker and register
 * onConnect and onRequest callbacks.
 *
 * @param  {String} botId     the bot's ID
 * @param  {String} secret    the bot's secret
 * @param  {Function} onConnect the callback to run when connection established
 * @param  {Function} onDisconnect the callback to run when connection broken
 * @param  {Function} onRequest the callback to run when message received
 */
function mqttStart (userId, botId, secret, onConnect, onDisconnect, onRequest) {

    var url = "mqtts://mqtt.proxybot.xyz";
    var options = {
      port: 1883,
      clientId: `${userId}:${botId}`,
      username: `${userId}:${botId}`,
      password: secret,
    };
    mqtt_client = mqtt.connect(url, options);

    // Connected to MQTT broker
    mqtt_client.on('connect', function() {
      mqtt_client.subscribe(`client/${userId}:${botId}`, (err) => {
        if (err) console.log(err);
        onConnect();
      })
    });

    // Received message on subscribed topic
    mqtt_client.on('message', function(topic, buffer, packet) {
      onRequest(JSON.parse(packet.payload.toString()));
    });

    // Disconnected from MQTT broker
    mqtt_client.on('close', function(err) {
      mqtt_client.end(true);
      console.log(err);
      onDisconnect();
    });

    return mqtt_client;
}

module.exports = mqttStart;
