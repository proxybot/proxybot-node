

const
  mqtt = require('mqtt'),
  mqttStart = require('./mqtt-start.js'),
  findHashtags = require('./helpers.js').findHashtags,
  removeHashtags = require('./helpers.js').removeHashtags;


/**
 * ProxyBot - Class to abstract connecting to ProxyBot MQTT Broker
 *
 * @param  {String}   id     the bot's ID
 * @param  {String}   sk    the bot's secret
 * @param  {Function} onConnect the callback to run when bot connects
 * @param  {Function} onRequest the callback to run when bot receives a message
 */
function Bot(uid, bid, sk, onConnect, onDisconnect, onRequest) {

  var mqtt_client = false;

  // start the connection to the MQTT Broker
  this.start = function() {
    mqtt_client = mqttStart(uid, bid, sk, onConnect, onDisconnect, onRequest);
    setInterval(() => {
      mqtt_client.publish(`server/${uid}:${bid}/respond`, JSON.stringify({}));
    }, 10000)
  }

  // end the connection
  this.stop = function() {
    mqtt_client.end();
  }

  this.respond = (reqId, status, response) => {
    mqtt_client.publish(`server/${uid}:${bid}/respond`, JSON.stringify({id: reqId, status: status, response: response}));
  }

  this.redirect = (reqId, url) => {
    mqtt_client.publish(`server/${uid}:${bid}/redirect`, JSON.stringify({id: reqId, url: url}));
  }

}

module.exports = Bot;
