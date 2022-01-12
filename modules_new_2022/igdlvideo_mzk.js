/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "igdlvideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link Instagram",
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
module.exports.run = async function({
    event: e,
    api: s,
    args: a
}) {
    const {
        threadID: t,
        messageID: n
    } = e, r = require("axios"), i = require("fs-extra"), {
        API_KEY: o
    } = global.configModule[this.config.name];
    if (!a[0]) return s.sendMessage("Bạn phải nhập url video IG !", t, n);
    s.sendMessage("Đang tải, vui lòng đợi...", t, ((e, a) => setTimeout((() => {
        s.unsendMessage(a.messageID)
    }), 2e4)));
    const u = a.join(" ").trim();
    try {
        let {
            data: e
        } = await r.get(`https://manhict.tech/v1/igdl/video?url=${u}&apikey=${o}`);
        if (e.error) return s.sendMessage(e.error, t);
        let a = e.result.user.followers,
            c = e.result.medias[0].downloadUrl;
        var l = __dirname + `/cache/${rdPath}.mp4`;
        const d = (await r.get(c, {
            responseType: "arraybuffer"
        })).data;
        return i.writeFileSync(l, Buffer.from(d, "utf-8")), i.statSync(l).size > 104e6 ? s.sendMessage("File cannot be sent because it is larger than 100MB.", t, (() => unlinkSync(l)), n) : s.sendMessage({
            body: `Followers: ${a}`,
            attachment: i.createReadStream(l)
        }, t, (() => i.unlinkSync(l)), n)
    } catch (e) {
        return s.sendMessage("Không thể xử lý yêu cầu của bạn!!!", t, n)
    }
};