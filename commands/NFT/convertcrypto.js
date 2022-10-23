const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const fetch = require('node-fetch');
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");



module.exports = {
    name: "convertcrypto",
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
     
      const coinList = await axios.get(
        "https://api.coingecko.com/api/v3/coins/list"
      );

      let input = args[1]
        if(!input) {
       const embed2 = new Discord.MessageEmbed()
        .setTitle(`Syntax Error`)
        .setDescription("**n!convertusd [amount] [crypto]**")
        .setTimestamp()
        .setColor(ee.wrongcolor)
                           .setFooter(ee.footertext)
       return message.channel.send(embed2)
}
      let price = args[0]
       if(!price) {
       const embed2 = new Discord.MessageEmbed()
        .setTitle(`Syntax Error`)
        .setDescription("**n!convertusd [amount] [crypto]**")
        .setTimestamp()
        .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext)
       return message.channel.send(embed2)
}
      input = input.toLowerCase();
      const coin = coinList.data.find(
        (elem) =>
          elem.id.toLowerCase() == input ||
          elem.symbol.toLowerCase() == input ||
          elem.name.toLowerCase() == input
      );

   

      let coinStats = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
          coin.id
      );
      let data = coinStats.data[0];
      let thumb = data.image;
      let symbol = data.symbol.toUpperCase();
      let name = data.name;
      let currPrice = (data.current_price).toFixed(2);
      let priceChange = (data.price_change_percentage_24h).toFixed(2);
    let USD = (price / currPrice).toFixed(2)
      let change = priceChange >= 0 ? "📈" : "📉";

			const embed = new Discord.MessageEmbed()
      .setDescription(`**${price} USD = ${USD} ${symbol}**`)
              .setAuthor(`${name}`, `${thumb}`)
              
        .setURL(`https://coinmarketcap.com/currencies/${coin.id}`)
      .setColor(ee.color)
                                .setFooter(ee.footertext)
				.setTimestamp();
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
  },
};
