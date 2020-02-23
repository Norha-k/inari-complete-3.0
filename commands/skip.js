module.exports.run = async (client , message , args , ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("There currently isn\'t any music playing in this guild!");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    return message.channel.send("sorry , you currently aren\'t in the same channel as the bot !");

    let userCount = message.member.voiceChannel.members.size;
    let required = (Math.ceil(userCount/2)-1);

    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`sorry , you already voted to skip ! now ${fetched.queue[0].voteSkips.length}/${required} votes required to skip.`);

    fetched.queue[0].voteSkips.push(message.member.id);
    ops.active.set(message.guild.id , fetched);

    if(fetched.queue[0].voteSkips.length >= required){
        message.channel.send('Succesfully skipped song !');

        return fetched.dispatcher.emit('end');
    }
    message.channel.send(`Succesfully voted to skip ! ${fetched.queue[0].voteSkips.length}/${required} required !`);
    

}
module.exports.config = {
command : "skip"

}