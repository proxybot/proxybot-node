

### Example usage

```javascript
var userId = '{{ userId }}'; // your username from https://app.proxybot.xyz
var botId = '{{ botId }}';   // your bot's ID
var secret = '{{ botSk }}';  // your bot's SK

var proxybot = require('proxybot-node');

// the callback to be executed when connected
function onConnect() {
  console.log("connected!");
}

// the callback to be executed when disconnected
function onDisconnect() {
  console.log("disconnected!");
  process.exit();
}

// the callback to be executed when message received
function onRequest(message) {
  console.log("request received:", message.toString());
}

var bot = new proxybot.Bot(botId, secret, onConnect, onDisconnect, onRequest);
bot.start();
```
