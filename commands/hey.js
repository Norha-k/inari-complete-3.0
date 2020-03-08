const {token,prefix,yt_api_key,anime,ownerID} = require('../config.json');
const Discord = require('discord.js');
module.exports.run = async (client , message , args , ops) =>{

        message.reply({files : ['./res/tenor2.gif']})

}

module.exports.config = {
command : "hey" 

}