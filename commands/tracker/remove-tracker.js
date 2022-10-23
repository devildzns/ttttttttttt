const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "remove-tracker",
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

      const collection = args[0]
       if (!collection) {
      let embed = new Discord.MessageEmbed()
      .s.setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} remove-collection (collection) (channel)**`)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
      
                                            
  let Channel = message.mentions.channels.first().id;
message.channel.send(Channel)
        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);
  
                                          
           const chpog = db.get(`sales_collections`)
                                       
              if (chpog && !chpog.find((find) => find.collection == collection)) {
                 const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is not on the database.**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
    }
      
             
      
       const pog = db.get(`${collection}_channels`)
             
                 if (pog) {
            let data = pog.find((x) => x.channel === Channel);
         

           let No = new Discord.MessageEmbed()
                 .setTitle(`${ee.emojired} Error`)
              .setDescription(`**That tracker was not found.**`)
              .setColor(ee.wrongcolor)
              .setTimestamp()
.setFooter(ee.footertext)

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`${collection}_channels`, filter)
                   
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
     
                   
                                                 db.subtract(`trackers_${message.guild.id}`, 1)
                   db.delete(`${collection}_${Channel}`, message.guild.id)

               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted the tracker.**`)
      .setColor(ee.wrongcolor)
               .setFooter(ee.footertext)
            return message.channel.send({ embed: embed });
           }
      

                 }
  }
