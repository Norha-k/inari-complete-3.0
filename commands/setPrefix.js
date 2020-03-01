module.exports.run = async (client , message , args , ops ,db,admin) =>{
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("oof , i guess dont have permission : ");
   if(args.length === 0){
       message.channel.send("Missing Prefix !");
   }else if(args.length === 1){
       let nprefix = args[0];
       db.collection(`prefix`).doc(message.guild.id).update({
        
        'prefix' : nprefix

        
    }).then(()=>{
            message.channel.send(`[prefix updated] : new prefix ${nprefix}`)
    })
   }
    

}
module.exports.config = {
command : "setPrefix"

}