const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "remove-above",
        aliases: ["ra+"],
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

      const collection = args[0]
      const price = args[1]
       if (!collection) {
      let embed = new Discord.MessageEmbed()
      .s.setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} remove-above (collection) (price)**`)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
    if (!price) {
      let embed = new Discord.MessageEmbed()
      .s.setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} remove-above (collection) (price)**`)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
     
                                                                     const userw =  db.get(`${collection}_${price}_user`)
if(message.author.id !== userw) {
  let embed = new Discord.MessageEmbed()
   .setTitle("Error")
        .setDescription(`**You can only delete your alerts.**`)
      .setColor(ee.wrongcolor)  
  .setFooter(ee.footertext)
return message.channel.send(embed)
}
       const pog = db.get(`allcollections`)
             
                 if (pog) {
                           const code = `${collection}${price}`
            let data = pog.find((x) => x.code.toLowerCase() === code.toLowerCase());
         

           let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`:x: | **Not Found**`)
                No.setColor(ee.wrongcolor)
                   .setFooter(ee.footertext)
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`allcollections`, filter);
                                                                                          db.subtract(`usercollections_${userw}`, 1)
                           db.delete(`${collection}_${price}_user`)
                                            
               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted.**`)
      .setColor(ee.wrongcolor)
               .setFooter(ee.footertext)
            return message.channel.send({ embed: embed });
                   
                  
      
        
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`:x: | **The Code was not found!**`)
                embed.setColor(ee.wrongcolor)
                embed.setTimestamp()
.setFooter(ee.footertext)
            return message.channel.send({ embed: embed });
        }
     
                 }
  }
