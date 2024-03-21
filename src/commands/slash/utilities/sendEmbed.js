const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendembed')
		.setDescription('Envia a embed do comando')
		.setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.ADMINISTRATOR),

	async execute(client, interaction) {
        const guild =  await client.guilds.fetch(interaction.guildId)
        const channel = await guild.channels.fetch(interaction.channelId)

		const embed = new EmbedBuilder()
            .setTitle('Funções - KL4')
            .setDescription(`Aqui estão algumas funções que você pode escolher para ter acesso no servidor, para escolher basta utilizar o meno abaixo!`)
            .addFields(
                {
                    name: "• Premier Pro",
                    value: "↳ <@&1220448036585476207>",
                    inline: false
                },
                {
                    name: "• Photoshop",
                    value: "↳ <@&1220448036153720904>",
                    inline: false
                },
                {
                    name: "• Illustrator",
                    value: "↳ <@&1220448034320679023>",
                    inline: false
                },
                {
                    name: "• After effects",
                    value: "↳ <@&1220448033582481499>",
                    inline: false
                },
                {
                    name: "• Moho",
                    value: "↳ <@&1220448035931160726>",
                    inline: false
                },
                {
                    name: "• Blender",
                    value: "↳ <@&1220448033431621702>",
                    inline: false
                },
                {
                    name: "• Ableton",
                    value: "↳ <@&1220448030910578790>",
                    inline: false
                },
                {
                    name: "• Unreal",
                    value: "↳ <@&1220448029660811355>",
                    inline: false
                },
                {
                    name: "• Nuke",
                    value: "↳ <@&1220448030897999983>",
                    inline: false
                },
                {
                    name: "• Davinci",
                    value: "↳ <@&1220448027689353246>",
                    inline: false
                },
                {
                    name: "• Avid",
                    value: "↳ <@&1220448028712763552>",
                    inline: false
                },
                {
                    name: "• VS Code",
                    value: "↳ <@&1220448032261406820>",
                    inline: false
                },
            )
            .setColor(client.themes.default)
            .setThumbnail("https://media.discordapp.net/attachments/1217601859062202399/1217602077166014585/icon_KL4.webp?ex=660dd9cd&is=65fb64cd&hm=36eb2d572226224de47d291a41124a1a39012066a300a7fef861c94928f08662&=&format=webp")
            .setFooter({text: `Atenciosamente, Equipe KL4.`, iconURL: client.user.displayAvatarURL({ dynamic: true })})

        const rolesSelect = new StringSelectMenuBuilder()
            .setCustomId("autorole_selectMenu")
            .setPlaceholder("Escolha suas funções")
            .setMaxValues(9)
            .setMinValues(1)
            .addOptions(
                {
                    label: "Premier Pro",
                    value: "1220448036585476207",
                },
                {
                    label: "Photoshop",
                    value: "1220448036153720904",
                },
                {
                    label: "Illustrator",
                    value: "1220448034320679023",
                },
                {
                    label: "After effects",
                    value: "1220448033582481499",
                },
                {
                    label: "Moho",
                    value: "1220448035931160726",
                },
                {
                    label: "Blender",
                    value: "1220448033431621702",
                },
                {
                    label: "Ableton",
                    value: "1220448030910578790",
                },
                {
                    label: "Unreal",
                    value: "1220448029660811355",
                },
                {
                    label: "Nuke",
                    value: "1220448030897999983",
                },
                {
                    label: "Davinci",
                    value: "1220448027689353246",
                },
                {
                    label: "Avid",
                    value: "1220448028712763552",
                },
                {
                    label: "VS Code",
                    value: "1220448032261406820",
                },
            )

        const row = new ActionRowBuilder()
            .addComponents(
                rolesSelect
            )

        await channel.send({ embeds: [embed], components: [row], fetchReply: true})

        return await interaction.reply({content: "ok", ephemeral: true});
	},
};