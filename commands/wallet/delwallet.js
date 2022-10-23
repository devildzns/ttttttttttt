const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../../botconfig/embed.json");

module.exports = {
  name: "removewallet",
        aliases: ["rw"],
          category: "Wallet Notifications",
    run: async (client, message, args, text, prefix) => {
        
          const guild = message.guild.id;
       
 let codecheck = db.get(`premium_wallet_notifications`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);    
          const guildicon = message.guild.iconURL();

    let pog = db.get(`wallets`)
    let wallet = args[0]
    if (!wallet) {
      let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
        .setDescription(`${prefix}removewallet (wallet)`)
        .setFooter(message.guild.name)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
      let user = db.get(`user_${wallet}`)
      if(message.author.id != user) {
         let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
        .setDescription(`**You can only delete your wallet.**`)
        .setFooter(message.guild.name)
      .setColor(ee.wrongcolor)
                         .setFooter(ee.footertext)
        return message.channel.send(embed)
      }
    if (pog) {
            let data = pog.find((x) => x.wallet.toLowerCase() === wallet.toLowerCase());
            let No = new Discord.MessageEmbed()
                No.setDescription(`**Wallet Not Found**`)
                No.setColor(ee.wrongcolor)
                          No.setFooter(ee.footertext)


            if (!data) return message.channel.send({ embed: No });

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`wallets`, filter);
                    db.subtract(`userwallets_${message.author.id}`, 1)
      
       const b = wallet.slice(-6)
                  const a = wallet.substring(0, 6)
                  
                  const wallet2 = a + "..." + b
                  
            let embed = new Discord.MessageEmbed()
                  .setTitle("Success")
                embed.setDescription(`**Successfully removed ${wallet2} from database.** `)
embed.setColor(ee.color)
                            .setFooter(ee.footertext)
embed.setTimestamp()
            return message.channel.send({ embed: embed });
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`**The wallet was not found!**`)
                embed.setFooter(message.guild.name, guildicon)
                embed.setColor(ee.wrongcolor)
                                .setFooter(ee.footertext)
                embed.setTimestamp()

            return message.channel.send({ embed: embed });
        }
  }
}