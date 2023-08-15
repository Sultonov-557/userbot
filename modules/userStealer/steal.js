const telegram = require("telegram");
const moduleManager = require("../../managers/moduleManager.js");
const fs = require("fs");

/**
 * @param {telegram.TelegramClient} client
 */

module.exports["start"] = async (client) => {
	setInterval(async () => {
		const list = JSON.parse(
			await fs.readFileSync(__dirname + "/list.json", "utf-8")
		);
	}, 5000);
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["adduser"] = async (client, msg, arg) => {
	const username = arg.split(" ")[0];
	let id = arg.split(" ")[1];
	const list = JSON.parse(
		await fs.readFileSync(__dirname + "/list.json", "utf-8")
	);

	const dials = await client.getDialogs();
	for (i in dials) {
		if (dials[i].entity.username == id) {
			id = dials[i].id;
		}
	}

	list.push({ id, username });
	await fs.writeFileSync(
		__dirname + "/list.json",
		JSON.stringify(list, null, 4)
	);
	msg.edit("username qoshildi");
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 */

module.exports["id"] = async (client, msg) => {
	msg.edit({ text: "id: " + msg.chat.id });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 */

module.exports["userlist"] = async (client, msg) => {
	const list = JSON.parse(
		await fs.readFileSync(__dirname + "/list.json", "utf-8")
	);

	if (list.length == 0) {
		msg.edit({ text: "hali username qoshilmagan" });
	} else {
		let out = "usernamelar:\n";
		for (i in list) {
			out += list.username + "\n";
		}
		msg.edit({ text: out });
	}
};
