const Discord = require('discord.js');
const fs = require("fs");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true})
const prefix = ">";

// Command Hander
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    })
})

//Ready Event
bot.on('ready', () => {
    bot.user.setStatus("dnd")
bot.user.setActivity("Being Developed",          {type: "WATCHING"})

console.log(`${bot.user.username} Is now online!`)

});

// Message Event
bot.on("message", async message => {

    if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
    
})

bot.login(config.token);