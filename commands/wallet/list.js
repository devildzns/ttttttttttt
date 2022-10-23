const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "walletlist",
        aliases: ["wl"],

          category: "Wallet Notifications",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, text, prefix) => {
     
          const guild = message.guild.id;
       
 let codecheck = db.get(`premium_wallet_notifications`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
.setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);    
        let guildicon = message.guild.iconURL()
   
          let embed = new Discord.MessageEmbed()
    embed.setTitle(`Wallets list`)
                      .setFooter(ee.footertext)
    embed.setColor(ee.color)
        let wallets = db.get(`wallets`);
        if (wallets && wallets.length) {
            let array = [];
            wallets.forEach((x) => {
                            const userw = db.get(`user_${x.wallet}`)
                            const user = client.users.cache.get(userw)
                            const wallet = x.wallet
                                const b = wallet.slice(-6)
                  const a = wallet.substring(0, 6)
                  
                  const wallet2 = a + "..." + b
                array.push(`${user.tag} (\`${wallet2}\`)`);
            });

            embed.setDescription(`**${array.join('\n')}**`);
          
        } else {
          return message.channel.send("**There are No wallets.**")
        }
        
        return message.channel.send({ embed: embed });
  }
}