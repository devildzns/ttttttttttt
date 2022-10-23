const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");
const cloudscraper = require('cloudscraper');

module.exports = {
    name: "me-rarity",
    category: "General",
    cooldown: 2,
    run: async (client, message, args, user, text, prefix) => {
            try {
              
                    const symbol = args[0]

      
      const fetchUrl = async (url) => {
    const delay = m => new Promise((resolve, reject) => { setTimeout(_ => resolve(), m) });
    try {
        const response = await cloudscraper.get(url).catch(async (err) => {
            if (err.statusCode) return;
            await delay(1000);
            return fetchUrl(url);
        });
        if (!response) return;
        return JSON.parse(response);
    } catch (e) {
        await delay(1000);
        return fetchUrl(url);
    }
};
      //9iYsqicWyvLrrmYoyzRFoifY9CVCoJJ1h7VbaUnBTpyz
      

     const details =  (await axios.get(`https://api-mainnet.magiceden.dev/rpc/getNFTByMintAddress/${symbol}?useRarity=true`)).data.results;
              console.log(details)
 var str = JSON.stringify(details.attributes)
      var arr = [];
JSON.parse(str).forEach(trait => arr.push(trait.trait_type + ": " + trait.value));
var att = arr.join(",\n")
var att2 = att.replace(/^/gm, "・ ");
    const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${details.title}`)
                 .setURL(`https://coralcube.io/detail/${details.mint}`)
    .addField(`🏆・Rank`, `**${details.rarity.merarity.rank}**`)
    .addField(`📦・Total Minted`, `**${details.rarity.merarity.totalSupply}**`)
     .addField(`:warning:・Note`, `**Do not buy or sell your NFTs based on this ranking.**`)
    .setImage(details.img)
                    .setFooter(ee.footertext)
        .setColor(ee.color)
     message.channel.send(embed);
              
      
         } catch (err) {
                    console.log(err)

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