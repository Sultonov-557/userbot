const telegram = require("telegram");
const qrcode = require("qrcode");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports["qrcode"] = async (client, msg, arg) => {
  const image = await qrcode.toBuffer(arg, { type: "png" });
  image.name = "qrcode.png";
  client.sendFile(msg.chatId, { file: image });
  msg.delete();
};
