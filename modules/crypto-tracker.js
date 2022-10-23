
module.exports = client => {


const Discord = require("discord.js")
const exponent = 9;

const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db');


const getMintTracker = async (coin) => {
const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
		const data = await response.json();     
}
///////////////// FUNCTIONS ///////////////////////////



/////////////////////////////////////////////////////////////////////////////////


const synchronizeWalletTracker = () => {
  
    let wallets = db.get(`allcoins`);
      const channel = db.get(`watchlist`)
     const ch = client.channels.cache.get(channel) 

            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.name}`);
            });
 }
  
  console.log(array)
   array.forEach((coin) => {      
         getMintTracker(coin).then((events) => {
                                        try {
                                            setTimeout(async () => {
                      const pricelist = db.get(`${coin}_prices`)
             let pricearray = [];

 if (pricelist && pricelist.length) {
            pricelist.forEach((x) => {
                pricearray.push(`${x.price}`);
            });
 }
            
              pricearray.forEach((price) => {
              

                
           const fp = (events.floorPrice)/1000000000
                         const userw =  db.get(`${coin}_${price}_user`)
const user = client.users.cache.get(userw)
           if(fp > price) {
                                                         setTimeout(async () => {
                         const details =  (await axios.get(`https://api-mainnet.magiceden.dev/v2/coins/${coin}`)).data;
            let embed = new Discord.MessageEmbed()
                    .setTitle(`New Notification`)
                             .setURL(`https://magiceden.io/marketplace/${details.symbol}`)
            .setDescription(`**${details.name} Floor Price has reached above ${price} SOL**`)
            .addField(`Target`, `**${price} SOL**`)
            .setThumbnail(details.image)
            .addField(`Floor Price`, `**${fp} SOL**`)
                    .setColor('GREEN')
                    .setTimestamp()
.setFooter("Developed by 0xDeViL#3230")
            
             user.send(embed).catch(() => console.log(`Can't send DM to ${user}!`));
                                                                              }, 1000)
                    //ch.send(embed).catch(() => console.log(`Couldn't send embed`));
             
             const pog = db.get(`allcoins`)
             
                 if (pog) {
                           const code = `${coin}${price}`

            let data = pog.find((x) => x.code.toLowerCase() === code.toLowerCase());
         

            if (!data) return

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`allcoins`, filter);
                 }
             
                                       db.delete(`${coin}_${price}_user`)
             db.delete(`${coin}_prices`, price)
                           db.subtract(`usercoins_${userw}`, 1)

             
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


