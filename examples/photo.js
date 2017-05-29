
const
  fs = require('fs')
  Bot = require('../index').Bot;

var args = process.argv.slice(2);

if (args.length != 3) {
  console.log('missing credentials');
  process.exit();
}

var uid = args[0];
var bid = args[1];
var sk = args[2];



function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


// the callback to be executed when connected
function onConnect() {
  console.log("Connected!");
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

    if (req.method == "GET") {

      bot.respond(req.id, 200, `<img src="data:image/png;base64, ${base64_encode('proxy.png')}"/>`);


    }

  }
}

var bot = new Bot(uid, bid, sk, onConnect, onDisconnect, onRequest);
bot.start();
