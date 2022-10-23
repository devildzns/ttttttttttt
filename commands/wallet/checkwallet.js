const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "checkwallet",
          category: "Wallet Notifications",
    description: "Banned wallets List",
    run: async (client, message, args, text, prefix) => {
      
                const guild = message.guild.id;
       
 let codecheck = db.get(`premium_wallet_notifications`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);    
      
    let wallet = db.get(`wallet_${message.author.id}`)      
    const embed2 = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
        .setDescription("**You have not added a wallet.**")
        .setTimestamp()
    .setFooter(ee.footertext)
  .setColor(ee.wrongcolor)
                 
    if(!wallet) return message.channel.send(embed2) 
      
         const b = wallet.slice(-6)
                  const a = wallet.substring(0, 6)
                  
                  const wallet2 = a + "..." + b
                  
    let embed = new Discord.MessageEmbed()
                            embed.setTitle(`Notification Wallet`)
          .addField(`Current Wallet`, `\`${wallet2}\``)
  .setColor(ee.color)
      .setFooter(ee.footertext)
                        .setTimestamp()
                        message.channel.send(embed) 
        
        
    }
    }
