const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");
const cloudscraper = require('cloudscraper');

module.exports = {
    name: "scrape",
    category: "General",
    cooldown: 2,
    run: async (client, message, args, user, text, prefix) => {
            try {
              
                    const cmid = args[0]

      
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
      
      const data = await fetchUrl(`https://api.verytech.io/api/v1/candymachines/${cmid}`)
      
      const date = new Date(data.goLiveDate);

const timestampInMs = date.getTime();

const unixTimestamp = Math.floor(date.getTime() / 1000);
      
        const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${data.name}`)
    .addField(`goLiveDate`, `**<t:${unixTimestamp}>**`)
    .addField(`Total Supply`, `**${data.totalSupply}**`)
     .addField(`Mint Price`, `**${data.price}**`)
    .setImage(data.image)
                    .setFooter(ee.footertext)
        .setColor(ee.color)
           if(data.originUrl){
                                           embed.setURL(`${data.originUrl}`)

}
                     if(data.discordUrl){
                                           embed.addField('Discord', `**${data.discordUrl}**`)

}
                if(data.twitterUrl){
                                           embed.addField('Twitter', `**${data.twitterUrl}**`)


}
     message.channel.send(embed);
              
      console.log(data)
      
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