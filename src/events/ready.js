const { ActivityType, Events } = require("discord.js");
const slashCommandsHandler = require("../functions/slashHandler")

module.exports = {
    name: Events.ClientReady,

    async execute(client) {              
        slashCommandsHandler(client)
        
        let activities = [
            `Prefixo padrão "${process.env.BOT_PREFIX}"`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} membros! 👤`,
        ];
        
        let i = 0;
        
        setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: ActivityType.Streaming,}), 1000 * 15 );
        
        client.user.setStatus("online");
    },
};