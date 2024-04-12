const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType,
 } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
          .setName('help')
          .setDescription("affiche le menu d'aide"),
    
    run: async ({ interaction }) => {     
        wl = await db.get(`wl_${interaction.guild.id}`)

        if (!wl.includes(interaction.user.id)) return interaction.reply("Tu n'es pas whitelist !")  
        const moderation1 = new EmbedBuilder()
          .setImage('attachment://moderation.png')
          .setFooter({ text: "EliteBots" })

        const utilitaire1 = new EmbedBuilder()
          .setImage('attachment://utilitaire1.png')

        const utilitaire2 = new EmbedBuilder()
          .setImage('attachment://utilitaire2.png')
          .setFooter({ text: "EliteBots" })
        
        const antiraid1 = new EmbedBuilder()
          .setImage('attachment://antiraid.png')
          .setFooter({ text: "EliteBots" })

        const logs1 = new EmbedBuilder()
          .setImage('attachment://config.png')
          .setFooter({ text: "EliteBots" })

        const backup1 = new EmbedBuilder()
          .setTitle('Menu backup')
          .setFooter({ text: "EliteBots" })

        const fun1 = new EmbedBuilder()
          .setImage('attachment://fun.png')
          .setFooter({ text: "EliteBots" })

        const giveaway1 = new EmbedBuilder()
          .setImage('attachment://giveaway.png')
          .setFooter({ text: "EliteBots" })



        const pages = [
            {
                label: 'Moderation',
                description: 'Commandes de moderation',
                value: 'mod',
                emoji: '🔨'
            },
            {
                label: 'Utilitaire',
                description: "Commandes d'utilitaire",
                value: 'util',
                emoji: '📗'
            },
            {
                label: 'Fun',
                description: "Commandes Fun",
                value: 'fun',
                emoji: '🎮'
            },
            {
                label: 'Giveaway',
                description: "Commandes Giveaway",
                value: 'gw',
                emoji: '🎉'
            },
            {
                label: 'Antiraid',
                description: "Commandes d'antiraid",
                value: 'antiraid',
                emoji: '🛡️'
            },
            {
                label: 'Logs',
                description: "Commandes de logs",
                value: 'logs',
                emoji: '⚠️'
            },
            {
                label: 'Backup',
                description: "Commandes de backup",
                value: 'backup',
                emoji: '💾'
            },
        ]

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setPlaceholder('Fait un choix...')
            .setMinValues(0)
            .setMaxValues(1)
            .addOptions(
                pages.map((page) => 
                  new StringSelectMenuOptionBuilder()
                  .setLabel(page.label)
                  .setDescription(page.description)
                  .setValue(page.value)
                  .setEmoji(page.emoji)
                )
            )

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        embedcollect = new EmbedBuilder()
        .setTitle("help")
        .setImage('attachment://elitebotslogo.mp4')

        const reply = await interaction.reply({ embeds: [embedcollect], files: ['./img/elitebotslogo.mp4'], components: [actionRow] });

        const collector = reply.createMessageComponentCollector({
            ComponentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60_000,
        })

        collector.on('collect', async (interaction) => {
            if (interaction.values.includes('mod')) {
                await interaction.update({ embeds: [moderation1], files: ['./img/moderation.png'] });
            } else if (interaction.values.includes('util')) {
                await interaction.update({ embeds: [utilitaire1, utilitaire2], files: ['./img/utilitaire1.png','./img/utilitaire2.png'] });
            } else if (interaction.values.includes('fun')) {
                await interaction.update({ embeds: [fun1], files: ['./img/fun.png'] });
            } else if (interaction.values.includes('gw')) {
                await interaction.update({ embeds: [giveaway1], files: ['./img/giveaway.png'] });
            } else if (interaction.values.includes('antiraid')) {
                await interaction.update({ embeds: [antiraid1], files: ['./img/antiraid.png'] });
            } else if (interaction.values.includes('logs')) {
                await interaction.update({ embeds: [logs1], files: ['./img/config.png'] });
            } else if (interaction.values.includes('backup')) {
                await interaction.update({ embeds: [backup1], files: [] });
            }
        })
    }
}