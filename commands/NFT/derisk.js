const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const fetch = require('node-fetch');
const ee = require("../../botconfig/embed.json");



module.exports = {
    name: "derisk",
    category: "General",
    cooldown: 2,
    run: async (client, message, args, user, text, prefix) => {
      
                                    try {
      
      const collection_symbol = args[1]
      const amount = args[0]
      
      const getMintTracker = async (wallet) => {
    try{
    const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${wallet}/activities?offset=0&limit=1`, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    });
      
    return response.data;
       } catch (error) {
        console.log("Error fetching mints")
    }
}

             getMintTracker(collection_symbol).then((events) => {
   if (!events.length) return;
         
           events.forEach(async (event) => {     

      
      const data =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${event.tokenMint}`)).data;
                                     const collection = data.collection;
      const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`)).data;

    var fp = (resp.floorPrice / Math.pow(10, exponent)).toFixed(2);  
      const royalty = data.sellerFeeBasisPoints;
      const ME = 200
      const totalroyal =  (Number(royalty) +
            Number(ME)) /
          100;
              let deriskListing = Number((amount / (1 - totalroyal / 100)).toFixed(4));
       let afterFees = Number((fp * (1 - totalroyal / 100)).toFixed(4));
        let profits = Number(afterFees - amount).toFixed(4);
                const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}`)).data;

      if (profits > 1) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${details.name}`)
                 .setURL(`https://magiceden.io/marketplace/${event.collectionSymbol}`)
        .addField(`Collection Floor Price`, `**${fp} SOL**`)
               .addField(`Break Even`, `**If you bought for *${amount} SOL* sell at *${deriskListing} SOL* for Break Even**`)
                      .addField(`PnL Calculator`, `**If you sell at current floor price you will receive ${afterFees} SOL that's a *PROFIT* of *${profits} SOL***`)
    .setThumbnail(details.image)
        .setTimestamp()
        .setColor(ee.color)
                         .setFooter(ee.footertext)
 message.channel.send(embed);
      } else {
        
         const embed = new Discord.MessageEmbed()
        .setTitle(`🔎 ${details.name}`)
                 .setURL(`https://magiceden.io/marketplace/${event.collectionSymbol}`)
        .addField(`Collection Floor Price`, `**${fp} SOL**`)
               .addField(`Break Even`, `**If you bought for *${amount} SOL* sell at *${deriskListing} SOL* for Break Even**`)
                      .addField(`PnL Calculator`, `**If you sell at current floor price you will receive ${afterFees} SOL that's a *LOSS* of *${profits} SOL***`)
    .setThumbnail(details.image)
        .setTimestamp()
                 .setFooter(ee.footertext)
        .setColor(ee.wrongcolor)
 message.channel.send(embed);
        
      }
           })
             })
  
    
         } catch (err) {
           console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
     .setDescription(`**${prefix}derisk [Buying Amount] [Mint Address]**`)
        .addField(`Error`, `**\`${err}\`**`)
        .setTimestamp()
        .setColor(ee.wrongcolor)
                      .setFooter(ee.footertext)
        message.channel.send(embed2)
    }
    
    }
  
}