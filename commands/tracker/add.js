const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "add-tracker",
        aliases: ["ra+"],
          category: "Trackers",
    description: "Banned wallets List",

    run: async (client, message, args, text, prefix) => {
      	let ops = [
			'livemints',
			'newcollections',
          'collection',
          'paperhand'
		];
		let disabled = ":x: Disabled"
		function check(msg, arr) {
			return arr.some(op => op.toLowerCase() === msg.toLowerCase());
		}
		let bruh = new Discord.MessageEmbed()
          .setTitle("Please specify the option.")
		.setDescription(`\`> alert ${ops.join("\n\n> alert ")}\``)
.setColor("#FF0000")
    
     let embed = new Discord.MessageEmbed()
        .setDescription("**The only options are: `above`, & `below`**")
      .setColor("#FF0000")

		if (!args[0]) return message.channel.send({ embed: bruh });
		if (check(args[0], ops) === false)
      
			return message.channel.send(
embed			);
			switch (args[0].toLowerCase()) {
			  case "livemints":
                                              try {
                                                
                                                 const guildicon = message.guild.iconURL();

    let pog = db.get(`channels_live_mints`)
    
     let Channel = message.mentions.channels.first().id || message.guild.channels.cache.get(args[0]).id;

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

    if (pog && pog.find((find) => find.channel == Channel)) {
            let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
            embed.setDescription(`**That channel is already on the database.**`)
        .setColor(ee.wrongcolor)

            embed.setTimestamp()
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {
      channel: Channel
        }
        let server_tracker = {
                     collection: "Not Found",
   type: "Live Mints Tracker",
                  channel: Channel
                }
        db.push(`channels_live_mints`, yes)
                                              db.push(`alltrackers_${message.guild.id}`, server_tracker)
                                                       db.add(`trackers_live_${message.guild.id}`, 1)

        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**Successfully added the tracker.**`)
        .setColor(ee.color)
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })
  

          } catch (err) {
      console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`Something went wrong`)
        .setDescription(`**\`${err}\`**`)
        .setTimestamp()
        .setColor("RED")
.setFooter("Developed by 0xDeViL#3230")
        message.channel.send(embed2)
    }
			    break;
          			  case "newcollections":
  try {} catch (err) {
      console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`Something went wrong`)
        .setDescription(`**\`${err}\`**`)
        .setTimestamp()
        .setColor("RED")
.setFooter("Developed by 0xDeViL#3230")
        message.channel.send(embed2)
    }
          			    break;
          
          case "collection":
                                              try {
                                                
                                                     const guild = message.guild.id;

 let codecheck = db.get(`premium_floor_alerts`)
 
  let alreadyexist = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
  .setDescription(`**You can't use this feature!**`)      
  .setColor(ee.wrongcolor)

  if(codecheck && !codecheck.find(find => find.premiumcodes == guild)) return message.channel.send(alreadyexist);                                   


      
    let collection = args[0]
   
     let Channel = message.mentions.channels.first().id;
message.channel.send(Channel)
        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);
   const resp = (await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`)).data;
             var fp = (resp.floorPrice / Math.pow(10, exponent)).toFixed(2);
                                      
                                        if (fp === "NaN") {
                                        
        
    const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription("**Couldn't find that collection.**")
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
      
                                      }
                                      
                                      
                                      
                                    
      
    if (!collection) {
      let embed = new Discord.MessageEmbed()
              .setTitle(`${ee.emojired} Error`)
        .setDescription(`**${prefix} alert-above (collection) (price)**`)
  .setColor(ee.wrongcolor)
      .setFooter(ee.footertext)
      return message.channel.send({
        embed: embed
      })
    }
                                      
                                       const pog = db.get(`sales_collections`)
                                         let array = [];
      
    

 if (pog && pog.length) {
            pog.forEach((x) => {
                array.push(`${x.collection}`);
            });
 }  
                                         if (array.length < 1) {
      
       const embed = new Discord.MessageEmbed()
  .setColor(ee.wrongcolor)
        .setTitle(`${ee.emojired} Error`)
      .setDescription(`**There are no collections in the database.**`)
                       .setFooter("Developed by 0xDeViL#3230")
      .setTimestamp()
       
      return message.channel.send(embed);
    }
                                       
              if (pog && !pog.find((find) => find.collection == collection)) {
                 const embed2 = new Discord.MessageEmbed()
        .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is not on the database.**`)
        .setTimestamp()
  .setColor(ee.wrongcolor)
        
       return message.channel.send(embed2)
    }

      
      const usercollections =  db.get(`${collection}_${Channel}`)
      if(usercollections){
          let embed = new Discord.MessageEmbed()
      .setTitle(`${ee.emojired} Error`)
        .setDescription(`**That collection is alredy being tracked.**`)
  .setColor(ee.wrongcolor)
          .setFooter(ee.footertext)
        return message.channel.send(embed)
      }
      

                let yes2 = {
                  collection: collection,
                }
                let channel2 = {
                  channel: Channel
                }
 let server_tracker = {
                     collection: collection,
   type: "Collection Tracker",
                  channel: Channel
                }
                
            db.push(`${collection}_channels`, channel2)          
            db.set(`${collection}_${Channel}`, message.guild.id)
            db.add(`trackers_${message.guild.id}`, 1)
                                        db.push(`alltrackers_${message.guild.id}`, server_tracker)          
          
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**The tracker has been added.**`)
        embed.setColor(ee.color)
        embed.setTimestamp()
                                      .setFooter(ee.footertext)
        message.channel.send({
          embed: embed
        })

          } catch (err) {
      console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`Something went wrong`)
        .setDescription(`**\`${err}\`**`)
        .setTimestamp()
        .setColor("RED")
.setFooter("Developed by 0xDeViL#3230")
        message.channel.send(embed2)
    }
			    break;
          
          case "paperhand":
                                              try {
                                                
                                                 const guildicon = message.guild.iconURL();

    let pog = db.get(`channels_paperhand`)
    
     let Channel = message.mentions.channels.first().id || message.guild.channels.cache.get(args[0]).id;

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

    if (pog && pog.find((find) => find.channel == Channel)) {
            let embed = new Discord.MessageEmbed()
  .setTitle(`${ee.emojired} Error`)
            embed.setDescription(`**That channel is already on the database.**`)
        .setColor(ee.wrongcolor)

            embed.setTimestamp()
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {
      channel: Channel
        }
        let server_tracker = {
                     collection: "Not Found",
   type: "Paperhand Tracker",
                  channel: Channel
                }
        db.push(`channels_paperhand`, yes)
                                              db.push(`alltrackers_${message.guild.id}`, server_tracker)
                                                       db.add(`trackers_paper_${message.guild.id}`, 1)

        let embed = new Discord.MessageEmbed()
        embed.setTitle("Success")
        embed.setDescription(`**Successfully added the tracker.**`)
        .setColor(ee.color)
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })
  

          } catch (err) {
      console.log(err)
     const embed2 = new Discord.MessageEmbed()
        .setTitle(`Something went wrong`)
        .setDescription(`**\`${err}\`**`)
        .setTimestamp()
        .setColor("RED")
.setFooter("Developed by 0xDeViL#3230")
        message.channel.send(embed2)
    }
			    break;
          
          }
	    }
}