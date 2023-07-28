const telegram = require("telegram");
const moduleManager = require("../../managers/moduleManager.js");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 */

module.exports = async function (client, msg) {
    const modules = await moduleManager.getModules();
    let moduleList = "";
    for (i in modules) {
        moduleList +=
            modules[i].info.name +
            ":\n" +
            "   " +
            modules[i].info.description +
            "\n   usage: " +
            modules[i].info.trigger +
            "\n";
    }
    let out = "modules:\n" + moduleList;

    await client.editMessage(msg.chatId, {
        message: msg.id,
        text: out,
    });
};
