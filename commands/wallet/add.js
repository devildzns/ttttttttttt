const Discord = require("discord.js");
const db = require("quick.db")
const axios = require("axios");
const ee = require("../../botconfig/embed.json");

module.exports = {
  name: "addwallet",
        aliases: ["aw"],
          category: "Wallet Notifications",
    run: async (client, message, args, text, prefix) => {
      try {
          
            const guild = message.guild.id;
       
 let codecheck = db.get(`premium_wallet_notifications`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);    
         const guildicon = message.guild.iconURL();

    let pog = db.get(`wallets`)
        let userwallets = db.get(`userwallets_${message.author.id}`)

         
    let wallet = args[0]
    if (!wallet) {
      let embed = new Discord.MessageEmbed()
      .setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix}addwallet (wallet)**`)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
      const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=1`)).data;
       if (userwallets >= 1) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle("Error")
            embed.setDescription(`**You have already added a wallet.**`)
      .setColor(ee.wrongcolor)
         .setFooter(ee.footertext)
            return message.channel.send({
              embed: embed
            });
        }
    if (pog && pog.find((find) => find.wallet == wallet)) {
            let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
            embed.setDescription(`**The wallet is already on the database.**`)
                .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {wallet: wallet,}
     db.set(`user_${wallet}`, message.author.id)
             db.set(`wallet_${message.author.id}`, wallet)
        db.push(`wallets`, yes)
              db.add(`userwallets_${message.author.id}`, 1)
        
         const b = wallet.slice(-6)
                  const a = wallet.substring(0, 6)
                  
                  const wallet2 = a + "..." + b
                  
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**Successfully added ${wallet2} to database.**`)
        embed.setColor(ee.color)
        .setFooter(ee.footertext)
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })
          } catch (err) {
     const embed2 = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
     .setDescription(`**\`${err}\`**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
.setFooter(ee.footertext)
     message.channel.send(embed2)
    }
  }
}