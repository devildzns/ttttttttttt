const Discord = require("discord.js");
const db = require("quick.db")
const axios = require("axios");
const ee = require("../../botconfig/embed.json");

const exponent = 9
module.exports = {
  name: "add-sales-tracker",
        aliases: ["aa+"],
          category: "Trackers",
    run: async (client, message, args, text, prefix) => {
      
                                    try {
                                        
                                           const guild = message.guild.id;

 let codecheck = db.get(`premium_floor_alerts`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)

  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);                                   


      
    let collection = args[0]
   
     let Channel = message.mentions.channels.first().id;
message.channel.send(Channel)
        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);
   const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`)).data;
             var fp = (resp.floorPrice / Math.pow(10, exponent)).toFixed(2);
                                      
                                        if (fp === "NaN") {
                                        
        
    const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription("**Couldn't find that collection.**")
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
      
                                      }
                                      
                                      
                                      
                                    
      
    if (!collection) {
      let embed = new Discord.MessageEmbed()
              .setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} alert-above (collection) (price)**`)
  .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
                                      
                                       const pog = db.get(`sales_collections`)
                                         let array = [];
      
    

 if (pog && pog.length) {
            pog.forEach((x) => {
                array.push(`${x.collection}`);
            });
 }  
                                         if (array.length < 1) {
      
       const embed = new Discord.MessageEmbed()
  .setColor(ee.wrongcolor)
        .setTitle(`${ee.emojired} Error`)
      .setDescription(`**There are no collections in the database.**`)
                       .setFooter("Developed by 0xDeViL#3230")
      .setTimestamp()
       
      return message.channel.send(embed);
    }
                                       
              if (pog && !pog.find((find) => find.collection == collection)) {
                 const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is not on the database.**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
    }

      
      const usercollections =  db.get(`${collection}_${Channel}`)
      if(usercollections){
          let embed = new Discord.MessageEmbed()
      .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is alredy being tracked.**`)
  .setColor(ee.wrongcolor)
          .setFooter(ee.footertext)
        return message.channel.send(embed)
      }
      

                let yes2 = {
                  collection: collection,
                }
                let channel2 = {
                  channel: Channel
                }
 let server_tracker = {
                     collection: collection,
   type: "Collection Tracker",
                  channel: Channel
                }
                
            db.push(`${collection}_channels`, channel2)          
            db.set(`${collection}_${Channel}`, message.guild.id)
            db.add(`trackers_${message.guild.id}`, 1)
                                        db.push(`alltrackers_${message.guild.id}`, server_tracker)          
          
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**The tracker has been added.**`)
        embed.setColor(ee.color)
        embed.setTimestamp()
                                      .setFooter(ee.footertext)
        message.channel.send({
          embed: embed
        })
                                       } catch (err) {
      console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription(`**\`${err}\`**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
        message.channel.send(embed2)
    }
  }
}