module.exports.run = async (client , message , args  , ops) =>{
    console.log("args value after calling : ",args[0]);
     async function purge()
    {
            await message.delete();
            if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("oof , i guess dont have permission : ");
            if(isNaN(args[0])){
                message.reply("please use a number as argument .");
                return;

            }
             message.channel.bulkDelete(args[0])
            .catch(err =>{
                message.channel.send('somthing went wrong..');
                console.log(`Error : ${err}`);
            }
            )

    }
    purge();

}

module.exports.config = {
command : "clear"

}