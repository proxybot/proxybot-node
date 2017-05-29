
var NodeWebcam = require( "node-webcam" );


//Return type with base 64 image

var opts = {
    callbackReturn: "base64",
    width: 320,
    height: 180,
    quality: 1,
};

var capture = () => {
  return new Promise((resolve,reject) => {
    NodeWebcam.capture( "pic", opts, function( err, data ) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

const
  Bot = require('../index').Bot;

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
  //console.log(`Public endpoint: https://app.proxybot.xyz/bot/${uid}/${bid}/{{ hookSecret }}`)
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

    capture().then(data => {
      bot.respond(req.id, 200, `<img src="${data}" style="width:100%;"/>`);
    }).catch(err => {
      bot.respond(req.id, 500, err.message);
    });
  }
}

var bot = new Bot(uid, bid, sk, onConnect, onDisconnect, onRequest);
bot.start();
