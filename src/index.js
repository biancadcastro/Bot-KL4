const { GatewayIntentBits } = require("discord.js")
const fs = require("fs")
require("colors")

const Bot = require("./classes/client")

const client = new Bot(
        { intents: 
            [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.MessageContent, 
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildMembers,
            ]
        }
    )

module.exports = client

const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    try {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }        
    } catch (e) {
    
        console.log(
            `O evento`.red, `"${file}"`.white, `possuiu um erro durante seu carregamento!`.red
        );
    }
}

client.login(process.env.BOT_TOKEN);