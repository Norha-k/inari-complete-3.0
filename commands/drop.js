
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const Discord = require('discord.js');
module.exports.run = async (client , message , args , ops) =>{

    if(isNaN(args[0])){
        message.reply("please use a number as argument .");
        return;

    }
    if(args[0] ==  1) return message.channel.send("aagh ,  you cant delete current playing song !");
    let fetched = ops.active.get(message.guild.id);

    if(!message.member.voiceChannel) return message.channel.send('please connect to a voice channel.');
    if(!message.guild.me.voiceChannel) return message.channel.send('sorry , the bot isn\'t connected to the server.');
    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('sorry you aren\'t connected in same channel.');
    
    
        message.channel.send("**song :  **  "+fetched.queue[(args[0]-1)].songTitle+"** removed ! **");
        fetched.queue.splice((args[0]-1),1);
        
    
    
    


}

module.exports.config = {
command : "drop"

}