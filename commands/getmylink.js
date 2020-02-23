
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');

var fs = require('fs');
module.exports.run = async (client , message , args , ops, db,admin) =>{
    let UserID = message.author.id;
    await fs.readFile('./RegisteredUsers.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data);
        console.log("arrayofobject value",arrayOfObjects);
        if(!arrayOfObjects.users.includes(UserID)){return message.channel.send(`you have to  register 1st !\nuse command :  ${prefix}regi <song-url>`);}
    
    })
    
    await db.collection('guild').doc(UserID).get().then(function(querySnapshot){
        let databaseArray = [...querySnapshot.data().song];
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