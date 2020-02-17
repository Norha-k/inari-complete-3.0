
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const {users} = require('../RegisteredUsers.json');
const search = require("yt-search");
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
module.exports.run = async (client , message , args , ops, db,admin) =>{

    let UserID = message.author.id;
    if(!users.includes(UserID)){return message.channel.send(`you have to  register 1st !\nuse command :  ${prefix}regi <song-url>`);}
    await db.collection('guild').doc(UserID).get().then(function(querySnapshot){
        let databaseArray = [...querySnapshot.data().song]
        console.log(querySnapshot.data().song);

        PlayListshow(databaseArray,message);
        

    })
      
     



}

module.exports.config = {
command : "get"

}

function PlayListshow(databaseArray,message){

    var mes = "```json\n"+"       klyra Ōkami | 稲荷大神 (Your playlist) \n\n"+"\n";
    for(var i =  0; i < databaseArray.length; i++)
    {
        
            
            var temp = (i+1) + " : " + databaseArray[i].songTitle +"\n";
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

}