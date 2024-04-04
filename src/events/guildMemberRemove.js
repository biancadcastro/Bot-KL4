const logMemberRemove = require('../functions/logs/memberRemove');

module.exports = {

    name: 'guildMemberRemove',

    async execute( client, event ) {
        logMemberRemove(event, client)
    },
};