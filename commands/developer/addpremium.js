const Discord = require("discord.js");
const db = require('quick.db')
const axios = require("axios");

const exponent = 9
module.exports = {
	name: 'premium-add',
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
		.setDescription(`\`> premium-add ${ops.join("\n\n> premium-add ")}\``)
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
                     let code = message.guild.id;
 
  let codecheck = db.get(`premium_general_commands`)
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`Error`)
  .setDescription(`This guild already exists in Database`)
  if(codecheck && codecheck.find(find => find.premiumcodes == code)) return message.channel.send(alreadyexist);
      
  let codedata = {
   premiumcodes: code,
    name: message.guild.name,
    type: "General Commands"
  }
  
  let created = new Discord.MessageEmbed()
  .setTitle(`Succesfully Added`)
  message.channel.send(created)
  db.push(`premium_general_commands`, codedata)
        
          }
          
			    break;
          
          			  case "floor_alerts":
         { 
          let code = message.guild.id;
 
  let codecheck = db.get(`premium_floor_alerts`)
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`Error`)
  .setDescription(`This guild already exists in Database`)
  if(codecheck && codecheck.find(find => find.premiumcodes == code)) return message.channel.send(alreadyexist);
      
  let codedata = {
   premiumcodes: code,
    name: message.guild.name,
    type: "Floor Alerts"
  }
  
  let created = new Discord.MessageEmbed()
  .setTitle(`Succesfully Added`)
  message.channel.send(created)
  db.push(`premium_floor_alerts`, codedata)
         }
          			    break;
          
                    			  case "wallet_notifications":
          
{
    let code = message.guild.id;
 
  let codecheck = db.get(`premium_wallet_notifications`)
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`Error`)
  .setDescription(`This guild already exists in Database`)
  if(codecheck && codecheck.find(find => find.premiumcodes == code)) return message.channel.send(alreadyexist);
      
  let codedata = {
   premiumcodes: code,
    name: message.guild.name,
    type: "Wallet Notifications"
  }
  
  let created = new Discord.MessageEmbed()
  .setTitle(`Succesfully Added`)
  message.channel.send(created)
  db.push(`premium_wallet_notifications`, codedata)
  
}
                    			    break;


      }
    }
}