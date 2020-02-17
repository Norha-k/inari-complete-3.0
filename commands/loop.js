module.exports.run = async (client , message , args , ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send('There currently isn\'t any music playing in this guild !');


    let queue = fetched.queue;
    let nowplaying = queue[0];
    if(fetched.loop == true){
        fetched.loop = false;
        message.channel.send(`Loop enabled : ${fetched.loop}`);
    }
    else{
        fetched.loop = true;
        message.channel.send(`Loop enabled : ${fetched.loop}`);
    }


}

module.exports.config = {
command : "loop"

}