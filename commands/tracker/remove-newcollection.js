const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "remove-newcollection",
        aliases: ["ra+"],
          category: "Trackers",
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

   let Channel = message.mentions.channels.first().id || message.guild.channels.cache.get(args[0]).id;

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);
      
       const pog = db.get(`channels_new_collection`)
             
                 if (pog) {
            let data = pog.find((x) => x.channel.toLowerCase() === Channel.toLowerCase());
         

           let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`**Not Found**`)
                No.setColor(ee.wrongcolor)
                   .setFooter(ee.footertext)
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`channels_new_collection`, filter)
                   
                                       const pog2 = db.get(`alltrackers_${message.guild.id}`)
             
                 if (pog2) {
            let data = pog2.find((x) => x.channel === Channel);
             let yes = pog2.indexOf(data);
            delete pog2[yes];

            var filter = pog2.filter((x) => {
                return x != null && x != '';
            });
            db.set(`alltrackers_${message.guild.id}`, filter)
                                                
           }
     
                   db.subtract(`trackers_new_${message.guild.id}`, 1)
                                            
               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted.**`)
      .setColor(ee.wrongcolor)
               .setFooter(ee.footertext)
            return message.channel.send({ embed: embed });
                   
                  
      
        
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`**That tracker was not found.**`)
                embed.setColor(ee.wrongcolor)
                embed.setTimestamp()
.setFooter(ee.footertext)
            return message.channel.send({ embed: embed });
        }
     
                 }
  }
