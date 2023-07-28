const telegram = require("telegram");
/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.client.message} msg
 */

module.exports = async function (client, msg, arg) {
    text = "";
    for (i in arg) {
        text += arg[i];
        if (arg[i] == " ") {
            continue;
        }
        await client.editMessage(msg.chatId, { text: text, message: msg.id });
    }
};
