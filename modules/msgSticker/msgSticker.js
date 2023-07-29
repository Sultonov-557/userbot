const telegram = require("telegram");
const moduleManager = require("../../managers/moduleManager.js");
const Canvas = require("canvas");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 */

module.exports["stickmsg"] = async (client, msg) => {
    if (msg.isReply) {
        const canvas = new Canvas.Canvas(900, 300, "image");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#161616";
        ctx.fillRect(0, 0, 900, 300);
        ctx.fillStyle = "#ffffff";
        const { drawMsg } = client.getMessages(msg.chatId, { ids: [msg.id] });
        ctx.fillText(drawMsg.text, 100, 30, 900);
    }
};
