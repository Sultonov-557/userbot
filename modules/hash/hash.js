const telegram = require("telegram");
const crypto = require("node:crypto");
const config = require("../../config/config.json");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["hash"] = async (client, msg, arg) => {
  const hashed = encryptString(arg);
  msg.edit({ text: hashed });
};

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */
module.exports["unhash"] = async (client, msg, arg) => {
  try {
    const unhashed = decryptString(arg);
    msg.edit({ text: unhashed });
  } catch {
    msg.edit({ text: "failed to unhash" });
  }
};

const ENCRYPTION_KEY = config.secret;
const IV_LENGTH = 16;

function encryptString(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
}

function decryptString(text) {
  const iv = Buffer.from(text.slice(0, IV_LENGTH * 2), "hex");
  const encryptedText = text.slice(IV_LENGTH * 2);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
