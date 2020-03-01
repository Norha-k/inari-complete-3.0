
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
//var {users} = require('../RegisteredUsers.json');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
var fs = require('fs')

module.exports.run = async (client , message , args , ops,db,admin) =>{

    let UserID = message.author.id;
    if(!args[0]) return message.reply('sorry , provide a URL or any input.');
    let validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("please provide a proper link.");
    let info = await ytdl.getInfo(args[0]);
    await db.collection('VIP').doc(UserID).get().then((q)=>{
        console.log("Queryshot",q.data());
        if(q.exists){
            console.log("already registered !");
            return message.channel.send("**cough , cough you are already registered...(  - _ - )**");
        }
        else
        {
            message.channel.send("```Hello , welcome to klyra and Inari's own playlist managing place \n so..actually this function is still in underconstruction u know ...so...dont be to rely on it for now,\nbut will ping you when its permanently available !```");
            db.collection('VIP').doc(UserID).set({
                 UserName : message.author.tag
                    
              }).then(message.reply(`congratulation\'s ,you are now our VIP user !`))
              .catch(err => {
                console.log('Error getting document', err);
              }).then(
                                db.collection('guild').doc(UserID).set({
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
                                                                })

                        )
            }

        
    })
    
     
  


}

module.exports.config = {
command : "regi"

}
  /*fs.readFile('./RegisteredUsers.json', 'utf-8', function(err, data) {
        if (err) throw err
    
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.users.push(
            UserID
        )
    
        console.log(arrayOfObjects)
        fs.writeFile('./RegisteredUsers.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
    
    */


    
    
   /*let info = await ytdl.getInfo(args[0]);
    db.collection('guild').doc(UserID).set({
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
      }); */