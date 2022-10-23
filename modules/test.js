module.exports = client => {

const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db')

const Discord = require("discord.js")


const getHistoryWalletTracker = (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${collection}/activities?offset=0&limit=1`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
};
  
  const getMintTracker = async (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }
                            )
        }).catch(error => console.log(error));
    })

                       
        

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
                    .setFooter("Null Notifications")
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
   })
     
     ///////////
    let collections = db.get(`collections`);
      const channel = db.get(`watchlist`)
     const ch = client.channels.cache.get(channel) 

            let array2 = [];

 if (collections && collections.length) {
            collections.forEach((x) => {
                array.push(`${x.collection}`);
            });
 }
  
  
   array2.forEach((collection) => {      
         getMintTracker(collection).then((events) => {
                                        try {
                                            setTimeout(async () => {
                      const pricelist = db.get(`${collection}_prices`)
             let pricearray = [];

 if (pricelist && pricelist.length) {
            pricelist.forEach((x) => {
                pricearray.push(`${x.price}`);
            });
 }
            const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}`)).data;
            
              pricearray.forEach((price) => {
              

                
           const fp = (events.floorPrice)/1000000000
                         const userw =  db.get(`${collection}_${price}_user`)
const user = client.users.cache.get(userw)
           if(fp > price) {
            let embed = new Discord.MessageEmbed()
                    .setTitle(`New Notification`)
            .setDescription(`**${details.name} Floor Price has reached ${price} SOL**`)
            .addField(`Target`, `**${price} SOL**`)
                 .setThumbnail(details.image)
            .addField(`Floor Price`, `**${fp} SOL**`)
                    .setColor('GREEN')
                    .setTimestamp()
                    .setFooter("Null Watchlist")
             user.send(embed).catch(() => console.log(`Can't send DM to ${user}!`));
                     
                    //ch.send(embed).catch(() => console.log(`Couldn't send embed`));
             
             const pog = db.get(`allcollections`)
             
                 if (pog) {
                           const code = `${collection}${price}`

            let data = pog.find((x) => x.code.toLowerCase() === code.toLowerCase());
         

            if (!data) return

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`allcollections`, filter);
                 }
             
                                       db.delete(`${collection}_${price}_user`)
             db.delete(`${collection}_prices`, price)
                           db.subtract(`usercollections_${userw}`, 1)

             
                    }     
              })
                                              
                                                                                                  }, 5000);  

                                          
            } catch(e) {
return console.log("Error With Targets: ", e);
                }
           }
                                         
                                         )}
                 
    
    
)}

 

 synchronizeWalletTracker();
    setInterval(() => synchronizeWalletTracker(), 15000);
 
  }
}