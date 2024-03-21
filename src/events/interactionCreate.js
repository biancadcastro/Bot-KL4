const { Events } = require("discord.js");
const { categorysAutoRole } = require("../functions/autoroles/categorys");

module.exports = {

    name: Events.InteractionCreate,

    async execute(client, interaction) {
        //contextMenus
        if (interaction.isUserContextMenuCommand()) {
            const { commandName } = interaction

            const contextMenu = client.contextMenus.get(commandName)

            if (contextMenu) await contextMenu.execute(client, interaction).catch(err => console.log(err))
        }

        //botões
        if (interaction.isButton()) {
            if (interaction.customId == "delete_bot_message") return interaction.message.delete().catch(err => console.log(err))

            if (interaction.customId == "cancel_command" || interaction.customId == "delete_message") return interaction.message.delete().catch(() => null)            
        }

        //mensagem
        if (interaction.isChatInputCommand()) {
            const { commandName } = interaction

            const command = client.slashCommands.get(commandName)

            if (command) await command.execute(client, interaction).catch(err => console.log(err))
            
            return setTimeout(() => {
                interaction.deleteReply().catch(() => null)
            }, 1000 * 60 * 10)
        }

        if (interaction.isSelectMenu()) {
            console.log(interaction.customId)
            if (interaction.customId == "autorole_selectMenu") return categorysAutoRole(client, interaction)
        }
    },
};