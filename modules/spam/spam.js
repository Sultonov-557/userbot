const telegram = require("telegram");
/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.client.message} msg
 * @param {string} arg
 */

module.exports["spam"] = async (client, msg, arg) => {
    const count = arg.split(" ", 1)[0];
    const text = arg.split(" ", 1)[1];
    for (let i = 0; i < count; i++) {
        client.sendMessage(msg,{message:text});
    }
};
