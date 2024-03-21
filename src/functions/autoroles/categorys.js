async function categorysAutoRole(client, interaction) {
    const rolesArray = interaction.values

    await interaction.member.roles.add(rolesArray).catch(err => {
        return interaction.reply({ content: "Houve um erro ao adicionar os cargos selecionados", ephemeral: true })
    })

    return interaction.reply({ content: "Cargos adicionados com sucesso!", ephemeral: true })
}

module.exports = { categorysAutoRole }