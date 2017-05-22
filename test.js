
const
  Bot = require('./index').Bot;


var args = process.argv.slice(2);

if (args.length != 3) {
  console.log('missing credentials');
  process.exit();
}

var uid = args[0];
var bid = args[1];
var sk = args[2];


// the callback to be executed when connected
function onConnect() {
  console.log("Connected!");
  //client.publish(`server/${uid}:${bid}/create`, JSON.stringify({id: 'test', 'sk': 'test'}));
  //client.publish(`server/${uid}:${bid}/remove`, JSON.stringify({id: 'test'}));
}

// the callback to be executed when disconnected
function onDisconnect() {
  console.log("Disconnected!");
  process.exit();
}

// the callback to be executed when message received
function onRequest(message) {
  console.log("message received:", message);
  var req = message;
  if ('method' in req) {
    console.log(`got ${req.method} request`);
    console.log(req.body);

    bot.respond(req.id, 200, 'yes?');
  }
}

var bot = new Bot(uid, bid, sk, onConnect, onDisconnect, onRequest);
bot.start();
