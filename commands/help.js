
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
        .setTitle(":heart:   Inari Ōkami | 稲荷大神 :feet: ")
        .setDescription(`Hello , its me Inari Ōkami | 稲荷大神 :heart: but u can call me , Klyra !\nHere my **commands** below u can check !`)
        .addField("**say hii to me**  :wave:: ",prefix+"hey",true)
        .addField("**ping check :ping_pong:** : ",prefix+"ping",true)
        .addField("**set new Prefix ::nut_and_bolt: ** : ",prefix+"setPrefix",true)
        .addField("play music :headphones: : ",prefix+"play <space> music_name or URL",false)
        .addField("search music :headphones: : ",prefix+"search <space> music_name ",false)
        .addField("loop music: :repeat_one: :",prefix+"loop",true)
        .addField("stop music: :octagonal_sign: :",prefix+"stop",true)
        .addField("drop music: :drop_of_blood:  :",prefix+"drop <Music index no.>",false)
        .addField("track current music: :musical_score: ",prefix+"track",true)
        .addField("list details: :musical_score: ",prefix+"queue",true)
        .addField("skip music  : :ballot_box_with_check: ",prefix+"skip",false)
        .addField("pause Music  : :pause_button:  ",prefix+"pause",true)
        .addField("resume Music  : :play_pause:   ",prefix+"resume",true)
         .addField("```Save Music (VIP users)  ```: :satellite: ","```"+prefix+"addme <space> url```",false)
         .addField("```Register to become VIP  ```: :star2:     ","```"+prefix+"regi <space> 1st time url```",false)
         .addField("```Show Your VIP PlayList  ```: :heart:      ","```"+prefix+"get```",false)
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