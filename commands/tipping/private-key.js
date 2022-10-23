const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const bip39 = require("bip39");
const bs58 = require('bs58')
const db = require("quick.db")
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "private-key",
    category: "Wallet Manager",

    run: async (client, message, args, user, text, prefix) => {
      
       const priv = db.get(`wallet_priv_${message.author.id}`)
       const pub = db.get(`wallet_pub_${message.author.id}`)
        
        if(!priv) {
            const embed = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTitle(`${ee.emojired} Error`)
      .setDescription("**Please register yourself before using this command.**")
                            .setFooter("Developed by 0xDeViL#3230")
      .setTimestamp()
       
      return message.channel.send(embed);
        }
      
       const uembed = new Discord.MessageEmbed()
        .setTitle(`Wallet Information`)
        .addField(`Wallet Address`, pub)
              .addField(`Private Key`, `||${priv}||`)
                     .addField(`Note`, `**Please don't share private key with anyone. Only deposit the required amount of SOL. We are not responsible for the loss of your SOL!**`)
        .setTimestamp()
        .setColor("GREEN")
                       .setFooter("Developed by 0xDeViL#3230")
      
        let ermbed = new Discord.MessageEmbed()
    .setTitle(`Error`)
         .setDescription(`**Turn on your DMs before using this command.**`)
     .setColor(`RED`)
    .setTimestamp()
                         .setFooter("Developed by 0xDeViL#3230")

       try {
 await user.send(uembed)
         } catch (e) {
           return message.channel.send(ermbed)
         }   
      
        const sembed = new Discord.MessageEmbed()
        .setTitle(`Wallet Information`)
        .addField(`Wallet Address`, pub)
              .addField(`Note`, `**Private key has been sent to your DM's, please don't share it with anyone. Only deposit the required amount of SOL. We are not responsible for the loss of your SOL!**`)
        .setTimestamp()
        .setColor("GREEN")
                       .setFooter("Developed by 0xDeViL#3230")
        message.channel.send(sembed)
    }
}