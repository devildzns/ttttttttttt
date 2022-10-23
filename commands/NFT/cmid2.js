const Discord = require("discord.js");
const axios = require("axios");
const exponent = 9;
const db = require('quick.db')
const ee = require("../../botconfig/embed.json");
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
var pretty = require('pretty');

module.exports = {
    name: "scrape2",
    category: "General",
    cooldown: 2,
    run: async (client, message, args, user, text, prefix) => {
            try {
              
                    const url = args[0]

      
 axios.get(url).then(response =>{

            const html = response.data ;
            const $ = cheerio.load(html);
            const json = JSON.stringify(response.data);
            const obj = JSON.parse(json);
            const prettyhtml = pretty(obj);
            //console.log(prettyhtml);

            var parsedHTML = $.load(prettyhtml);
            var folder = parsedHTML('script').get()[1].attribs['src']

            console.log(folder)

            let Full = url + folder;
            console.log(Full);

            axios.get(Full).then(response =>{

                let info = response.data
                console.log(typeof info);
                let $2 = cheerio.load(info);
                let respjson = JSON.stringify(info);
                let obje = JSON.parse(respjson);

                //console.log(typeof obje);

                let substring = 'REACT_APP_CANDY_MACHINE_ID:';

                console.log(info.includes(substring));


                const split1 = obje.split('REACT_APP_CANDY_MACHINE_ID:',)[1];
                //console.log(obje.split('REACT_APP_CANDY_MACHINE_ID:' )[1]);
                const removeit = split1.split(' "')[0];
                const replace = removeit.replace('"', ' ');
                
                    
                const REACT_APP_CANDY_MACHINE_ID = replace.split('",')[0]
                console.log(REACT_APP_CANDY_MACHINE_ID);

                message.channel.send(REACT_APP_CANDY_MACHINE_ID)
        
            })
        
        });
      
         } catch (err) {
      
     const embed2 = new Discord.MessageEmbed()
.setTitle(`${ee.emojired} Error`)
     .addField(`Error`, `**\`${err}\`**`)
        .setTimestamp()
        .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext)
        message.channel.send(embed2)
    }

    }
}