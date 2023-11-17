const { Api, TelegramClient } = require("telegram");
const lisa = require("../../lisa/src/index");

/**
 * @param {string} text
 * @param {Api.Message} msg
 * @param {TelegramClient} client
 */
function analize(text, msg, client) {
	const classifications = lisa.ask(text);
	const classification = classifications[0];
	console.log(`${classification.label} "${text}"`);
}

module.exports = { analize };
