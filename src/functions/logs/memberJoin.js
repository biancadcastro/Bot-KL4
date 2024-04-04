const { EmbedBuilder } = require("discord.js")
const { format } = require("date-fns")

async function logMemberJoin(event, client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    const channel = guild.channels.cache.get(process.env.JOIN_LOG_CHANNEL)
    const user = client.users.cache.get(event.user.id)

    const newMemberEmbed = new EmbedBuilder()
        .setTitle('Nova entrada detectada!')
        .setDescription(`O usuário ${user.username} entrou no servidor!`)
        .setThumbnail(user.avatarURL({dynamic: true, size: 2048}))
        .addFields(
            {
                name: "<:cargos:1225565283692056610> Nome",
                value: `↳ \`${user.username}\``,
                inline: true
            },
            {
                name: "<:utilidades:1225565070172356708> ID",
                value: `↳ \`${user.id}\``,
                inline: true
            }
        )
        .setColor(client.themes.default)
        .setFooter({text: `Entrou dia ${format(new Date(), 'dd/MM/yyyy, HH:mm:ss')}`, iconURL: user.avatarURL({dynamic: true, size: 2048})})

    await channel.send({embeds: [newMemberEmbed]})
}

module.exports = logMemberJoin