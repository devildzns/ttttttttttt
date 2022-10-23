const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "add-newcollection",
        aliases: ["ra+"],
          category: "Trackers",
    description: "Banned wallets List",

    run: async (client, message, args, text, prefix) => {
          const guildicon = message.guild.iconURL();

    let pog = db.get(`channels_new_collection`)
    
     let Channel = message.mentions.channels.first().id || message.guild.channels.cache.get(args[0]).id;

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

    if (pog && pog.find((find) => find.channel == Channel)) {
            let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
            embed.setDescription(`**That channel is already on the database.**`)
        .setColor(ee.wrongcolor)

            embed.setTimestamp()
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {
      channel: Channel
        }
        let server_tracker = {
                     collection: "Not Found",
   type: "New Collections Tracker",
                  channel: Channel
                }
        db.push(`channels_new_collection`, yes)
                                              db.push(`alltrackers_${message.guild.id}`, server_tracker)
                                                       db.add(`trackers_new_${message.guild.id}`, 1)

        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**Successfully added the tracker.**`)
        .setColor(ee.color)
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })
  
    }
}