module.exports.config = {
  name: "csluser",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ManhG",
  description: "Bật tắt console",
  commandCategory: "admin",
  depndencies: { "chalk": "" },
  usages: "",
  cooldowns: 2
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  const chalk = global.nodemodule["chalk"];
  if (event.senderID == global.data.botID) return;
    var nameUser = await Users.getNameUser(event.senderID);
    var names = chalk.yellow(nameUser);
    var body = event.body || "Là ảnh, video hoặc ký tự đặc biệt nào đó";
    var red = chalk.red("|");
    console.log(chalk.green("Tên: ") + names + red + body)
};

module.exports.run = async function ({ api, event, Threads, getText }) {
 
}
