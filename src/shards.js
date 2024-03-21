const { ShardingManager } = require("discord.js")
const colors = require("colors");
require("dotenv").config()

console.clear()

const manager = new ShardingManager("./src/index.js", {
    token: process.env.BOT_TOKEN,
    execArgv: process.execArgv
})

manager.spawn()

manager.on('shardCreate', shard => {
    console.log("✔".green, `Shard ${shard.id} iniciado!`)
})