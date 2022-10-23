module.exports = client => {

const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db');
 const { Webhook, MessageBuilder } = require('discord-webhook-node');
const Discord = require("discord.js");


const exponent = 9;

const solanaWeb3 = require('@solana/web3.js');
const {Connection, programs } = require("@metaplex/js");
const url = solanaWeb3.clusterApiUrl('mainnet-beta');
const solanaConnection = new solanaWeb3.Connection(url, 'confirmed');
const metaplexConnection = new Connection('mainnet-beta');
const { metadata: { Metadata } } = programs;

const  getListingMagicEden = (mint) => {
    return new Promise((resolve) => {
        fetch(`https://api.coralcube.cc/845d331b-3c6b-42fe-b5ee-58462a5b3f55/getActivity?offset=0&page_size=5&activity_type=listings`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
}

const wallet = ""

const synchronizeMagicEden = () => {
      [
        wallet
    ].forEach((collection) => {
        
         let wallets = db.get(`channels_paperhand`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.channel}`);
            });
 }
     

        getListingMagicEden(collection).then((listings) => {
       const latestSale = db.get(`last_activity`);
        const latestListing = db.get(`last_activity`);
            if (!listings.length) return;
            
            let newListings = [];
            const indexOfLastListingInNewArray = listings.findIndex((e) => e.transaction_sig === latestListing);

            // if the last listing can not be found
            // (for example if the latest listing was deleted)
            if (indexOfLastListingInNewArray === -1) {
                newListings.push(listings[0]);
            } else {
                newListings = listings.slice(0, indexOfLastListingInNewArray);
            }

            if (newListings[0] || !latestListing) {
                db.set(`last_activity`, newListings[0].transaction_sig);
            }

            newListings.reverse().forEach(async(event) => {
                            
    const price = ((event.price)/1000000000).toFixed(4);
              
              const txn = await solanaConnection.getTransaction(event.transaction_sig);

                const logMessage = txn.meta.logMessages
                if (logMessage.length > 10){
if (logMessage.includes('Program log: Instruction: ExecuteSale')) return;
                }
                  
                                              
const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${event.mint}`)).data;
                                
              const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${details.collection}/stats`)).data;
              
    const fp = ((resp.floorPrice)/1000000000).toFixed(4);
                                        if (fp === "NaN") return;    
              if (fp < 1) return;
              
                                              const difference = (price - fp).toFixed(4)

              const differencep = ((price - fp)/(fp)*100).toFixed(4);
                    if (differencep > -10) return;
              
                                if (differencep < 0) {
                                  
                
                                 let embed = new Discord.MessageEmbed()
                    .setTitle(`New Paper Listing`)
                     .addField(`Price`, `**${price} SOL**`)
                                          .addField(`Name`, `**${details.name}**`)
                     //`${}`
                                          .addField(`Collection Floor`, `**${fp} SOL**`)
                     .addField(`Floor Difference`, `**${difference} SOL (${differencep}%)**`)
.addField(`Link`, `**[Coral Cube](https://coralcube.io/detail/${event.mint}) - [Magic Eden](https://magiceden.io/item-details/${event.mint})**`)
                    .setColor('#00FF00')
                    .setThumbnail(details.image)
                    .setTimestamp()
                    .setFooter("Data by CoralCube | Developed by 0xDeViL#3230")
                     
array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
})                     
                                }
                              
            })
        })
        })
      
}

synchronizeMagicEden();
    setInterval(() => synchronizeMagicEden(), 10000);
}