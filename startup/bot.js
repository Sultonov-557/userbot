const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

module.exports = async function startBot(session, apiID, apiHash) {
	const client = new TelegramClient(new StringSession(session), apiID, apiHash, {
		deviceModel: "Windows",
		systemVersion: "10.0.22621",
		appVersion: "4.8.7",
	});
	client.logger.setLevel("none");
	await client.connect();
	await client.start();
	console.log("client started");
	return client;
};
