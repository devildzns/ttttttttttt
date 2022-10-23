module.exports = client => {


const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require("quick.db");
const Discord = require("discord.js");



const getHistoryWalletTracker = (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/collections?offset=0&limit=1`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
};

    
const synchronizeWalletTracker = () => {
   let wallets = db.get(`channels_new_collection`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.channel}`);
            });
 }
        
       const data = getHistoryWalletTracker().then((events) => {
        
          
            (events).forEach(async (event) => {
              
        const latestSale = db.get(`last_collection`);
         
                                 let embed = new Discord.MessageEmbed()
                    .setTitle(`${event.name}`)
                    .setColor('#00FF00')
                     .setDescription(`**${event.description}**`)
                     .addField('Magic Eden', `**https://magiceden.io/marketplace/${event.symbol}**`)
                    .setThumbnail(event.image)
                    .setTimestamp()
                    .setFooter("Made by 0xDeViL#9999")
                     if(event.discord){
                                           embed.addField('Discord', `**${event.discord}**`)

}
                if(event.twitter){
                                           embed.addField('Twitter', `**${event.twitter}**`)


}
              
array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
})                    
         
                            
                    db.set(`last_collection`, event.symbol)
              
              
            })
        });
   
};

 synchronizeWalletTracker();
    setInterval(() => synchronizeWalletTracker(), 10000);

console.log("ready")
}