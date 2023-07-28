const { TelegramClient } = require("telegram");
const { NewMessage } = require("telegram/events");
const moduleLoader = require("./moduleManager.js");

/**
 * @param {moduleLoader.Module[]} modules
 * @param {TelegramClient} client
 */

module.exports = async function (modules, client) {
    const me = await client.getMe();
    for (i in modules) {
        const module = modules[i];
        console.log("loading events of " + module.info.name);
        client.addEventHandler((ev) => {
            const txt = ev.message.text;
            const msg = ev.message;
            if (ev.message.senderId.equals(me.id)) {
                if (txt.indexOf(module.info.trigger) == 0) {
                    if (module.info.needArg) {
                        let arg = txt.split(" ");
                        arg.splice(0, 1);
                        arg = arg.join(" ");
                        module.main(client, msg, arg);
                    } else {
                        module.main(client, msg);
                    }
                }
            }
        }, new NewMessage());
    }
    console.log("events loaded");
};
