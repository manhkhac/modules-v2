/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "video",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    },
    envConfig: {
        "API_KEY": "mzkFree_722124509AC10"
    }
};
var rdus = Math.floor(Math.random() * 99999999999999);
var timeSearch = 4; // Tìm kiếm video theo thời gian, ví dụ: 4, 5, 6
module.exports.run = async function({ event: e, api: t, args: a, body: s }) {
    const r = require("axios"),
        { createReadStream: n, statSync: i, writeFileSync: o, createWriteStream: d, unlinkSync: u } = require("fs-extra"),
        { threadID: c, senderID: l, messageID: g } = e,
        { API_KEY: h } = global.configModule[this.config.name];
    try {
        if (0 == a.length || !a) return t.sendMessage("» Search cannot be left blank!", c, g);
        if (0 == a.join(" ").indexOf("https://")) {
            const e = a.join(" ").trim();
            try {
                let { data: a } = await r.get(`https://manhict.tech/video?link=http://youtu.be/${e}&apikey=${h}`);
                if (a.error) return t.sendMessage(a.error, c);
                if (t.sendMessage("Đang tải, vui lòng đợi", c, ((e, a) => setTimeout((() => { t.unsendMessage(a.messageID) }), 3e4))), "ok" != a.status) return t.sendMessage("Can't download this video!", c, g);
                let s = a.title,
                    d = a.link.medium;
                var m = __dirname + `/cache/${rdus}.mp4`;
                const l = (await r.get(d.trim(), { responseType: "arraybuffer" })).data;
                if (o(m, Buffer.from(l, "utf-8")), i(m).size > 52e6) return t.sendMessage("File cannot be sent because it is larger than 50MB.", c, (() => u(m)), g);
                return await t.sendMessage({ body: s, attachment: n(m) }, c, (() => u(m)), g)
            } catch (e) { return console.log(e), t.sendMessage("Your request could not be processed!", c, g) }
        } else try {
            var f, y, p = [],
                b = "",
                M = 0,
                v = 0,
                $ = [];
            const i = encodeURIComponent(a.join(" "));
            var { data: I } = await r.get(`https://manhict.tech/youtube?q=${i}&apikey=${h}`);
            if (I.error) return t.sendMessage(I.error, c);
            f = I.results;
            for (let e in f)
                if (null != f[e].video && (y = f[e].video).duration.length <= timeSearch && "Live" != y.duration) {
                    let e = __dirname + `/cache/${v+=1}.png`,
                        t = `${y.thumbnail_src}`,
                        a = (await r.get(`${t}`, { responseType: "arraybuffer" })).data;
                    o(e, Buffer.from(a, "utf-8")), $.push(n(__dirname + `/cache/${v}.png`)), M = M += 1, p.push(y.id), b += `${M}.《${y.duration}》 ${y.title}\n\n`
                }
            s = `»🔎 There are ${p.length} results matching your search keyword:\n\n${b}» Please reply (feedback) choose one of the above searches.`;
            return void t.sendMessage({ attachment: $, body: s }, c, ((t, a) => { client.handleReply.push({ name: this.config.name, messageID: a.messageID, author: e.senderID, idYT: p }) }), g)
        } catch (e) { return t.sendMessage("The request could not be processed due to an error: " + e.message, c, g) }
    } catch (e) { return void console.log(e) }
}, module.exports.handleReply = async function({ event: e, api: t, handleReply: a }) {
    const s = require("axios"),
        { createReadStream: r, statSync: n, writeFileSync: i, readdirSync: o, unlinkSync: d } = require("fs-extra"),
        { threadID: u, senderID: c, messageID: l, body: g } = e,
        { API_KEY: h } = global.configModule[this.config.name];
    if (m = g, isNaN(m) || (m < 1 || m > 20)) return t.sendMessage("Choose from 1 -> 20, baby. love uwu ❤️", u, l);
    var m;
    t.unsendMessage(a.messageID), t.sendMessage("Đang tải, vui lòng đợi...", u, ((e, a) => setTimeout((() => { t.unsendMessage(a.messageID) }), 3e4)));
    try {
        let { data: o } = await s.get(`https://manhict.tech/video?link=http://youtu.be/${a.idYT[e.body-1]}&apikey=${h}`);
        if (o.error) return t.sendMessage(o.error, u);
        if ("ok" != o.status) return t.sendMessage("Can't download this video!", u, l);
        let c = o.title,
            g = o.link.medium;
        var f = __dirname + `/cache/${rdus}.mp4`;
        const m = (await s.get(g.trim(), { responseType: "arraybuffer" })).data;
        if (i(f, Buffer.from(m, "utf-8")), n(f).size > 104e6) return t.sendMessage("File cannot be sent because it is larger than 100MB.", u, (() => d(f)), l);
        return await t.sendMessage({ body: c, attachment: r(f) }, u, (() => d(f)), l)
    } catch (e) { return console.log(e), t.sendMessage("Your request could not be processed!", u, l) }
};