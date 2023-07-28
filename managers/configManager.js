const fs = require("fs");

module.exports = async function getConfig() {
    let out = await fs.readFileSync("./config/config.json", (err, file) => {
        if (err) {
            throw err;
        }
        out = JSON.parse(file);
        return JSON.parse(file);
    });
    return out;
};
