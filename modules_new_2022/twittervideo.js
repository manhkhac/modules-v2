module.exports.config = {
    name: "twittervideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link twitter",
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
module.exports.run = async function({ event: e, api: t, args: n }) {
    const { threadID: a, messageID: s } = e, r = require("axios"), i = require("fs-extra"), { API_KEY: c } = global.configModule[this.config.name];
    if (!n[0]) return t.sendMessage("Bạn phải nhập url video IG !", a, s);
    t.sendMessage("Đang tải, vui lòng đợi...", a, ((e, n) => setTimeout((() => { t.unsendMessage(n.messageID) }), 2e4)));
    const o = n.join(" ").trim();
    try {
        let { data: e } = await r.get(`https://manhict.tech/twitter/?link=${o}&apikey=${c}`);
        if (e.error) return t.sendMessage(e.error, a);
        let n = e.desc,
            g = e.HD;
        var u = __dirname + `/cache/${rdPath}.mp4`;
        const d = (await r.get(g, { responseType: "arraybuffer" })).data;
        return i.writeFileSync(u, Buffer.from(d, "utf-8")), i.statSync(u).size > 104e6 ? t.sendMessage("File cannot be sent because it is larger than 100MB.", a, (() => unlinkSync(u)), s) : t.sendMessage({ body: `Followers: ${n}`, attachment: i.createReadStream(u) }, a, (() => i.unlinkSync(u)), s)
    } catch (e) { return t.sendMessage("Không thể xử lý yêu cầu của bạn!!!", a, s) }
};