const { countDownDateAndTime } = require('countdown-date-time');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json')
const { isExpired } = require('../../coutdown')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    run: async ({ client, interaction }) => {
      wl = await db.get(`wl_${interaction.guild.id}`)

      if (!wl.includes(interaction.user.id)) return interaction.reply("Tu n'es pas whitelist !")

      const conduct_date = config.date_expiration;

      const countDown = countDownDateAndTime(conduct_date);
      const subcommand = interaction.options.getSubcommand();

      expire = await isExpired();

      if (subcommand === "timeleft") {
        botavatar = client.user.displayAvatarURL();
        tleftembed = new EmbedBuilder()
        .setTitle(`Temps restant de ${client.user.username}`)
        .setDescription(`${countDown.days} Jours(s), ${countDown.hours} Heure(s), ${countDown.minutes} Minute(s) restant(s)`)
        .setThumbnail(botavatar)
        .setFooter({ text: `Expired : ${expire}`})     
        interaction.reply({embeds: [tleftembed]});
      }

      if (subcommand === "info") {
        botavatar = client.user.displayAvatarURL();
        const roles = interaction.guild.members.me.roles.cache.map(role => role.name);
        tleftembed = new EmbedBuilder()
        .setTitle(`Information à propos de ${client.user.username}`)
        .setDescription(`Pseudo : \`${client.user.username}\`\nID : \`${client.user.id}\`\nOwner : \`<@${config.ownerid}>\``)
        .setThumbnail(botavatar)
        .setFooter({ text: `EliteBots`})
        rolebot = ""
        for (role of roles) {
          rolebot += `${role}, `
        }
        tleftembed.addFields({ name: "Roles", value: rolebot})  
        interaction.reply({embeds: [tleftembed]});
      }
    },

    data: new SlashCommandBuilder()
          .setName("bot")
          .setDescription("Commandes du bot")
          .addSubcommand((subcommand) => 
          subcommand
          .setName("timeleft")
          .setDescription("Temps restant du bot"))
          .addSubcommand((subcommand) => 
          subcommand
          .setName("info")
          .setDescription("Afficher les informations à propos du bot"))
}