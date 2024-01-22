const telegram = require("telegram");
/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports["ban"] = async (client, msg, arg) => {
  const chatID = msg.chat.id;
  const replyID = (await client.getMessages(chatID, { ids: msg.replyTo.replyToMsgId }))[0].sender.id;
  await client.invoke(
    new telegram.Api.channels.EditBanned({
      channel: chatID,
      participant: replyID,
      bannedRights: new telegram.Api.ChatBannedRights({
        viewMessages: false,
      }),
    })
  );
  msg.edit({ text: "banned" });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["unban"] = async (client, msg, arg) => {
  const chatID = msg.chat.id;
  const replyID = (await client.getMessages(chatID, { ids: msg.replyTo.replyToMsgId }))[0].sender.id;
  await client.invoke(
    new telegram.Api.channels.EditBanned({
      channel: chatID,
      participant: replyID,
      bannedRights: new telegram.Api.ChatBannedRights({
        viewMessages: true,
      }),
    })
  );
  msg.edit({ text: "banned" });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["mute"] = async (client, msg, arg) => {
  const chatID = msg.chat.id;
  const replyID = (await client.getMessages(chatID, { ids: msg.replyTo.replyToMsgId }))[0].sender.id;
  client.invoke(
    new telegram.Api.channels.EditBanned({
      channel: chatID,
      participant: replyID,
      bannedRights: new telegram.Api.ChatBannedRights({
        sendMessages: false,
      }),
    })
  );
  msg.edit({ text: "muted" });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["unmute"] = async (client, msg, arg) => {
  const chatID = msg.chat.id;
  const replyID = (await client.getMessages(chatID, { ids: msg.replyTo.replyToMsgId }))[0].sender.id;
  await client.invoke(
    new telegram.Api.channels.EditBanned({
      channel: chatID,
      participant: replyID,
      bannedRights: new telegram.Api.ChatBannedRights({
        sendMessages: false,
      }),
    })
  );
  msg.edit({ text: "unmuted" });
};
