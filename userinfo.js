const { 
    SlashCommandBuilder, 
    EmbedBuilder,
 } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
          .setName("userinfo")
          .setDescription("Recuperer des informations a propos d'un utilisateur")
          .addMentionableOption(option => {
            return option
           .setName("utilisateur")
           .setDescription("Mention de l'utilisateur")
           .setRequired(true)
          }),
    run: async ({ interaction }) => {
        wl = await db.get(`wl_${interaction.guild.id}`)

        if (!wl.includes(interaction.user.id)) return interaction.reply("Tu n'es pas whitelist !")
        userinfo = interaction.options.getMentionable("utilisateur")

        const usinfoembed = new EmbedBuilder()
        .setTitle("ℹ️ Userinfo")
        .setThumbnail("https://cdn.discordapp.com/avatars/"+userinfo.user.id+"/"+userinfo.user.avatar+".jpeg")
        .setDescription(`
        🪪 Pseudo : ${userinfo.user.globalName}
        🔗 Tag : ${userinfo.user.username} (${userinfo.user.id})
        🤖 Bot : ${userinfo.user.bot}`)

        interaction.reply({ embeds: [usinfoembed] });
    }
}