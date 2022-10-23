module.exports = async (bot) => {
  const chalk = require("chalk")
  const discord = require("discord.js")
  process.on("unhandledRejection", (reason, p) => {
    console.log(
      chalk.red("[antiCrash]") +
      chalk.blackBright("::") +
      chalk.black("Unhandled Rejection/Catch")
    );
    console.log(reason, p)
    
     const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/995651151586406461/pJAMibnTupkvftfWM-8tCLYgE5b-5OyrCROKzC7VIts_iICvvmaau-l9YW4YK_08xhBO");
                              
                               
                     const embed = new MessageBuilder()
                    .setTitle(`Unhandled Rejection/Catch`)
                                     .setColor('#FF0000')
        .addField(
          `Reason: `, `**\`${reason}\`**`

        )
        .addField(`Promise:`, `**\`${p}\`**`)
                     hook.send(embed)
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(
      chalk.red("[antiCrash]") +
      chalk.blackBright("::") +
      chalk.black("Uncaught Exception/Catch")
    );
    console.log(err, origin)
  const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/995651151586406461/pJAMibnTupkvftfWM-8tCLYgE5b-5OyrCROKzC7VIts_iICvvmaau-l9YW4YK_08xhBO");
                              
                               
                     const embed = new MessageBuilder()
                    .setTitle(`Unhandled Rejection/Catch`)
                                     .setColor('#FF0000')
        .addField(
          `Error: `, `**\`${err}\`**`

        )
        .addField(`Origin:`, `**\`${origin}\`**`)
                     hook.send(embed)
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(
      chalk.red("[antiCrash]") +
      chalk.blackBright("::") +
      chalk.black("Uncaught Exception/Catch (MONITOR)")
    );
    console.log(err, origin)
    const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/995651151586406461/pJAMibnTupkvftfWM-8tCLYgE5b-5OyrCROKzC7VIts_iICvvmaau-l9YW4YK_08xhBO");
    const embed = new MessageBuilder()
                    .setTitle(`Unhandled Rejection/Catch`)
                                     .setColor('#FF0000')
        .addField(
          `Error: `, `**\`${err}\`**`

        )
        .addField(`Origin:`, `**\`${origin}\`**`)
                     hook.send(embed)
  });
  process.on("multipleResolves", (type, promise, reason) => {
    console.log(
      chalk.red("[antiCrash]") +
      chalk.blackBright("::") +
      chalk.black("MultipleRelsoves")
    );
    console.log(promise, reason)
    
    const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/995651151586406461/pJAMibnTupkvftfWM-8tCLYgE5b-5OyrCROKzC7VIts_iICvvmaau-l9YW4YK_08xhBO");
      const embed = new MessageBuilder()
                    .setTitle(`Multiple Resolves`)
                                     .setColor('#FF0000')
        .addField(
          `Type: `, `**\`${type}\`**`


        ).addField(`Promise: `, `**\`${promise}\`**`)
        .addField(`Reason:`, `**\`${reason}\`**`)
                     hook.send(embed)
    

  });
  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
  bot.on("warn", (e) => {
    console.log(chalk.yellow(e.replace(regToken, "that was redacted")));
  });
  bot.on("error", (e) => {
    console.log(chalk.red(e.replace(regToken, "that was redacted")));
  });
  bot.on("shardError", (error) => {
    console.log(
      chalk.red("[antiCrash]") +
      chalk.blackBright("::") +
      chalk.black("ShardError")
    );
    const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/995651151586406461/pJAMibnTupkvftfWM-8tCLYgE5b-5OyrCROKzC7VIts_iICvvmaau-l9YW4YK_08xhBO");
      const embed = new MessageBuilder()
                    .setTitle(`Shard Error`)
                                     .setColor('#FF0000')
        .addField(`Error: `, `**\`${error}\`**`)
                     hook.send(embed)
  });
}
