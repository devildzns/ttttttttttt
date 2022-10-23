const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const fetch = require('node-fetch');
const ee = require("../../botconfig/embed.json");

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
});


module.exports = {
    name: "crypto",
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

      let input = args.join(" ")
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
      let change = priceChange >= 0 ? "📈" : "📉";

    if(priceChange > 0) {
			const embed = new Discord.MessageEmbed()
      .setDescription(`**${currPrice} USD (+${priceChange}%)**`)
              .setAuthor(`${name}`, `${thumb}`)
              
        .setURL(`https://coinmarketcap.com/currencies/${coin.id}`)
      .setColor(ee.color)
				.setTimestamp();
     message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed()
                      .setAuthor(`${name}`, `${thumb}`)
      .setDescription(`**${currPrice} USD (${priceChange}%)**`)
        
        .setURL(`https://coinmarketcap.com/currencies/${coin.id}`)
      .setColor(ee.wrongcolor)
				.setTimestamp()
                .setFooter(ee.footertext)
     message.channel.send(embed);
      }
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
