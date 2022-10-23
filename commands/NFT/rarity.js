const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "rarity",
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
     
      const symbol = args[0]

                  const details =  (await axios.get(`https://api.coralcube.cc/845d331b-3c6b-42fe-b5ee-58462a5b3f55/getItem?mint=${symbol}`)).data;
 var str = JSON.stringify(details.attributes)
      var arr = [];
JSON.parse(str).forEach(trait => arr.push(trait.trait_type + ": " + trait.value));
var att = arr.join(",\n")
var att2 = att.replace(/^/gm, "・ ");
    const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${details.name}`)
                 .setURL(`https://coralcube.io/detail/${details.mint}`)
    .addField(`🏆・Rarity`, `**${details.rarity_rank}**`)
    .addField(`📦・Total Minted`, `**${details.collection_item_count}**`)
     .addField(`❗・Note`, `**Do not buy or sell your NFTs based on this ranking.**`)
    .setImage(details.image)
                    .setFooter(ee.footertext)
        .setColor(ee.color)
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