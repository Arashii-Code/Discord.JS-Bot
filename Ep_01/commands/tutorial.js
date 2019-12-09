const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.reply("Hello")
}

module.exports.config = {
    name: "Tutorial",
    usage: ">hello",
    accessableby: "Members",
    aliases: ["hello", "hey", "hi"]
}