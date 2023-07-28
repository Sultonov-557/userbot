const telegram = require("telegram");
const http = require("https");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports = async function (client, msg, arg) {
    http.get("https://api.mcsrvstat.us/2/" + arg, (res) => {
        str = "";
        res.on("data", (data) => {
            str += data;
        });
        res.on("end", () => {
            data = JSON.parse(str);
            if (data.online) {
                motd = "";
                list = "";
                for (i in data.motd.clean) {
                    motd += data.motd.clean[i] + "\n";
                }
                for (i in data.players.list) {
                    list += data.players.list[i] + " \n";
                }
                let bular = "";
                if (data.players.list != undefined) {
                    bular = `list of players: \n${data.players.list}`;
                }
                text = `Ip: ${data.ip}:${data.port}\nHostname: ${data.hostname}\nMotd:\n${data.motd.clean}\nVersion: ${data.protocol_name}\nProtocol: ${data.protocol}\nPlayers: ${data.players.online}/${data.players.max} \n${bular}`;
                client.editMessage(msg.chatId, {
                    text: text,
                    message: msg.id,
                });
            } else {
                client.editMessage(msg.chatId, {
                    text: "Server not found",
                    message: msg.id,
                });
            }
        });
    });
};
