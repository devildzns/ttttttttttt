const Discord = require("discord.js");
const db = require("quick.db")
const axios = require("axios");
const ee = require("../../botconfig/embed.json");

const exponent = 9
module.exports = {
  name: "add-collection",
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
  
        let pog = db.get(`sales_collections`)

              if (pog && pog.find((find) => find.collection == collection)) {
                 const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is already on the database.**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
    }
      
///////////////////////////////////////////
                                      
                let yes2 = {
                  collection: collection,
                }
           
                db.push(`sales_collections`, yes2)

///////////////////////////////////////////
                                      

        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**The collection has been added to database.**`)
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