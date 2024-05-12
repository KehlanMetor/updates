const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Bot } = require('../../index')

/**
 * @param {Bot} client 
 */

module.exports = async (ban, client) => {
    let action = await ban.guild.fetchAuditLogs({ limit: 1, type: 22 }).then(async (audit) => audit.entries.first());
    let executor = action.executor

    ison = await db.get(`antiban_${ban.guild.id}`)
    wl = await db.get(`wl_${ban.guild.id}`);
    if (ison === "off") return;
    if (wl.includes(executor.id)) return;
    if (executor.id == client.user.id) return;

    ban.guild.members.unban(ban.user.id);
    console.log(`J'ai debanni ${ban.user.username}, banni par ${executor.username} car il y avait antiban`)
}