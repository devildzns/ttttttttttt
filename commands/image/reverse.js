const { MessageEmbed } = require('discord.js');
const sagiri = require('sagiri');
const isImageURL= require('is-image-url');
const reverse = sagiri("5420465f9241f37724544b94510ce92432978ea8");

const exponent = 9
module.exports = {
	name: 'reverse',
      category: "Developer",
    run: async (client, message, args, text, prefix) => {
        async function require(imageURL) {
            await reverse(imageURL).then(response => {
                const data = response[0];
                const results = {
                    url: data.url,
                    site: data.site,
                    similarity: data.similarity,
                    thumbnail: data.raw.header.thumbnail,
                    authorName: data.authorName || 'none',
                };
                const minSimilarity = 70;
                if (minSimilarity <= results.similarity) {
                    const reverseEmbed = new MessageEmbed()
                      
                        .addFields(
                            {name: "Similarity", value: `${results.similarity}%`, inline: true},
                           
                            {name: "Link", value: `${results.url}`, inline: true}
                        )
                        .setImage(results.thumbnail)
                        .setTimestamp()
                        .setFooter(
                            {text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`}
                        )
                    message.channel.send(reverseEmbed)
                } else 
                    message.channel.send('No results found!')
            })
        }
        if (!message.attachments.first() && !args[0]) {
            message.channel.send("Image not found!").then(msg => {
                setTimeout(() => msg.delete(), 3000)
            })
        } else if (message.attachments.first()) {
            if (isImageURL(message.attachments.first().url))
                require(message.attachments.first().url)
        } else if (args[0]) {
            if (isImageURL(args[0]))
                require(args[0])
        }
    }
    }