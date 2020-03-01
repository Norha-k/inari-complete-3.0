const ytlist = require('youtube-playlist');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
module.exports.run = async (client , message , args , ops) =>{


    let fetched = ops.active.get(message.guild.id);
    let LocalArray = [];
    await ytlist(args[0], ['id', 'name', 'url']).then(res => {
                res.data.playlist.forEach(element => {
                LocalArray.push({
                songTitle :element.name,
                requester : message.author.tag,
                url  :  element.url,
                VideoID :  element.id,
                duration : 500,
                Thumbnail : `https://i.ytimg.com/vi/${element.id}/maxresdefault.jpg`,
                announceChannel : message.channel.id
                })
        });
   
      });
      if(fetched){
          await LocalArray.forEach(element => {
            fetched.queue.push(element)
            
        });

      }else{
        var data = ops.active.get(message.guild.id) || {};
        console.log("data created 1st for playlist: ",data);
        if(!data.connection) data.connection  = await message.member.voiceChannel.join();
        if(!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.loop = true;
        data.isPlaying = true;
        LocalArray.forEach(element => {
            data.queue.push(element)
            
        });
       
        if(!data.dispatcher) play(client,ops,data);
        console.log(data.queue);
        ops.active.set(message.guild.id,data);



      }
    message.channel.send("Done ! , Check Queue..");
      


}

async function play(client , ops , data){
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25  }));
    data.dispatcher.guildID = data.guildID;
    
    data.dispatcher.once('end', function(){

        console.log("Dispacther re for Playlist")
         finish(client,ops,this);

    });
    let randomNumber_anime = Math.floor(((Math.random()*10)+1) % anime.length);
    let embedf = new Discord.RichEmbed()
                                        .setColor("RANDOM")
                                        .setTitle(data.queue[0].requester)
                                        .setDescription(data.queue[0].url)
                                        .setFooter(anime[randomNumber_anime],client.user.displayAvatarURL)
                                        .addField(":headphones: now playing : ","***"+data.queue[0].songTitle+"***",false)
                                        .setThumbnail(data.queue[0].Thumbnail);            
                                        client.channels.get(data.queue[0].announceChannel).fetchMessages({ limit: 1})
                                        .then(msg => {
                                            const fetchedMsg = msg.first();
                                            if(fetchedMsg.editable){ fetchedMsg.edit(embedf);}
                                            else client.channels.get(data.queue[0].announceChannel).send(embedf);
                                           
                                        }); 

    


}

function finish(client,ops,dispatcher){

    let fetched = ops.active.get(dispatcher.guildID);
    if(!fetched) return;

    if(fetched.loop == true){
        fetched.queue.push(fetched.queue.shift());
    }
    else
    {   
        fetched.queue.shift();
    }
    if(fetched.queue.length > 0 && fetched.isPlaying){

        ops.active.set(dispatcher.guildID , fetched);
        setTimeout(()=>{
           
             play(client , ops , fetched);

                        },3000);
        


    }else{
            
            ops.active.delete(dispatcher.guildID);
            let vc =  client.guilds.get(dispatcher.guildID).me.voiceChannel;
            if(vc) vc.leave();
            

    }
}

module.exports.config = {
command : "playlistFile"

}

