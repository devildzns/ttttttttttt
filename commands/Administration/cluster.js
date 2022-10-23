const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const bip39 = require("bip39");
const bs58 = require('bs58')
const db = require("quick.db")
const Discord = require("discord.js");

module.exports = {
    name: "cluster",
    category: "Wallet Manager",

    run: async (client, message, args, user, text, prefix) => {
      
             let SerEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
          .setDescription(`**Only server owner can run this command.**`)
                             .setFooter("Developed by 0xDeViL#3230")
        .setTimestamp();
      
      if (message.guild.ownerID !== message.author.id) return message.channel.send(SerEmbed)
      
      const cluster = args[0]
              const clusters = ['mainnet-beta', 'testnet', 'devnet'] // Coin Options
        
                const errrembed = new Discord.MessageEmbed()
                  .setTitle(`Error`)
            .setTimestamp()
            .setColor('RED')
            .setDescription(`**The only options are \`mainnet-beta, testnet & devnet\`.**`)
        .addField(`Usage`,`**${prefix}cluster [mainnet-beta/testnet/devnet]**`)
                                .setFooter("Developed by 0xDeViL#3230")
        if(!clusters.includes(cluster)) return  message.channel.send(errrembed)
      
      db.set(`cluster_${message.guild.id}`, cluster)
      
         const sembed = new Discord.MessageEmbed()
                  .setTitle(`Success`)
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`**Successfully changed the cluster to \`${cluster}\`.**`)
                         .setFooter("Developed by 0xDeViL#3230")
         message.channel.send(sembed)
    }
}