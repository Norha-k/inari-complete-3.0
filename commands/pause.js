module.exports.run = async (client , message , args , ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("There currently isn\'t any music playing in this guild!");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    return message.channel.send("sorry , you currently aren\'t in the same channel as the bot !");

    if(fetched.dispatcher.paused) return message.channel.send("The music is already paused !");

    fetched.dispatcher.pause();
    message.channel.send(`succesfully paused **${fetched.queue[0].songTitle}**`);

    

}
module.exports.config = {
command : "pause"

}