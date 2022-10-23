
module.exports = client => {



const fetch = require('node-fetch');
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require("fs")
const db = require('quick.db');
const Discord = require("discord.js");

const solanaWeb3 = require('@solana/web3.js');
const {Connection, programs } = require("@metaplex/js");
const url = solanaWeb3.clusterApiUrl('mainnet-beta');
const solanaConnection = new solanaWeb3.Connection(url, 'confirmed');
const metaplexConnection = new Connection('mainnet-beta');
const { metadata: { Metadata } } = programs;


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  
const getMintTracker = async (wallet) => {
    try{
    const response = await axios.get(`https://public-api.solscan.io/account/transactions?account=${wallet}&limit=2`, {
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

const getHistoryWalletTracker = (wallet) => {
    return new Promise((resolve) => {
        fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=10`).then((res) => {
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


const findMintPrice = async (transactionData) => {
      try{
    const preBalance = transactionData.meta.preBalances
    const postBalance = transactionData.meta.postBalances
    let priceList = []

    for(i = 0; i < preBalance.length; i++){
        let price = (preBalance[i]-postBalance[i])/1000000000
        if ( price < 0 ){
            price = price * -1
            priceList.push(price)
        }
        else {
            priceList.push(price)
        } 
    }
    priceList = priceList.sort(function(a, b){return b - a})
    price = priceList[1]
    if (price < 0.006){
        price = 0
    }
    return (price)
         }catch(error){
        return console.log('Error Finding Mint Price')
         }
}

const getAllAddressesInvolved = async (transactionData) => {
      try{
    const accountKeysEncoded = transactionData.transaction.message.accountKeys
    let accountKeysDecoded = [];
    for (i = 0; i < accountKeysEncoded.length; i++){
      accountKeysDecoded.push([accountKeysEncoded[i].toBase58(), (transactionData.meta.postBalances[i] - transactionData.meta.preBalances[i])/1000000000])
    }
    accountKeysDecoded.sort(([a, b], [c, d]) => a - c || d - b)
    return(accountKeysDecoded)
         }catch(error){
        return console.log('Error Finding Involved Address')
         
}
}


const gettxHash = async (transaction) => {
        try{
    const response = await axios.get(`https://public-api.solscan.io/transaction/${transaction}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    });
    return response.data;
           }catch(error){
        return console.log('Error Finding txHash')
         
}
}

const getMetadata = async (tokenPubKey) => {
    try {
        const addr = await Metadata.getPDA(tokenPubKey)
        const resp = await Metadata.load(metaplexConnection, addr);
        const { data } = await axios.get(resp.data.data.uri);

        return data;
    } catch (error) {
        console.log("error fetching metadata: ")
    }
}

/////////////////////////////////////////////////////////////////////////////////


const walletTracker = (user, wallet) => {
  
 

      const latestSale = db.get(`last_activity_solanart_${wallet}`)
                   const latestMint = db.get(`last_mint_${wallet}`)

        getHistoryWalletTracker(wallet).then((events) => {
        
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
                db.set(`last_activity_solanart_${wallet}`, newevents[0].signature);
            }

            newevents.reverse().forEach(async (event) => {
              
              let wallets = db.get(`channels_wallet_tracker`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.channel}`);
            });
 }
              
                              setTimeout(async () => {
                                        

              
              
  const meta = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${event.tokenMint}`);
  const metadata = await meta.json();

                              
                   if(event.type === "list"){
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Listed ${metadata.name}`)
                   .addField("Account Changes", `\`[-] ${metadata.name}\``)
                                          .addField("Price", `**${event.price} S◎L**`)
                     .addField("Token", `**[${event.tokenMint}](https://explorer.solana.com/address/${event.tokenMint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    .setColor('#FF0000')
                     .setThumbnail(metadata.image)
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                    }
                
                if(event.type === "delist"){
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Delisted ${metadata.name}`)
                      .addField("Account Changes", `\`[+] ${metadata.name}\``)
                     .addField("Token", `**[${event.tokenMint}](https://explorer.solana.com/address/${event.tokenMint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    .setColor('#00FF00')
                     .setThumbnail(metadata.image)
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                    }
                
               
                
                 if(event.type === "buyNow"){
                                      if(event.buyer === wallet){
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Bought ${metadata.name}`)
                      .addField("Account Changes", `\`[-] ${event.price} S◎L \n[+] ${metadata.name}\``)
                     .addField("Price", `**${event.price} S◎L**`)
                     .addField("Token", `**[${event.tokenMint}](https://explorer.solana.com/address/${event.tokenMint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    .setColor('#00FF00')
                    .setThumbnail(metadata.image)
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                                      }
                    }
                
                 if(event.type === "buyNow"){
                   if(event.seller === wallet){
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Sold ${metadata.name}`)
                    .addField("Account Changes", `\`[+] ${event.price} S◎L \n[-] ${metadata.name}\``)
                     .addField("Price", `**${event.price} S◎L**`)
                     .addField("Token", `**[${event.tokenMint}](https://explorer.solana.com/address/${event.tokenMint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    .setColor('#FF0000')
                     .setThumbnail(metadata.image)
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                   }
                    }
              
                                        }, 4000);  
                              
                                          
            })

        });
      
           
             
         getMintTracker(wallet).then((events) => {
                        try {
              if (!events.length) return;
            
            let newMint = [];
            const indexOfLastListingInNewArray = events.findIndex((e) => e.txHash === latestMint);

            // if the last listing can not be found
            // (for example if the latest listing was deleted)
            if (indexOfLastListingInNewArray === -1) {
                newMint.push(events[0]);
            } else {
                newMint = events.slice(0, indexOfLastListingInNewArray);
            }

            if (newMint[0] || !latestMint) {
                db.set(`last_mint_${wallet}`, newMint[0].txHash);
            }
          
              
            newMint.reverse().forEach(async (event) => {
              
              let wallets = db.get(`channels_wallet_tracker`);
      
            let array = [];

 if (wallets && wallets.length) {
            wallets.forEach((x) => {
                array.push(`${x.channel}`);
            });
 }
              
                                            setTimeout(async () => {

                        const txn = await solanaConnection.getTransaction(event.txHash);

                const logMessage = txn.meta.logMessages

                if (logMessage.length > 10){
if (logMessage.includes('Program log: Instruction: InitializeMint')){
              
                try {
                  

 const metadata = await getMetadata(txn.meta.postTokenBalances[0].mint);
                    if (!metadata) {
                       return console.log("couldn't get metadata");
                    }
                  
                  const transactionMeta =txn.meta
        const addressesInvolved = await getAllAddressesInvolved(txn)
        
                  
 let price = (addressesInvolved[addressesInvolved.length - 1][1] * -1) - (transactionMeta.fee/1000000000)
        price = price - 0.00203928
        price = Math.round((price * 10000))/10000
                  
           
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Minted ${metadata.name}`)
                     .addField("Account Changes", `\`[-] ${price} S◎L \n[+] ${metadata.name}\``)
                     .addField("Price", `**${price} S◎L**`)
                     .addField("Token", `**[${txn.meta.postTokenBalances[0].mint}](https://explorer.solana.com/address/${txn.meta.postTokenBalances[0].mint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    
                     .setThumbnail(metadata.image)
                    .setColor('#3366BB')
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                  
                } catch(e) {
return;
                }
              
                try {
                  
              
 const metadata = await getMetadata(txn.meta.postTokenBalances[1].mint);
                    if (!metadata) {
                       return console.log("couldn't get metadata");
                    }
                  
                  const transactionMeta =txn.meta
        const addressesInvolved = await getAllAddressesInvolved(txn)
                  
 let price = (addressesInvolved[addressesInvolved.length - 1][1] * -1) - (transactionMeta.fee/1000000000)
        price = price - 0.00203928
        price = Math.round((price * 10000))/10000
                  
                              
                     let embed = new Discord.MessageEmbed()
                    .setTitle(`${user} Minted ${metadata.name}`)
                     .addField("Account Changes", `\`[-] ${price} S◎L \n[+] ${metadata.name}\``)
                     .addField("Price", `**${price} S◎L**`)
                     .addField("Token", `**[${txn.meta.postTokenBalances[0].mint}](https://explorer.solana.com/address/${txn.meta.postTokenBalances[0].mint})** ⧉`)
                     .addField("Account", `**[${wallet}](https://explorer.solana.com/address/${wallet})** ⧉`)
                    
                     .setThumbnail(metadata.image)
                    .setColor('#3366BB')
                    .setTimestamp()
                    .setFooter("Developed by 0xDeViL#3230")
 array.forEach(channel => {
  client.channels.cache.get(channel).send(embed).catch(console.error)
                                                                   })
                  
                } catch(e) {
return;
                }
}}
              
                                                    }, 10000);  
                    
            
     
            })
   } catch(e) {
return console.log("Error Seniding Mint Webhook");
                }
        });


}
 
const userList = [["ChartFuMonkey", "FPAbREWjYPUhdH5AH8X62WoAsYqUEQASMmcVFwrHb7vW"], ["Cozy","EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E"], ["Cozy","EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E"],["Degen Swings","2PS94D76WNetGuEP38AxX391WPwJR3Zn9DLinpaGmVDD"],
                 ["Fxnction","6SFShytsPZ61KuauRbBppAcs6WwuNXmEHpFxBUp68EKP"],["Fxnction","8oSadmLQ6zRu22uZ9wQuByVFNkU4b7qcrWTbfSjgjdpb"],["General S◎L","6Bryq6EeYnVv2Un5vK5vLohvxrhSK4tkMdQ6kU42vHnU"],["General S◎L","DYCa4pMeysJJcwowdDNvxszRyYKCHgE7qLhBX24qEwQG"],["General S◎L","HqyKJVAKq16CxuK7vYuxiVWo1t2SCKy65avtRBf6XDe3"],
                  ["HGE","HGEj9nJHdAWJKMHGGHRnhvb3i1XakELSRTn5B4otmAhU"],["Jpeggler","FJbXMr7UGi9P1V1qZvFQ6fyHHS41idJPPyn98afdCJhD"],["SolPlayBoy","E2cEgaHzd1VpzWkdtVt6Qh3D5dZsbv4n1BuWT1KX7rJj"],["Skellymode","BP9a7nk1GJFAeLDJL1BxnXDRxzJviHT66w6Qcznz3t1X"],["Solana Goddess","fr7YFkGeJNGMxVJAhQgp9gZivKSNPcQU4roBK4boKGB"],
                  ["Sol Hub","HhuJCViqUewRNXrhwNuXCC7gqp2o1cUhx9a3nqEGkkqt"],["Sol Hub","DQ977NcueXqkDwTKjP5nsgmSgmsqstRo2XxGK2aHHKPr"],["Sol Sniper","G7No8SCSoBeccFk6ZLEPmoPcFGbe6hbJisinLTk8633o"],["sp00n","FKGU5DtaXjawG9BNpmiBCC1d5ComsnJbnHn2yZTj7tFc"],["sp00n","5PTTb8TBgRFPPg4T2TFnf2og6trXAygWYE1RPFiZPZ1h"]]

async function run(){
    for (x = 0; x < userList.length; x++){
      walletTracker(userList[x][0], userList[x][1])
                await sleep(60000);
    }
}

run();

}