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
		let out = `┊   ├ id: ${user.id}
  ┊   ├ first_name: ${user.firstName}
  ┊   ├ username: @${user.username || user.usernames}
  ┊   ├ is_premium: ${user.premium}
  └ Secret documents: Enter the password to enter`;
		client.sendMessage(msg.chatId, { message: out });
	}
};
