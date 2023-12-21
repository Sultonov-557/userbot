const telegram = require("telegram");
const moduleManager = require("../../managers/moduleManager.js");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 */

module.exports["list"] = async (client, msg) => {
	const modules = await moduleManager.getModules();
	let moduleList = "";
	for (i in modules) {
		let triggers = modules[i].info.triggers;
		let uses = "";
		for (let j in triggers) {
			uses += triggers[j];
		}
		moduleList += modules[i].info.name + ":\n" + "   " + modules[i].info.description + "\n   usages: " + uses + "\n";
	}
	let out = "modules:\n" + moduleList;

	await client.editMessage(msg.chatId, {
		message: msg.id,
		text: out,
	});
};
