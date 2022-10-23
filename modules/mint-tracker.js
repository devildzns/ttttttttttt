module.exports = client => {


const cloudscraper = require('cloudscraper');
const db = require("quick.db");
const Discord = require("discord.js");


var request = require('request');


        
// Create the fetchUrl function

const fetchUrl = async (url) => {
    const delay = m => new Promise((resolve, reject) => { setTimeout(_ => resolve(), m) });
    try {
        const response = await cloudscraper.get(url).catch(async (err) => {
            if (err.statusCode) return;
            await delay(1000);
            return fetchUrl(url);
        });
        if (!response) return;
        return JSON.parse(response);
    } catch (e) {
        await delay(1000);
        return fetchUrl(url);
    }
};


const test = async() => {
  
   let wallets = db.get(`channels_live_mints`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.channel}`);
            });
 
    
const data = await fetchUrl(`https://api.deunite.io/api/v1/token-mints/live/minted?unit=SOL&limit=1&page=1`).then((events) => {

          
            (events).forEach(async (event) => {
              
        const latestSale = db.get(`last_mint_collection`);
              

                                        if(event.count != latestSale) {
                                
                                 let embed = new Discord.MessageEmbed()
                    .setTitle(`${event.name}`)
                    .setColor('#00FF00')
                     .setDescription(`**${event.name}** was minted **${event.count}** times in last **5 minutes**.`)
                     .addField('Total Supply', `**${event.totalSupply}**`)
                                          .addField('Total Minted', `**${event.totalMinted}**`)
                                                               .addField("Price", `**${event.price} SOL**`)
                    
                                                               .addField('CMID', `\`${event.candymachineId}\``)
                    .setThumbnail(event.image)
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
                       if(event.marketplace == "launchmynft"){
                                           embed.addField('Mint Link', `**[Click Here!](${event.originUrl})**`)

}
                     if(event.discordUrl){
                                           embed.addField('Discord', `**${event.discordUrl}**`)

}
                if(event.twitterUrl){
                                           embed.addField('Twitter', `**${event.twitterUrl}**`)


}
                              
array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
})   

                    db.set(`last_mint_collection`, event.count)
              
                                        }
            })
        });
;
; 
}



// For non async modules
                    


}

test()
    setInterval(() => test(), 60000);
console.log("ready")
  

}