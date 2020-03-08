const Discord = require('discord.js');
const {token,systemprefix,yt_api_key,anime,ownerID} = require('./config.json');
const fs = require('fs');
const profanities = require('profanities');
const client =new Discord.Client();
const active = new Map();  //creating new map for server mappings
//Heruko Support

const http = require("http");
const port  = 3000;
http.createServer().listen(port);



 // firebase initialization
const firebase = require('firebase/app');
const fieldValue = require('firebase-admin').firestore.fieldValue;
const admin = require('firebase-admin');
const serviceAccount  = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})

let db = admin.firestore();

//commmand handler stuff
let prefix = systemprefix;
client.commands = new Discord.Collection();
let ops = {
    ownerID :  ownerID,
    active  :  active
}
function LoadCommands(){
    fs.readdir('./commands/',(err , files) =>{
        if(err) console.log(err);
        console.log("files  : ",files);
        var jsfiles = files.filter(f => f.split('.').pop() === 'js');
        console.log("jsfiles  : ",jsfiles);
        if(jsfiles.length <=0) { return console.log("No commands found..")};
        jsfiles.forEach((f , i) =>{
            delete require.cache[require.resolve(`./commands/${f}`)];
            var cmds  = require(`./commands/${f}`);
            console.log(`commad ${f} is loading....`);
            client.commands.set( cmds.config.command , cmds); // actually setting all commands for my bot with provide command.config in that .js file
        })
    
    })


}

LoadCommands();//to load commands in very start.
client.once('ready',() => {

    
    console.log("Inari  is online !");
    setInterval(function(){
        let status = [
            `over ${client.guilds.size} guilds!`,` my only senpai Hemantk | オタク#2123`,`  over ${client.users.size} users yee !`,'with your unrealestic waifu :P'
        ]
        let st = status[Math.floor(Math.random() * status.length)]+`    |  ${systemprefix}help | ${systemprefix}invite  | ${systemprefix}prefix`;
        client.user.setActivity(st , {type : "PLAYING"});
        

    },8000);
    
  
})

client.on('message', message=>{

    if(message.author.bot) return;
    if (message.channel.type == "dm") return message.reply("sorry :fox: , i dont accept Direct messages try to contact me from ur server !");
    for (x=0; x< profanities.length; x++){
        if(message.content.toUpperCase() == profanities[x].toUpperCase()){
            message.channel.send(`Hey ! Don\'t say that !`)
            return;
        }
    }

    db.collection(`prefix`).doc(message.guild.id).get().then((q)=>{
        if(q.exists){
            prefix = q.data().prefix;
        }
        else
        {
            prefix = systemprefix;
        }

        
    }).then(()=>{
    var sender = message.author;
    var msg = message.content.toUpperCase();
   
    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);
    var cmd = client.commands.get(cont[0]) //tries to grab command you called in chat.
    if(msg === systemprefix + 'PREFIX'){  message.channel.send(`**Your Guild prefix : **[ ${prefix} ]`)}
    if(!message.content.startsWith(prefix)) return; //return if prefix is not matching with assigned one
    //console.log("args value right now : ",args);
    
    if(cmd) cmd.run(client,message,args,ops,db,admin);
   
    if(msg === prefix + 'RELOAD'){  message.channel.send("commands Reloaded...");LoadCommands();}


    });
    



    
});

client.login(token);

client.on('guildCreate', async gData =>{
    db.collection(`prefix`).doc(gData.id).set({
        'guildID' : gData.id,
        'guildName' : gData.name,
        'GuildOwner' : gData.owner.id,
        'prefix' : '?'



        
    });

});
