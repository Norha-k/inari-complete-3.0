
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
module.exports.run = async (client , message , args, ops) =>{

    if(!message.member.voiceChannel) return message.reply('please connect to a voice channel .');

    //if(message.guild.me.voiceChannel) return message.reply('sorry bot is already connected in voicechannel');

    if(!args[0]) return message.reply('sorry , provide a URL or any input.');
    let validate = await ytdl.validateURL(args[0]);
 
    if(!validate){

        if(args[0].match(/^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/)){
            let PlayListcommandFile = require('./playlistFile.js');
            return PlayListcommandFile.run(client,message,args,ops);
            
        }
        else{

            let commandFile = require('./search.js');
            return commandFile.run(client,message,args,ops);

        }

        


    } 
    let info = await ytdl.getInfo(args[0]);
    let data = ops.active.get(message.guild.id) || {};
    console.log("data created 1st: ",data);
    if(!data.connection) data.connection  = await message.member.voiceChannel.join();
    console.log("data.connection at start :",data.connection);
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.loop = true;
    data.isPlaying = true;
    console.log("data created 2nd: ",data);
    data.queue.push({
        songTitle : info.title,
        requester : message.author.tag,
        url  : args[0],
        VideoID : info.video_id,
        duration : info.length_seconds,
        Thumbnail : `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
        announceChannel : message.channel.id
        
        
    });
    console.log("data created 3rd: ",data);
    if(!data.dispatcher) play(client,ops,data);
    else{

        let randomNumber_anime = Math.floor(((Math.random()*10)+1) % anime.length);
        let embedf = new Discord.RichEmbed()
                                        .setColor("RANDOM")
                                        .setTitle(message.author.tag)
                                        .setDescription(args[0])
                                        .setFooter(anime[randomNumber_anime],client.user.displayAvatarURL)
                                        .addField(":headphones: added to Queue : ","***"+info.title+"***",false)
                                        .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`);            
                                    client.channels.get(message.channel.id).send(embedf);

    }

    ops.active.set(message.guild.id,data);


}

async function play(client , ops , data){

    
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25  }));
    data.dispatcher.guildID = data.guildID;
    
    data.dispatcher.once('end', function(){

        console.log("coming at here as welll !")
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
                                    //client.channels.get(data.queue[0].announceChannel).send(embedf);

    


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
    command : "play"


}