
const {token,systemprefix,yt_api_key,anime,ownerID} = require('../config.json');
const Discord = require('discord.js');
module.exports.run = async (client , message , args , ops,db) =>{
    let prefix;
    let fetched = ops.active.get(message.guild.id);
    db.collection(`prefix`).doc(message.guild.id).get().then((q)=>{
        if(q.exists){
             prefix = q.data().prefix;
        }
        else{
            prefix = systemprefix;
        }
        
    }).then(()=>{
        let embedh = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(":heart:   Klyra Ōkami | 稲荷大神 :feet: ")
        .setDescription("Hello , its me Klyra Ōkami | 稲荷大神 :heart: but u can call me , Klyra ! \n Here my **commands** below u can check !")
        .addField("say hii to me  :wave:: ",prefix+"hey",false)
        .addField("ping check :ping_pong: : ",prefix+"ping",false)
        .addField("play music :headphones: : ",prefix+"play <space> music_name or URL",false)
        .addField("search music :headphones: : ",prefix+"search <space> music_name ",false)
        .addField("loop music: :repeat_one: :",prefix+"loop",false)
        .addField("stop music: :octagonal_sign: :",prefix+"stop",false)
        .addField("drop music: :drop_of_blood:  :",prefix+"drop <Music index no.>",false)
        .addField("track current music: :musical_score: ",prefix+"track",false)
        .addField("list details: :musical_score: ",prefix+"queue",false)
        .addField("skip music  : :ballot_box_with_check: ",prefix+"skip",false)
        .addField("pause Music  : :pause_button:  ",prefix+"pause",false)
        .addField("resume Music  : :play_pause:   ",prefix+"resume",false)
         .addField("Save Music (VIP users)  : :satellite:    ",prefix+"addme <space> url",false)
         .addField("Register to become VIP  : :star2:     ",prefix+"regi <space> 1st time url",false)
        .addField("to invite me in your servers  : :space_invader:   ",prefix+"invite",false)
        .addField("clear mesaage [if u have permission] :crossed_swords: : ",prefix+"clear <space> no. of messages to clear",false)
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter("Everyone thank you so much for helping my Creater to make me a good girl .",message.author.avatarURL);      
            message.channel.send(embedh);

    })
   
    


}

module.exports.config = {
command : "help"

}