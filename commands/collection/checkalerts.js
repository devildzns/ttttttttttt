const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../../botconfig/embed.json");
const ms = require('parse-ms')

module.exports = {
    name: "myalerts",
        aliases: ["la+"],
          category: "NFT Alerts",
    description: "Banned wallets List",
    run: async (client, message, args, text, prefix) => {
        
           const guild = message.guild.id;

 let codecheck = db.get(`premium_floor_alerts`)
 
  let alreadyexist = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature.**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);                                   

        let guildicon = message.guild.iconURL()
   
          let embed = new Discord.MessageEmbed()
    embed.setTitle(`Alerts list`)
  .setFooter(ee.footertext)
    embed.setColor(ee.color)
        let words = db.get(`user_collections_${message.author.id}`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**__Collection:__ ${x.name}\n__Target:__ ${x.type} ${x.price} SOL**`);
            });
          

            embed.setDescription(`${array.join('\n\n')}`);
          
        } else {
            let embed = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
  .setDescription(`**You don't have any alerts.**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
          return message.channel.send(embed)
        }
        
        return message.channel.send({ embed: embed });
  }
}