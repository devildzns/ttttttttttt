const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h", "commandinfo", "commands", "command"],
    cooldown: 4,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
 if (args[0]) {
         const command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!command) {
              return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
          }
      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
       if (command.name) embed.addField("**Command name**", `\`${command.name}\``)
          if (command.name) embed.setTitle(`Detailed Information about:\`${command.name}\``)
          if (command.description) embed.addField("**Description**", `\`${command.description}\``)
          if (command.aliases) embed.addField("**Aliases**", `\`${command.aliases.map((a) => `${a}`).join("`, `")}\``)
          if (command.cooldown) embed.addField("**Cooldown**", `\`${command.cooldown} Seconds\``)
          else embed.addField("**Cooldown**", `\`1 Second\``)
          if (command.usage) {
              embed.addField("**Usage**", `\`${config.prefix}${command.usage}\``)
              embed.setFooter("Syntax: <> = required, [] = optional")
          }
          if (command.useage) {
              embed.addField("**Useage**", `\`${config.prefix}${command.useage}\``)
              embed.setFooter("Syntax: <> = required, [] = optional")
          }
        embed.setColor("#00F393")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setTitle("Help")
        .setColor("#00F393")
         .setImage("https://media.discordapp.net/attachments/979080541271904337/1006148680442707968/Illustration2.gif")

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category ;
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`<:emoji_20:1005812890462322748>`") + "`";

        emx.addField(`<:emoji_21:1005817868794998824> ` + category, desc)
      }
      
      return message.channel.send(emx);
    }
  }
 }
