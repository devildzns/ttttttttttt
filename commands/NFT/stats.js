const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "fp",
    category: "General",
    cooldown: 2,
    run: async (client, message, args, user, text, prefix) => {
                              try {
                                  
                                    const guild = message.guild.id;

 let codecheck = db.get(`premium_general_commands`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);   
     

      const arg = args.join(" ")
      const symbol = arg.split(' ').join('_').toLowerCase()

       const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${symbol}/stats`)).data;

    var fp = (resp.floorPrice / Math.pow(10, exponent)).toFixed(2);
    var listed = resp.listedCount;
    var vol = (resp.volumeAll / Math.pow(10, exponent)).toFixed(2);
      
      const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${symbol}`)).data;


    
  

    const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${details.name}`)
                 .setURL(`https://magiceden.io/marketplace/${details.symbol}`)
    .addField(`Total Listed`, `**${listed}**`)
        .addField(`Floor Price`, `**${fp} SOL**`)
        .addField(`Total Volume`, `**${vol} SOL**`)
    .setThumbnail(details.image)
        .setTimestamp()
        .setColor(ee.color)
                        .setFooter(ee.footertext)
      if(details.discord){
                                           embed.addField('Discord', `**${details.discord}**`)

}
                if(details.twitter){
                                           embed.addField('Twitter', `**${details.twitter}**`)


}
     message.channel.send(embed);
    
       } catch (err) {
      
     const embed2 = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
     .addField(`Error`, `**\`${err}\`**`)
        .setTimestamp()
        .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext)
        message.channel.send(embed2)
    }

    }
}