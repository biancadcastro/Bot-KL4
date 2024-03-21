const { MessageEmbed, Permissions, EmbedBuilder } = require('discord.js');

module.exports = {

    name: 'messageCreate',

    async execute( client, message ) {
        if (message.author.id === client.user.id) {
            return;
        }
    },
};