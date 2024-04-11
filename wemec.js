const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("wemec")
        .setDescription("we mec"),

  run: async ({ interaction }) => {
    interaction.reply("we c trop ouf")
  }
}
