const { TelegramClient } = require("telegram");
const { NewMessage } = require("telegram/events");
const moduleLoader = require("./moduleManager.js");

/**
 * @param {moduleLoader.Module[]} modules
 * @param {TelegramClient} client
 */

module.exports = async function (modules, client) {
	const me = await client.getMe();
	for (i in modules) {
		const module = modules[i];
		const triggers = module.info.triggers;
		console.log("loading events of " + module.info.name);

		client.addEventHandler((ev) => {
			const txt = ev.message.text;
			const msg = ev.message;
			for (j in triggers) {
				if (!ev.isChannel) {
					if (
						ev.message.senderId.toJSNumber() == me.id.toJSNumber()
					) {
						if (txt.indexOf(j) == 0) {
							if (module.info.needArg) {
								let arg = txt.split(" ");
								arg.splice(0, 1);
								arg = arg.join(" ");
								console.log(arg);
								module.main[triggers[j]](client, msg, arg);
							} else {
								module.main[triggers[j]](client, msg);
							}
						}
					}
				}
			}
		}, new NewMessage());
		const starter = module.main[module.start];
		if (starter != undefined) {
			starter(client);
		}
	}
	console.log("events loaded");
};
