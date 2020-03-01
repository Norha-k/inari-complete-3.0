const search = require('yt-search');
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const Discord = require('discord.js');
var opts = {
    maxResults: 10,
    key: yt_api_key
  };

module.exports.run = async (client , message , args , ops) =>{
    console.log(yt_api_key);
    await search(args.join(' '),function(err , res) {
        if(res.videos.length  < 2) return message.reply(`I had some trouble finding what you were looking for, please try again or be more specific`);
        if (err) return message.channel.send("sorry , something went wrong..");
        let  videos = res.videos.slice(0,7);
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('Choose a song by commenting a number between 1 to 7')
        .setThumbnail(message.author.avatarURL)
        .setFooter("[kawai !]",client.user.displayAvatarURL)
        for(var i in videos){
            embed.addField(`**${parseInt(i)+1} : ${videos[i].title}**`  ,videos[i].url,false)
        }
        message.channel.send(embed);
        const filter = m =>  !isNaN(m.content) && m.content < videos.length+1 && m.content >0;
        const collector = message.channel.createMessageCollector(filter,{time : 9000});
       
        collector.videos = videos;
        collector.once('collect',function(m){
            let commandFile = require('./play.js');
            commandFile.run(client,message,[this.videos[parseInt(m.content)-1].url],ops);

        })
        collector.once('end',collected =>{
            if(collected.size == 0) return message.reply("Oops , Time Out try again !")

    })
        
                 
        })
            
       
    

}

module.exports.config = {
command : "search"

}