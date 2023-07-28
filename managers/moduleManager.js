const fs = require("fs");

const modules = {};

class Module {
    constructor(info, main) {
        this.info = info;
        this.main = main;
    }
}
const load = async () => {
    const files = await fs.readdirSync("./modules");
    for (i in files) {
        console.log("loading module " + files[i]);
        if (await fs.existsSync("./modules/" + files[i] + "/info.json")) {
            const info = JSON.parse(
                await fs.readFileSync("./modules/" + files[i] + "/info.json")
            );
            if (
                await fs.existsSync("./modules/" + files[i] + "/" + info.main)
            ) {
                modules[info.name] = new Module(
                    info,
                    require("./modules/" + files[i] + "/" + info.main)
                );
                console.log(info.name + " loaded");
            } else {
                console.error(info.main + " in " + files[i] + " not found");
            }
        } else {
            console.error("info.json in " + files[i] + " not found");
        }
    }
    console.log("modules loaded");
    return modules;
};

const getModules = async () => {
    return modules;
};

module.exports["Module"] = Module;
module.exports["load"] = load;
module.exports["getModules"] = getModules;
