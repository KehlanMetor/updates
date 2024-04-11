const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("wemec")
        .setDescription("ouf mec"),

  run: async ({ interaction }) => {
    
  }
}
