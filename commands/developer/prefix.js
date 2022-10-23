const Discord = require("discord.js");
const db = require('quick.db')
const axios = require("axios");
const config = require("../../botconfig/config.json")

const exponent = 9
module.exports = {
	name: 'prefix',
      category: "Developer",
    run: async (client, message, args, text) => {
      
       let embed3 = new Discord.MessageEmbed()
      .setTitle("Error")
        .setDescription(`**You can't use this command!**`)
      .setColor("#FF0000")
      
        let owner = ['649669819939028992']

        if (!owner.includes(message.author.id)) return message.channel.send(embed3);
      
            const gprefix = db.get(`prefix_${message.guild.id}`)
      
      const cprefix = args[0]
      
      if (!cprefix) {
        cprefix = config.prefix;
      }
      
        let embed = new Discord.MessageEmbed()
      .setTitle("Syntax Error")
        .setDescription(`**${gprefix}prefix [New Prefix]**`)
        .addField(`Current Prefix:`, `\`${gprefix}\``)
      .setColor("#FF0000")
        
      if(!cprefix) return message.channel.send(embed)
      
            db.set(`prefix_${message.guild.id}`, cprefix)
                   
              let embed2 = new Discord.MessageEmbed()
      .setTitle("Successful")
        .setDescription(`**Successfully changed the prefix to \`${cprefix}\`**`)
.setColor("GREEN")      
      message.channel.send(embed2)
           

    }
}