const { Routes } = require('discord.js')
const { REST } = require("@discordjs/rest")
const { readdirSync } = require('fs')
require('dotenv/config')

module.exports = async (client) => {
    const commands = []
    const adminCommands = []
    const folders = readdirSync('./src/commands/slash/')

    for (let dir of folders) {
        const commandsData = readdirSync(`./src/commands/slash/${dir}/`).filter(file => file.endsWith('.js'))

        for await (let file of commandsData) {

            const command = require(`../commands/slash/${dir}/${file}`)

            if (command && command.data.name) {
                if (command.help) {
                    client.slashCommandsHelpData.push({
                        name: command.data.name,
                        category: command.help?.category || "Não possui",
                        description: command.help?.description || "Não possui",
                        shortDescription: command.help?.shortDescription || "Não possui",
                        embedFields: command.help?.embedFields
                    });
                }
                client.slashCommands.set(command.data.name, command);
                (command.help?.admin || command.help?.staff) ? adminCommands.push(command.data) : commands.push(command.data);
                continue
            }
        }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN)

    const guildsId = ["781683309528219699", "814906838940123157"]

    for (let guild of guildsId)
        if (client.guilds.cache.has(guild))
            rest.put(Routes.applicationGuildCommands(client.user.id, guild), { body: adminCommands })

    await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands },
    );

    console.log("✔".green, `${commands.length} Slash commands carregados com sucesso!`)
}