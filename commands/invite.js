const Discord = require('discord.js');
const {token,prefix,yt_api_key,anime,ownerID,siteLink} = require('../config.json');
module.exports.run = async (client , message , args , ops) =>{

    client.generateInvite(['ADMINISTRATOR'])
        .then((link) => 
        {
            console.log(siteLink)
            let embedh = new Discord.RichEmbed()
            .setAuthor(`Heya ! its ${client.user.tag} at your service (=^ ◡ ^=) :`,client.users.get(ownerID).avatarURL)
            .setDescription(`
            Hello , Thank you for Using ${client.user.tag} bot . as she is one of my 1st Production based project i am working on and learning something new day by day.\n
            if you have any suggestion and bug reports you can ping me on **Discord :** **[${client.users.get(ownerID).tag}](https://github.com/Norha-k)**  anytime UwU !
            as this bot is still under development so dont expect too much so...
            Have a Good day !
            `)
            .addField("visit my official website  :",`[www.Norha-k\'Inari.io](${siteLink})`)
            .setFooter(`i don't accepts DM's so , ask me anything from server`)
            .setThumbnail(client.user.avatarURL)
            .addField("**Add Me To your server :**",`[Inari.io](${link})`)
           // console.log(`Generated bot invite link to ${message.author}: ${link}`);
           message.author.send(embedh).then((embedMessage)=>{
            embedMessage.react("❤").then(()=>{embedMessage.react("👋")}).then(()=>{embedMessage.react("🤞")}) })
    
        
        }).then(()=> message.reply("Check your DM's :fox: "))
            .catch(console.error); 

}
module.exports.config = {
command : "invite"

}