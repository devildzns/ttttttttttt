//Importing all needed Commands
const Discord = require("discord.js");

//this is the official discord.js wrapper for the Discord Api, which we use!

const config = require("./botconfig/config.json")

const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false, 
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

require("./errorHandler.js")(client)
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Modules
//require("./modules/mint-tracker.js")
//require("./modules/sales-bot.js")(client)
//require("./modules/new-collections.js")(client)
//require("./modules/mint-tracker.js")(client)
//require("./modules/paperhand.js")(client)
//require("./modules/wallet-trackers.js")(client)
//require("./modules/alert-above.js")(client)
//require("./modules/alert-below.js")(client)

//login into the bot
client.login(require("./botconfig/config.json").token);
