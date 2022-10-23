module.exports = client => {

const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db')
const ee = require("../botconfig/embed.json");
const Discord = require("discord.js")


const getHistoryWalletTracker = (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${collection}/activities?offset=0&limit=100`).then((res) => {
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



const synchronizeWalletTracker = () => {
  try {
   let wallets = db.get(`wallets`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.wallet}`);
            });
 }
  
  
   array.forEach((collection) => {

      const latestSale = db.get(`last_activity_solanart_${collection}`)
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
                db.set(`last_activity_solanart_${collection}`, newevents[0].signature);
            }

            newevents.reverse().forEach(async (event) => {
                                                      try {
                              setTimeout(async () => {
                             

              const wallet = collection
              const userw = db.get(`user_${wallet}`)
  const meta = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${event.tokenMint}`);
  const metadata = await meta.json();
                             
                                
                
                if(event.type === "buyNow"){
                   if(event.seller === wallet){
                                          client.users.fetch(userw, false).then((user) => {
                                 let embed = new Discord.MessageEmbed()
                      .setTitle(`<:ME_Logo_Gradient:981235986732302416> New Notification`)
            .setDescription(`**You just *SOLD* ${metadata.name} on [Magic Eden](https://solscan.io/tx/${event.signature}) for ${event.price} SOL**`)
                 
                    .setColor('#FF0000')
                     .setThumbnail(metadata.image)
                    .setTimestamp()
                .setFooter(ee.footertext)
                    user.send(embed).catch(() => console.log(`Can't send DM to ${user.tag}!`));
                                       
                                            })
                   }
                    }
                
               
                
              
                                        }, 5000);  
                                } catch(e) {
return console.log("Error With Notifications: ", e);
                }
                                          
            })

        });

    });
     } catch (err) {
    console.log(err)
    }
};
 

  
 synchronizeWalletTracker();
    setInterval(() => synchronizeWalletTracker(), 15000);
 
  
}