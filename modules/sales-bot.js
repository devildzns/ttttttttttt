module.exports = client => {


const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db');
const Discord = require("discord.js");


const getHistoryWalletTracker = (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/activities?offset=0&limit=1`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
};

const fetchMagicEdenNFT = (mint) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${mint}`).then((res) => {
            res.json().then((data) => {
                resolve(data.results);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
}

///////////////// FUNCTIONS ///////////////////////////



/////////////////////////////////////////////////////////////////////////////////


const synchronizeWalletTracker = () => {
  
    let wallets = db.get(`sales_collections`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.collection}`);
            });
 }
  
  console.log(array)
  
   array.forEach((collection) => {

      const latestSale = db.get(`last_activity_collection_${collection}`)

        getHistoryWalletTracker(collection).then((events) => {
          

        
              if (!events.length) return;
            
            let newevents = [];
            const indexOfLastListingInNewArray = events.findIndex((e) => e.signature === latestSale);

 // if the last listing can not be found
            // (for example if the latest listing was deleted)
            if (indexOfLastListingInNewArray === -1) {
                newevents.push(events[0]);
            } else {
                newevents = events.slice(0, indexOfLastListingInNewArray);
            }

            if (newevents[0] || !latestSale) {
                db.set(`last_activity_collection_${collection}`, newevents[0].signature);
            }

           newevents.reverse().forEach(async (event) => {
              
                              setTimeout(async () => {
                                        
          
               let channels = db.get(`${collection}_channels`);
            let channels_array = [];

 if (channels && channels.length) {
            channels.forEach((x) => {
                channels_array.push(`${x.channel}`);
            });
 }
                                
  const meta = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${event.tokenMint}`);
  const metadata = await meta.json();
                                
                                            
                  
               

                              
                   if(event.type === "list"){
                     
                       const sell = event.seller

                  
             const b = sell.slice(-4)
                  const a = sell.substring(0, 4)
                  
                  const seller = a + "..." + b
                     
            let embed = new Discord.MessageEmbed()
.setTitle(`${metadata.name} → LISTED`)
.addField('Price', `**${event.price.toFixed(2)} SOL**`)
.setColor('#00F393')
.setImage(`${metadata.image}`)
.addField('Seller', `**[${seller}](https://explorer.solana.com/address/${event.seller})**`)
                            .addField('Mint Token', `**[${event.tokenMint}](https://magiceden.io/item-details/${event.tokenMint})**`)
.setTimestamp()
.setFooter("Developed by 0xDeViL#3230")
                                                                   channels_array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                        })

                    }
                
                if(event.type === "delist"){
                  
                    const sell = event.seller

                  
             const b = sell.slice(-4)
                  const a = sell.substring(0, 4)
                  
                  const seller = a + "..." + b
                  
                              let embed = new Discord.MessageEmbed()
                   .setTitle(`${metadata.name} → DELISTED`)
.addField('Price', `**${event.price.toFixed(2)} SOL**`)
.setColor('#00F393')
.setImage(`${metadata.image}`)
.addField('Seller', `**[${seller}](https://explorer.solana.com/address/${event.seller})**`)
                                                          .addField('Mint Token', `**[${event.tokenMint}](https://magiceden.io/item-details/${event.tokenMint})**`)

.setTimestamp()
.setFooter("Developed by 0xDeViL#3230")
   channels_array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                    }
                
               
                
                 if(event.type === "buyNow"){
                   
                     const sell = event.seller

                  
             const b = sell.slice(-4)
                  const a = sell.substring(0, 4)
                  
                  const seller = a + "..." + b
                   
                                 const buy = event.buyer;
                 const b2 = buy.slice(-4)
                  const a2 = buy.substring(0, 4)
                  
                  const buyer = a2 + "..." + b2
                  
                            let embed = new Discord.MessageEmbed()
                   .setTitle(`${metadata.name} → SOLD`)
.addField('Price', `**${event.price.toFixed(2)} SOL**`)
.setColor('#00F393')
.setImage(`${metadata.image}`)
.addField('Seller', `**[${seller}](https://explorer.solana.com/address/${event.seller})**`)
                                     .addField('Buyer', `**[${buyer}](https://explorer.solana.com/address/${event.buyer})**`)
                                                        .addField('Mint Token', `**[${event.tokenMint}](https://magiceden.io/item-details/${event.tokenMint})**`)

.setTimestamp()
.setFooter("Developed by 0xDeViL#3230")
   channels_array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })                    }
                
                 if(event.type === "bid"){
                   
                                 const buy = event.buyer;
                 const b2 = buy.slice(-4)
                  const a2 = buy.substring(0, 4)
                  
                  const buyer = a2 + "..." + b2
                  
                            let embed = new Discord.MessageEmbed()
                   .setTitle(`**${metadata.name} → BID**`)
.addField('Price', `**${event.price.toFixed(2)} SOL**`)
.setColor('#00F393')
.setImage(`${metadata.image}`)
                                     .addField('Buyer', `**[${buyer}](https://explorer.solana.com/address/${event.buyer})**`)
                                                        .addField('Mint Token', `**[${event.tokenMint}](https://magiceden.io/item-details/${event.tokenMint})**`)

.setTimestamp()
.setFooter("Developed by 0xDeViL#3230")
   channels_array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })                    }
              
                                        }, 4000);  
                              
                              
            })

        });

    });

}
 


synchronizeWalletTracker();
    setInterval(() => synchronizeWalletTracker(), 5000);

}