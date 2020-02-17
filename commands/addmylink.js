
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const {users} = require('../RegisteredUsers.json');
const search = require("yt-search");
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
module.exports.run = async (client , message , args , ops, db,admin) =>{

    let UserID = message.author.id;
    if(!users.includes(UserID)){return message.channel.send(`you have to  register 1st !\nuse command :  ${prefix}regi <song-url>`);}
    if(!args[0]) return message.reply('sorry , provide a URL or any input.');
    let validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("please provide a proper link.")
    
    
    let info = await ytdl.getInfo(args[0]);
    db.collection('guild').doc(UserID).update({
        'song' : admin.firestore.FieldValue.arrayUnion({
            songTitle : info.title,
            requester : message.author.tag,
            url  : args[0],
            VideoID : info.video_id,
            duration : info.length_seconds,
            Thumbnail : `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
            announceChannel : message.channel.id
            
        })
      }).then(message.channel.send(":fox:  **Sucessfully added !** song : "+info.title+" |     by "+message.author.tag))
      .catch(err => {
        console.log('Error getting document', err);
      });



    /*search(args.join(' '),function(err , res) {




        /*if(res.videos.length  < 2) return message.reply(`I had some trouble finding what you were looking for, please try again or be more specific`);
        if (err) return message.channel.send("sorry , something went wrong..");
        let videos = res.videos.slice(0,10);
        let resp ='';
        for(var i in videos){
            resp +=`**[${parseInt(i)+1}] :  ** \`${videos[i].title}\`\n`;
        }
        resp += `\nChoose a number between \`1-${videos.length}\``;

        message.channel.send(resp);

        const filter = m =>  !isNaN(m.content) && m.content < videos.length+1 && m.content >0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;
        collector.once('collect',function(m){
            let commandFile = require('./play.js');
            commandFile.run(client,message,[this.videos[parseInt(m.content)-1].url],ops);

        })

    }); */
    


}

module.exports.config = {
command : "addme"

}