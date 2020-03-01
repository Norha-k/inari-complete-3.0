
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const search = require("yt-search");
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
var fs = require('fs');
module.exports.run = async (client , message , args , ops, db,admin) =>{

    var UserID = message.author.id;
    if(!args[0]) return message.reply('sorry , provide a URL or any input.');
    let validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("please provide a proper link.");
    let info = await ytdl.getInfo(args[0]);
    await db.collection('VIP').doc(UserID).get().then((q)=>{
        console.log("Users",q.data());
      if(q.exists){
                  db.collection('guild').doc(UserID).update({
                    'song': admin.firestore.FieldValue.arrayUnion({
                      Thumbnail: `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
                      requester: message.author.tag,
                      url: args[0],
                      VideoID: info.video_id,
                      duration: info.length_seconds,
                      songTitle: info.title,
                      announceChannel: message.channel.id
                    })
                  }).then(message.channel.send(":fox:  **Sucessfully added !** song : " + info.title + " |     by " + message.author.tag))
                    .catch(err => {
                      console.log('Error getting document', err);
                    });
      }
      else
      {
                  return message.reply(`you have to  register 1st !\n use regi <song-url> command`);     
          
      }

      
  })
   


}

module.exports.config = {
command : "addme"

}
 /*fs.readFile('./RegisteredUsers.json', 'utf-8', function (err, data) {
    if (err)
      throw err;
    var arrayOfObjects = JSON.parse(data);
    console.log("arrayofobject value", arrayOfObjects);
    if (!arrayOfObjects.users.includes(UserID)) {
      return message.channel.send(`you have to  register 1st !\nuse command :  ${prefix}regi <song-url>`);
    } 
    db.collection('guild').doc(UserID).update({
      'song': admin.firestore.FieldValue.arrayUnion({
        Thumbnail: `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
        requester: message.author.tag,
        url: args[0],
        VideoID: info.video_id,
        duration: info.length_seconds,
        songTitle: info.title,
        announceChannel: message.channel.id
      })
    }).then(message.channel.send(":fox:  **Sucessfully added !** song : " + info.title + " |     by " + message.author.tag))
      .catch(err => {
        console.log('Error getting document', err);
      });
     
  })
    
   

   */ 