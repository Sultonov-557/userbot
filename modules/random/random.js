const telegram = require("telegram");
const faker = require("@faker-js/faker").faker;

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rnumber"] = async (client, msg, arg) => {
  msg.edit({ text: faker.finance.routingNumber() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rname"] = async (client, msg, arg) => {
  msg.edit({ text: faker.person.firstName() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rfullname"] = async (client, msg, arg) => {
  msg.edit({ text: faker.person.fullName() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["ranimal"] = async (client, msg, arg) => {
  msg.edit({ text: faker.animal.type() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rcolor"] = async (client, msg, arg) => {
  msg.edit({ text: faker.color.human() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rtime"] = async (client, msg, arg) => {
  msg.edit({ text: faker.date.anytime() });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["ravatar"] = async (client, msg, arg) => {
  await client.sendFile(msg.chatId, { file: faker.image.avatarLegacy() });
  msg.delete();
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["rimage"] = async (client, msg, arg) => {
  await client.sendFile(msg.chatId, { file: faker.image.urlPicsumPhotos() });
  msg.delete();
};
