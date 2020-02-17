module.exports.run = async (client , message , args , ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send('There currently isn\'t any music playing in this guild !');


    let queue = fetched.queue;
    let nowplaying = queue[0];
    var mes = "```json\n"+"       klyra Ōkami | 稲荷大神 (current playlist) \n\n"+"\n";
    for(var i =  0; i < queue.length; i++)
    {
        
            
            var temp = (i+1) + " : " + queue[i].songTitle + (i === 0 ?  "  (Now playing)\n" :  "") +"\n";
            if((mes + temp ).length <= 2000-3)
            {
                mes += temp;
            }
            else
            {
                mes += "```";
                message.channel.send(mes);
                mes = "```";
            }  

    }
    mes +="```";
    message.channel.send(mes);




   /* let resp = `__**Now playing**__\n**${nowplaying.songTitle}** -- **Requested By:** ${nowplaying.requester} \n\__**Queue**__\n`;
    for (var i = 1; i < queue.length;i++){
        resp += `${i}. **${queue[i].songTitle}** -- **Requested  By: ** ${queue[i].requester}\n`;
    }

    message.channel.send(resp);
    */
}

module.exports.config = {
command : "queue"

}