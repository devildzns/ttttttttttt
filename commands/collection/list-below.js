const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../../botconfig/embed.json");

const ms = require('parse-ms')

module.exports = {
    name: "list-below",
        aliases: ["lb-"],
          category: "NFT Alerts",
    description: "Banned wallets List",
    run: async (client, message, args, text, prefix) => {
        
           const guild = message.guild.id;

 let codecheck = db.get(`premium_floor_alerts`)
 
  let alreadyexist = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);                                   

        let guildicon = message.guild.iconURL()
  
          let embed = new Discord.MessageEmbed()
    embed.setTitle(`Targets list`)
  
    embed.setColor(ee.color)
        let words = db.get(`allcollections_below`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**Collection: ${x.name} | Added By: ${x.user} | Below: ${x.price} SOL | Code: ${x.code}**`);
            });
          

            embed.setDescription(`・${array.join('\n\n・')}`);
          
        } else {
          return message.channel.send("**There are No Collections.**")
        }
        
        return message.channel.send({ embed: embed });
  }
}