const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const bip39 = require("bip39");
const bs58 = require('bs58')
const db = require("quick.db")
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "register",
    category: "Wallet Manager",

    run: async (client, message, args, user, text, prefix) => {
      
      try {
      
       const priv = db.get(`wallet_pub_${message.author.id}`)
        
        if(priv) {
            const embed = new Discord.MessageEmbed()
.setColor(ee.wrongcolor)
            .setTitle(`${ee.emojired} Error`)
      .setDescription("**You already have a wallet.**")
            .addField(`Wallet Address`, priv)
                            .setFooter(ee.footertext)
      .setTimestamp()
       
      return message.channel.send(embed);
        }
      
      const createAccountFromMnemonic = async (mnemonic) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('⚠️ Invalid seed phrase ⚠️');
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
  const acc = new web3.Account(keyPair.secretKey);
  return {
    privateKey: acc.secretKey,
    publicKey: acc.publicKey.toString(),
  };
};

   const createAccount = async () => {
  const mnemonic = bip39.generateMnemonic();
  const { publicKey, privateKey } = await createAccountFromMnemonic(mnemonic);

  return {
    privateKey,
    publicKey,
    mnemonic,
  };
};

      
    const account = await createAccount();
    const { publicKey, privateKey, mnemonic } = account;
    
      const privKey = bs58.encode(privateKey)
      
       const uembed = new Discord.MessageEmbed()
        .setTitle(`Wallet Regsitered`)
        .addField(`Wallet Address`, publicKey)
              .addField(`Private Key`, `||${privKey}||`)
                     .addField(`Note`, `**Please don't share private key with anyone. Only deposit the required amount of SOL. We are not responsible for the loss of your SOL!**`)
        .setTimestamp()
        .setColor(ee.color)
                       .setFooter(ee.footertext)
      
        let ermbed = new Discord.MessageEmbed()
    .setTitle(`Error`)
         .setDescription(`**Turn on your DMs before using this command.**`)
     .setColor(ee.wrongcolor)
    .setTimestamp()
                         .setFooter(ee.footertext)

       try {
 await user.send(uembed)
         } catch (e) {
           return message.channel.send(ermbed)
         }   
      
       const sembed = new Discord.MessageEmbed()
        .setTitle(`Wallet Regsitered`)
        .addField(`Wallet Address`, publicKey)
              .addField(`Note`, `**Private key has been sent to your DM's, please don't share it with anyone. Only deposit the required amount of SOL. We are not responsible for the loss of your SOL!**`)
        .setTimestamp()
        .setColor(ee.color)
                       .setFooter(ee.footertext)
        message.channel.send(sembed)
      
      db.set(`wallet_pub_${message.author.id}`, publicKey)
      db.set(`wallet_priv_${message.author.id}`, privKey)

          } catch (err) {
     const embed2 = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
     .setDescription(`**- You don't have enough SOL \n- Something went wrong with the transaction.**`)
        .setTimestamp()
        .setColor("RED")
        message.channel.send(embed2)
    }
      
    }
}