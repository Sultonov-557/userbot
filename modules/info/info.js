const telegram = require("telegram");
const moduleManager = require("../../managers/moduleManager.js");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports["info"] = async (client, msg, arg) => {
	if (msg.isReply) {
		const msg_ = await msg.getReplyMessage();
		const user = msg_.sender;
		msg.delete();
		let out = `ID: ${user.id}
First_name: ${user.firstName}
Last_name: ${user.lastName}
Username: @${user.username || user.usernames}
Phone: ${user.phone}
Premium: ${user.premium}
Bot: ${user.bot}
Contact: ${user.contact}
Deleted: ${user.deleted}
Status: ${user.status.className}
Language: ${user.langCode}
Friend: ${user.closeFriend}`;
		client.sendMessage(msg.chatId, { message: out });
	}
};
