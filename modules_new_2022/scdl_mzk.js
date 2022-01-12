/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "scdl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link Soundcloud",
    commandCategory: "Phương tiện",
    usages: "[link nhạc]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": ""
    },
    envConfig: {
        API_KEY: "mzkFree_722124509AC10" //Nhập API_Key của bạn ở đây hoặc file config.json
    }
};
var randomPath = Math.floor(Math.random() * 999999999999);
module.exports.run = async function({ event: e, api: a, args: n }) {
    const { threadID: t, messageID: s } = e, i = require("axios"), { createReadStream: r, existsSync: c, writeFileSync: l, readdirSync: d, unlinkSync: o } = require("fs-extra"), { downloadFile: u } = global.utils, { API_KEY: g } = global.configModule[this.config.name];
    if (!n[0]) return a.sendMessage("Bạn phải làm nhập url video FB !", t, s);
    a.sendMessage("Đang tải, vui lòng đợi...", t, ((e, n) => setTimeout((() => { a.unsendMessage(n.messageID) }), 2e4)));
    const h = n.join(" ").trim();
    try {
        let { data: e } = await i.get(`https://manhict.tech/scdl?link=${h}&apikey=${g}`);
        if (e.error) return a.sendMessage(e.error, t);
        let n = e.title,
            c = e.link;
        var m = __dirname + `/cache/${randomPath}.mp3`;
        await u(c, m);
        return await a.sendMessage({ body: n, attachment: r(m) }, t, (() => o(m)), s)
    } catch (e) { return a.sendMessage("Không thể xử lý yêu cầu của bạn!!!", t, s) }
};