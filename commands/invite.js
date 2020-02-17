module.exports.run = async (client , message , args , ops) =>{

    client.generateInvite(['ADMINISTRATOR'])
        .then((link) => 
        {
            console.log(`Generated bot invite link to ${message.author}: ${link}`);
            message.author.send(`Here the link:${link}`);
    
        
        })
            .catch(console.error); 

}
module.exports.config = {
command : "invite"

}