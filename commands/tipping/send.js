const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const bip39 = require("bip39");
const bs58 = require('bs58')
const db = require("quick.db")
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "send",
    category: "Wallet Manager",

    run: async (client, message, args, user, text, prefix) => {
      
      try {
        
         let user = db.get(`wallet_pub_${message.author.id}`)

                          if(!user) {
            const embed = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
     .setTitle(`${ee.emojired} Error`)
      .setDescription("**Please register yourself before using this command.**")
                            .setFooter(ee.footertext)
      .setTimestamp()
       
      return message.channel.send(embed);
        }
      
         const cluster = db.get(`cluster_${message.guild.id}`)

     if(!cluster) {
            const embed = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
     .setTitle(`${ee.emojired} Error`)
      .setDescription("**Please set the cluster before using this command.**")
                            .setFooter(ee.footertext)
      .setTimestamp()
       
      return message.channel.send(embed);
        }
        
        const connection = new web3.Connection(web3.clusterApiUrl(cluster));  
      
              const amount = Number(args[0])
        const errembed = new Discord.MessageEmbed()
                .setTitle(`${ee.emojired} Error`)
            .setTimestamp()
            .setColor(ee.wrongcolor)
            .setDescription(`**Please provide an amount to send.**`)
        .addField(`Usage`, `${prefix}send [Amount] [Wallet]`)
        if(!amount) return  message.channel.send(errembed) // If No Amount Provided
  
         const eembed = new Discord.MessageEmbed()
                 .setTitle(`${ee.emojired} Error`)
            .setTimestamp()
            .setColor(ee.wrongcolor)
            .setDescription(`**Amount should be a number.**`)
            if(isNaN(amount)) return message.channel.send(eembed) 
              
             let user_pub = db.get(`wallet_pub_${message.author.id}`)
            let user_priv = db.get(`wallet_priv_${message.author.id}`)
            
            
  const privateKey = bs58.decode(user_priv)
      
  const from = web3.Keypair.fromSecretKey(privateKey);
                        
  const toPublicKeyString = args[1]
  
  const b = toPublicKeyString.slice(-6)
                  const a = toPublicKeyString.substring(0, 6)
                  
                  const wallet = a + "..." + b
  
  if(!toPublicKeyString) {
    
     const eembed = new Discord.MessageEmbed()
                 .setTitle(`${ee.emojired} Error`)
            .setTimestamp()
            .setColor(ee.wrongcolor)
            .setDescription(`**Please mention the wallet to send SOL.**`)
           return message.channel.send(eembed) 
  }
             
 const solTransferAmount = amount * web3.LAMPORTS_PER_SOL;
       
    var transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: toPublicKeyString,
          lamports: solTransferAmount,
      })
  );
    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
        {
          commitment:'recent',
          skipPreflight: true

        },
    );
      
         const embed = new Discord.MessageEmbed()
                .setTitle(`Transaction Successful`)
        .setColor("#00F393")
                .setColor(ee.color)
         .addField(`Amount`, `**${amount} SOL**`)
         .addField(`To`, `\`${wallet}\``)
                              .addField(`Signature`, `**[Click Here!](https://explorer.solana.com/tx/${signature})**`)
                                .setFooter(ee.footertext)

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