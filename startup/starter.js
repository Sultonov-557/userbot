const startBot = require("./bot.js");
const getConfig = require("../managers/configManager.js");
const moduleLoader = require("../managers/moduleManager.js");
const eventLoader = require("../managers/eventManager.js");

module.exports = async function (date) {
    const config = JSON.parse(await getConfig());
    console.log("config loaded");
    console.log("client starting");
    const client = await startBot(
        config.stringSession,
        config.apiID,
        config.apiHash
    );
    console.log("loading modules");
    const modules = await moduleLoader.load();
    console.log("loading events");
    await eventLoader(modules, client);
    console.log("started in " + (Date.now() - date) / 1000) + " seconds";
};
