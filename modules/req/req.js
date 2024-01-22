const telegram = require("telegram");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports["req"] = async (client, msg, arg) => {
  console.log(arg);
  const method = arg.split(" ")[0];
  let url = arg.split(" ")[1];
  console.log(url);
  try {
    const req = await fetch(url, { method });
    let text = await req.text();
    text = splitString(text, 4096);
    for (let message of text) {
      await client.sendMessage(msg.chat.id, { message: "```" + message + "```" });
    }
  } catch (err) {
    console.log(err);
    msg.edit({ text: "request failed with: " + (err.errorMessage || err.message || err.code) });
  }
};

function splitString(str, limit) {
  const result = [];
  for (let i = 0; i < str.length; i += limit) {
    result.push(str.substring(i, i + limit));
  }
  return result;
}
