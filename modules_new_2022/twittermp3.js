module.exports.config = {
    name: "twittermp3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Tải nhạc thông qua link twitter",
    commandCategory: "Phương tiện",
    usages: "[link Videos]",
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
var rdPath = Math.floor(Math.random() * 99999999999);
module.exports.run = async function({ event: e, api: t, args: a }) {
    const { threadID: n, messageID: s } = e, r = require("axios"), i = require("fs-extra"), { API_KEY: c } = global.configModule[this.config.name];
    if (!a[0]) return t.sendMessage("Bạn phải nhập url video IG !", n, s);
    t.sendMessage("Đang tải, vui lòng đợi...", n, ((e, a) => setTimeout((() => { t.unsendMessage(a.messageID) }), 2e4)));
    const o = a.join(" ").trim();
    try {
        let { data: e } = await r.get(`https://manhict.tech/twitter/?link=${o}&apikey=${c}`);
        if (e.error) return t.sendMessage(e.error, n);
        let a = e.desc,
            d = e.audio;
        var u = __dirname + `/cache/${rdPath}.m4a`;
        const g = (await r.get(d, { responseType: "arraybuffer" })).data;
        return i.writeFileSync(u, Buffer.from(g, "utf-8")), i.statSync(u).size > 104e6 ? t.sendMessage("File cannot be sent because it is larger than 100MB.", n, (() => unlinkSync(u)), s) : t.sendMessage({ body: `Followers: ${a}`, attachment: i.createReadStream(u) }, n, (() => i.unlinkSync(u)), s)
    } catch (e) { return t.sendMessage("Không thể xử lý yêu cầu của bạn!!!", n, s) }
};