const { MessageEmbed, Permissions, EmbedBuilder } = require('discord.js');

module.exports = {

    name: 'guildMemberAdd',

    async execute( client, event ) {
        const guild = client.guilds.cache.get(process.env.GUILD_ID)
        const welcomeChannel = guild.channels.cache.get(process.env.GUILD_WELCOME_CHANNEL_ID)

        const welcomeMessage = await welcomeChannel.send({content: `<a:bem_vindo:1220457955254861824> <@${event.user.id}> Seja bem vindo(a) a KL4! De uma passadinha em <#1215054448532004864> para saber as diretrizes, depois em <#1215056956688171079> para pegar suas tags e se divirta!`, fetchReply: true})

        const member = guild.members.cache.get(event.user.id)

        member.roles.add([`${process.env.GUILD_MEMBER_ROLE_ID}`])

        return setTimeout(() => {
            welcomeMessage.delete().catch(() => null)
        }, 1000 * 60 * 2)
    },
};