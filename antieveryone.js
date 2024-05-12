const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { EmbedBuilder } = require('discord.js')


module.exports = async (message) => {
    async function sendlogs() {
    logsbl = await db.get(`logs_${message.guild.id}.mod`)
    if (logsbl === "off") return;
    
    modchannel = logsbl.replace(/[<#>]/gi, "");

    modsalon = await message.guild.channels.cache.get(modchannel)
    const banembed = new EmbedBuilder()
    .setTitle("‼️ Logs Everyone")
    .setDescription(`${message.author} a été ban car il a fait une mention everyone.`)
    .setTimestamp()

    modsalon.send({ embeds: [banembed] })
    }

    try {
    ison = await db.get(`antieveryone_${message.guild.id}`)
    wl = await db.get(`wl_${message.guild.id}`);
    if (ison === "off") return;
    if (wl.includes(message.author.id)) return;

    if (message.content.includes("@everyone")) {
        message.delete();
        TargetUser = await message.guild.members.fetch(message.author.id)
        await TargetUser.ban({ reason: "antieveryone" })
        await sendlogs()
    } } catch(error) {
        
    }
}