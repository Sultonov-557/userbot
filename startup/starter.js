const startBot = require("./bot.js");
const env = require("../managers/configManager.js");
const moduleLoader = require("../managers/moduleManager.js");
const eventLoader = require("../managers/eventManager.js");

module.exports = async function (date) {
	console.log("config loaded");
	console.log("client starting");
	const client = await startBot(env.SESSION, env.API_ID, env.API_HASH);
	console.log("loading modules");
	const modules = await moduleLoader.load();
	console.log("loading events");
	await eventLoader(modules, client);
	console.log("started in " + (Date.now() - date) / 1000) + " seconds";
};
