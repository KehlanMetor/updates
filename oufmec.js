const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("oufmec")
        .setDescription("ouf mec"),

  run: async ({ interaction }) => {
    interaction.reply("we c ouf")
  }
}
