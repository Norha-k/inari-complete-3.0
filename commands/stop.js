module.exports.run = async (client , message , args , ops) =>{


   if(!message.member.voiceChannel) return message.channel.send('please connect to a voice channel.');

   if(!message.guild.me.voiceChannel) return message.channel.send('sorry , the bot isn\'t connected to the server.');

   if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('sorry you aren\'t connected in same channel.');
   
   let data = ops.active.get(message.guild.id);
   console.log("--------------->",data.queue);
   data.dispatcher.destroy();
   message.guild.me.voiceChannel.leave()
   ops.active.delete(message.guild.id);
   //ops.active.delete(data);
  /* message.guild.me.voiceChannel.leave();
   console.log("checking ----->",ops.active.get(message.guild.id));
   ops.active.delete(message.guild.id);*/
   return message.channel.send(" ** succesfully disconnected ! **");
  

}

module.exports.config = {
command : "stop"

}



   
