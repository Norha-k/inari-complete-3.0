const search = require('yt-search');
const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
var opts = {
    maxResults: 10,
    key: yt_api_key
  };

module.exports.run = async (client , message , args , ops) =>{
    console.log(yt_api_key);
    search(args.join(' '),function(err , res) {
        if(res.videos.length  < 2) return message.reply(`I had some trouble finding what you were looking for, please try again or be more specific`);
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

    });

    

}

module.exports.config = {
command : "search"

}