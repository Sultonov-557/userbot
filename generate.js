const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const env = require("./managers/configManager.js");
const input = require("input");

const apiId = env.API_ID;
const apiHash = env.API_HASH;
const stringSession = new StringSession("");

(async () => {
	console.log("Loading interactive example...");
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.start({
		phoneNumber: async () => await input.text("Please enter your number: "),
		password: async () => await input.text("Please enter your password: "),
		phoneCode: async () => await input.text("Please enter the code you received: "),
		onError: (err) => console.log(err),
	});
	console.log("You should now be connected.");
	const token = client.session.save();
	await client.sendMessage("me", { message: token });
})();
