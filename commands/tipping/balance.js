const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const bip39 = require("bip39");
const bs58 = require('bs58')
const db = require("quick.db")
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "balance",
    category: "Wallet Manager",

    run: async (client, message, args, user, text, prefix) => {
      
            try {
      
      const cluster = db.get(`cluster_${message.guild.id}`)
      
              const priv = db.get(`wallet_pub_${message.author.id}`)
        
        if(!priv) {
            const embed = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
     .setTitle(`${ee.emojired} Error`)
      .setDescription("**Please register yourself first.**")
                .setFooter(ee.footertext)
      .setTimestamp()
       
      return message.channel.send(embed);
        }
      const getBalance = (publicKey) => {

        const connection = new web3.Connection(web3.clusterApiUrl(cluster));  
  return connection.getBalance(new web3.PublicKey(publicKey));
      }
      
      const balanceInLamports = await getBalance(priv);
      const balanceInSol = (balanceInLamports / web3.LAMPORTS_PER_SOL).toFixed(2)
       const embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle("Wallet Information")
       .addField(`Address`, `**${priv}**`)
       .addField(`Balance`, `**${balanceInSol} SOL**`)
                       .setFooter(ee.footertext)
      .setTimestamp()
            message.channel.send(embed)
      
                } catch (err) {
     const embed2 = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
     .setDescription(`**- You don't have enough SOL \n- Something went wrong with the transaction.**`)
        .setTimestamp()
        .setColor(ee.wrongcolor)
        message.channel.send(embed2)
    }
              
        }
}