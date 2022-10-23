
module.exports = client => {


const Discord = require("discord.js")
const exponent = 9;

const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db');
const ee = require("../botconfig/embed.json");


const getMintTracker = async (collection) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`).then((res) => {
            res.json().then((data) => {
                resolve(data);
            }
                            )
        }).catch(error => console.log(error));
    })

                       
          
}
///////////////// FUNCTIONS ///////////////////////////



/////////////////////////////////////////////////////////////////////////////////


const synchronizeWalletTracker = () => {
  
    let wallets = db.get(`allcollections_below`);
     

            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.name}`);
            });
 }
  
  
   array.forEach((collection) => {      
         getMintTracker(collection).then((events) => {
                                        try {
                                            setTimeout(async () => {
                      const pricelist = db.get(`${collection}_prices_below`)
             let pricearray = [];

 if (pricelist && pricelist.length) {
            pricelist.forEach((x) => {
                pricearray.push(`${x.price}`);
            });
 }
            
              pricearray.forEach((price) => {
              

                
           const fp = (events.floorPrice)/1000000000
                         const userw =  db.get(`${collection}_${price}_user_below`)
const user = client.users.cache.get(userw)
           if(fp < price) {
                                                         setTimeout(async () => {
                         const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}`)).data;
            let embed = new Discord.MessageEmbed()
                    .setTitle(`New Notification`)
                             .setURL(`https://magiceden.io/marketplace/${details.symbol}`)
            .setDescription(`**${details.name} Floor Price has reached below ${price} SOL**`)
            .addField(`Target`, `**${price} SOL**`)
                 .setThumbnail(details.image)
            .addField(`Floor Price`, `**${fp} SOL**`)
                    .setColor('GREEN')
                    .setTimestamp()
                .setFooter(ee.footertext)
            
             user.send(embed).catch(() => console.log(`Can't send DM to ${user}!`));
                                                                              }, 1000)
                    //ch.send(embed).catch(() => console.log(`Couldn't send embed`));
             
             const pog = db.get(`allcollections_below`)
             
                 if (pog) {
                           const code = `${collection}${price}`

            let data = pog.find((x) => x.code.toLowerCase() === code.toLowerCase());
         

            if (!data) return

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`allcollections_below`, filter);
                 }
             
              const user_collections = db.get(`user_collections_${userw}`)
             
                 if (user_collections) {
                           const code = `${collection}${price}`

            let data = user_collections.find((x) => x.code.toLowerCase() === code.toLowerCase());
         

            if (!data) return

            let yes = user_collections.indexOf(data);
            delete user_collections[yes];

            var filter = user_collections.filter((x) => {
                return x != null && x != '';
            });
            db.set(`user_collections_${userw}`, filter);
                 }
             
             
                                       db.delete(`${collection}_${price}_user_below`)
             db.delete(`${collection}_prices_below`, price)
                           db.subtract(`usercollections_${userw}_below`, 1)

             
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
    setInterval(() => synchronizeWalletTracker(), 20000);


}


