const Discord = require("discord.js");
const db = require("quick.db")
const axios = require("axios");
const ee = require("../../botconfig/embed.json");

const exponent = 9
module.exports = {
  name: "alert-above",
        aliases: ["aa+"],
          category: "NFT Alerts",
    run: async (client, message, args, text, prefix) => {
      
                                    try {
                                        
                                           const guild = message.guild.id;

 let codecheck = db.get(`premium_floor_alerts`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)

  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);                                   


         const guildicon = message.guild.iconURL();

    let pog = db.get(`collections`)
     
        let userwallets = db.get(`usercollections_${message.author.id}`)


       if (userwallets >= 2) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${ee.emojired} Error`)
            embed.setDescription(`**You can only track 2 collections.**`)
  .setColor(ee.wrongcolor)
            return message.channel.send({
              embed: embed
            });
        }
      
    let collection = args[0]
           let price = args[1]
 if (!price) {
      let embed = new Discord.MessageEmbed()
              .setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} alert-above (collection) (price)**`)
  .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
                                      
                                               const eembed = new Discord.MessageEmbed()
                 .setTitle(`${ee.emojired} Error`)
            .setTimestamp()
            .setColor(ee.wrongcolor)
            .setDescription(`**Alert price should be a number.**`)
            if(isNaN(price)) return message.channel.send(eembed) 
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
                                      
                                      
                                       if (fp > price) {
        
    const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription("**Alert price should be more then the current Floor Price.**")
    .addField(`Current Floor Price`, `**${fp} SOL**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
        .setFooter(ee.footertext)
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
   
      
      const usercollections =  db.get(`${collection}_${price}_user`)
      if(usercollections){
          let embed = new Discord.MessageEmbed()
      .setTitle(`${ee.emojired} Error`)
        .setDescription(`**The collection with same price is alredy being tracked by someone else.**`)
  .setColor(ee.wrongcolor)
          .setFooter(ee.footertext)
        return message.channel.send(embed)
      }
      

                let yes2 = {
                  name: collection,
                  price: price,
                  user: message.author.tag,
                  code: `${collection}${price}`,
                  type: `Above`
                }
                let price2 = {price: price}

     //db.set(`${collection}_price`, price)
             db.push(`${collection}_prices`, price2)
         db.set(`${collection}_${price}_user`, message.author.id)
      db.set(`${collection}_${message.author.id}_price`, price)
              db.push(`allcollections`, yes2)
                                                    db.push(`user_collections_${message.author.id}`, yes2)
              db.add(`usercollections_${message.author.id}`, 1)
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**The alert has been added.**`)
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