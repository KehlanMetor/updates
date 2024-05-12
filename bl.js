const { QuickDB } = require('quick.db')
const db = new QuickDB();
const { Bot } = require('../../index')
const { EmbedBuilder } = require('discord.js');

/**
 * @param {Bot} client 
 */

module.exports = async (member, client) => {
  blusers = await db.get("bl")
  iduser = member.user.id;

  for (bluser of blusers) {
    bl = bluser.split("+");
    blpersonne = `${bl[0]}`
    if (blpersonne === iduser) {
     member.ban({ reason: "blacklist" })
    }
  }
    
  logsbl = await db.get(`logs_${member.guild.id}.mod`)
  if (logsbl === "off") return;
    
    modchannel = logsbl.replace(/[<#>]/gi, "");

    modsalon = await member.guild.channels.cache.get(modchannel)
    const banembed = new EmbedBuilder()
    .setTitle("❌ Logs Blacklist")
    .setDescription(`${member.user.username} a été ban car il était dans la blacklist.`)
    .setTimestamp()

    modsalon.send({ embeds: [banembed] })
  
}