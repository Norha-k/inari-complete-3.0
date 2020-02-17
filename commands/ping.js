module.exports.run = async (client , message , args , ops) =>{


        message.reply("pong : "+client.ping+" ms");

}

module.exports.config = {
    command : "ping"

}