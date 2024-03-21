const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('🌻 Utilidades ▹ Informa o ping do bot')
		.setDMPermission(false),

	async execute(client, interaction) {
		function emojiFormat(ms) {
			if (!ms) return "🔴 Offline"
			if (ms > 800) return `🟤 ${ms}ms`

			return ms < 250
				? `🟢 ${ms}ms`
				: `🟠 ${ms}ms`
		}

		let toSubtract = Date.now()

		const mainPingEmbed = new EmbedBuilder()
			.setColor(client.themes.default)
			.setTitle("Pong! <:JakePong:871225286388240394>")
			.setDescription("Aqui está o ping do Jake!")
			.addFields(
				{
					name: "<:JakeShards:964563863762776155> Shard",
					value: `↳ ${client.shard.ids[0] + 1}/${client.shard.count || 0}`,
					inline: true
				},
				{
					name: "<:JakeRaio:1063003526533488702> Bot ping",
					value: `↳ ${emojiFormat(client.ws.ping)}`,
					inline: true
				}
			)
			.setThumbnail("https://cdn.jakebot.com.br/default/icons/relampago.png")
			.setFooter({ text: `${interaction.user.username} ás ${client.timezone.format("hh:mm a")}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })

		const mainReply = await interaction.reply({ embeds: [mainPingEmbed], fetchReply: true })

		return setTimeout(() => {
			interaction.deleteReply().catch(() => null)
		}, 1000 * 60 * 2)
	},
};