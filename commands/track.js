
const search = require("yt-search");
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const Discord = require('discord.js');

module.exports.run = async (client , message , args , ops) =>{
    let text = "```diff"+"\n-No song in PlayList.. (￣▽￣*)ゞ "+"\n```";
    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send(text);


    let videoInfo = fetched.queue[0];
    let randomNumber_anime = Math.floor(((Math.random()*10)+1) % anime.length);
   
        let tex = "```diff"+"\n-Current Playing :..\n";
        let ms = videoInfo.duration;
         let embed = new Discord.RichEmbed()
         .setColor("RANDOM")
         .setTitle(videoInfo.requester)
         .setDescription(tex+videoInfo.songTitle+"\n```")
         .setThumbnail(videoInfo.Thumbnail)
         .addField("Duration :",convertTime(ms),true) 
         .addField("Link :",videoInfo.url,false) 
         .setFooter(anime[randomNumber_anime],client.user.displayAvatarURL);          
             message.channel.send(embed);
        console.log(convertTime(ms));
     





    
                                    

}

module.exports.config = {
command : "track"

}
function convertTime(sec) {
    var hours = Math.floor(sec/3600);
    (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
    var min = Math.floor(sec/60);
    (min >= 1) ? sec = sec - (min*60) : min = '00';
    (sec < 1) ? sec='00' : void 0;

    (min.toString().length == 1) ? min = '0'+min : void 0;    
    (sec.toString().length == 1) ? sec = '0'+sec : void 0;    

    return hours+':'+min+':'+sec;
}