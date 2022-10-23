const Discord = require("discord.js");
const db = require('quick.db')
const axios = require("axios");
const exponent = 9
module.exports = {
	name: 'premium-remove',
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
		.setDescription(`\`> premium-remove ${ops.join("\n\n> premium-remove ")}\``)
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

              const collection = message.guild.id
      
       const pog = db.get(`premium_general_commands`)
             
                 if (pog) {
                   
            let data = pog.find((x) => x.premiumcodes.toLowerCase() === collection.toLowerCase());
         

           let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`:x: | **Not Found**`)
                No.setColor("#FF0000")
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`premium_general_commands`, filter);
                                                                                       
                                            
               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted.**`)
      .setColor("#FF0000")
            return message.channel.send({ embed: embed });
                   
                  
      
        
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`:x: | **The Code was not found!**`)
                embed.setColor("#FF0000")
                embed.setTimestamp()

            return message.channel.send({ embed: embed });
        }
        
          }
          
			    break;
          
          			  case "floor_alerts":
         { 

            const collection = message.guild.id
      
       const pog = db.get(`premium_floor_alerts`)
             
                 if (pog) {
                   
            let data = pog.find((x) => x.premiumcodes.toLowerCase() === collection.toLowerCase());
         

           let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`:x: | **Not Found**`)
                No.setColor("#FF0000")
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`premium_floor_alerts`, filter);
                                                                                       
                                            
               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted.**`)
      .setColor("#FF0000")
            return message.channel.send({ embed: embed });
                   
                  
      
        
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`:x: | **The Code was not found!**`)
                embed.setColor("#FF0000")
                embed.setTimestamp()

            return message.channel.send({ embed: embed });
        }
           
         }
          			    break;
          
                    			  case "wallet_notifications":
          
{

   const collection = message.guild.id
      
       const pog = db.get(`premium_wallet_notifications`)
             
                 if (pog) {
                   
            let data = pog.find((x) => x.premiumcodes.toLowerCase() === collection.toLowerCase());
         

           let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`:x: | **Not Found**`)
                No.setColor("#FF0000")
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });
                   
                   
            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`premium_wallet_notifications`, filter);
                                                                                       
                                            
               let embed = new Discord.MessageEmbed()
                .setTitle("Success")
        .setDescription(`**Successfully deleted.**`)
      .setColor("#FF0000")
            return message.channel.send({ embed: embed });
                   
                  
      
        
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`:x: | **The Code was not found!**`)
                embed.setColor("#FF0000")
                embed.setTimestamp()

            return message.channel.send({ embed: embed });
        }
  
}
                    			    break;


      }
    }
}