module.exports.run = async (client , message , args , ops) =>{


   if(!message.member.voiceChannel) return message.channel.send('please connect to a voice channel.');

   if(!message.guild.me.voiceChannel) return message.channel.send('sorry , the bot isn\'t connected to the server.');

   if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('sorry you aren\'t connected in same channel.');
   
   let data = ops.active.get(message.guild.id);
   console.log("--------------->",data.queue);
   data.isPlaying = false;
   data.dispatcher.end();
   message.guild.me.voiceChannel.leave()
   return message.channel.send(" ** succesfully disconnected ! **");
  

}

module.exports.config = {
command : "stop"

}



   
