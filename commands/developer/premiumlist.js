const Discord = require("discord.js");
const db = require('quick.db')
const axios = require("axios");
const exponent = 9
module.exports = {
	name: 'premium-list',
      category: "Developer",
    run: async (client, message, args, text, prefix) => {
      
       let embed3 = new Discord.MessageEmbed()
      .setTitle("Error")
        .setDescription(`**You can't use this command!**`)
      .setColor("#FF0000")
      
   let owner = ['649669819939028992']

        if (!owner.includes(message.author.id)) return message.channel.send(embed3);      
		let ops = [
			'general_commands',
			'floor_alerts',
      'wallet_notifications'
		];
		let disabled = ":x: Disabled"
		function check(msg, arr) {
			return arr.some(op => op.toLowerCase() === msg.toLowerCase());
		}
		let bruh = new Discord.MessageEmbed()
          .setTitle("Please specify the option.")
		.setDescription(`\`> premium-list ${ops.join("\n\n> premium-list ")}\``)
.setColor("#FF0000")
    
     let embed = new Discord.MessageEmbed()
        .setDescription("**The only options are: `general_commands`, `floor_alerts` & `wallet_notifications`**")
      .setColor("#FF0000")

		if (!args[0]) return message.channel.send({ embed: bruh });
		if (check(args[0], ops) === false)
      
			return message.channel.send(
embed			);
			switch (args[0].toLowerCase()) {
			  case "general_commands":
          {
 let embed = new Discord.MessageEmbed()
    embed.setTitle(`Guilds list`)
  
    embed.setColor("GREEN")
        let words = db.get(`premium_general_commands`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**Guild ID: ${x.premiumcodes} (*${x.name}*)**`);
            });
          

            embed.setDescription(`・${array.join('\n\n・')}`);
          
        } else {
          return message.channel.send("**There are No Collections.**")
        }
        
        return message.channel.send({ embed: embed });
        
          }
          
			    break;
          
          			  case "floor_alerts":
         { 
 let embed = new Discord.MessageEmbed()
    embed.setTitle(`Guilds list`)
  
    embed.setColor("GREEN")
        let words = db.get(`premium_floor_alerts`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**Guild ID: ${x.premiumcodes} (*${x.name}*)**`);
            });
          

            embed.setDescription(`・${array.join('\n\n・')}`);
          
        } else {
          return message.channel.send("**There are No Collections.**")
        }
        
        return message.channel.send({ embed: embed });
         }
          			    break;
          
                    			  case "wallet_notifications":
          
{
             let embed = new Discord.MessageEmbed()
    embed.setTitle(`Guilds list`)
  
    embed.setColor("GREEN")
        let words = db.get(`premium_wallet_notifications`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**Guild ID: ${x.premiumcodes} (*${x.name}*)**`);
            });
          

            embed.setDescription(`・${array.join('\n\n・')}`);
          
        } else {
          return message.channel.send("**There are No Collections.**")
        }
        
        return message.channel.send({ embed: embed });
  
}
                    			    break;


      }
    }
}