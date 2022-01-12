/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "fbvideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video/ story thông qua link Facebook",
    commandCategory: "Phương tiện",
    usages: "[link video/ story]",
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
module.exports.run = async function({
    event: e,
    api: a,
    args: t
}) {
    const {
        threadID: n,
        messageID: s
    } = e, r = require("axios"), i = require("fs-extra"), {
        API_KEY: u
    } = global.configModule[this.config.name];
    if (!t[0]) return a.sendMessage("Bạn phải nhập url video FB !", n, s);
    a.sendMessage("Đang tải, vui lòng đợi...", n, ((e, t) => setTimeout((() => {
        a.unsendMessage(t.messageID)
    }), 2e4)));
    const c = t.join(" ").trim();
    try {
        let {
            data: e
        } = await r.get(`https://manhict.tech/fbvideo/v2?url=${c}&apikey=${u}`);
        if (e.error) return a.sendMessage(e.error, n);
        let t = e.data.title,
            o = e.data.medias[1].url;
        var d = __dirname + `/cache/${rdPath}.mp4`;
        const g = (await r.get(o, {
            responseType: "arraybuffer"
        })).data;
        return i.writeFileSync(d, Buffer.from(g, "utf-8")), i.statSync(d).size > 104e6 ? a.sendMessage("File cannot be sent because it is larger than 100MB.", n, (() => unlinkSync(d)), s) : a.sendMessage({
            body: t,
            attachment: i.createReadStream(d)
        }, n, (() => i.unlinkSync(d)), s)
    } catch (e) {
        return a.sendMessage("Không thể xử lý yêu cầu của bạn!!!", n, s)
    }
};