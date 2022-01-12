/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "tiktok",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link Tiktok hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
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
var timeVD = "0"; // 0 - mọi lúc; 1 - ngày hôm qua; 7 - tuần này; 30 - tháng; 90 - 3 tháng; 180 - 6 tháng
var rdus = Math.floor(Math.random() * 99999999999999);
var path = __dirname + `/cache/${rdus}.mp4`;
module.exports.run = async function({ event: e, api: t, args: a }) {
    const { threadID: s, senderID: n, messageID: r } = e, { createReadStream: i, existsSync: o, writeFileSync: c, readdirSync: d, unlinkSync: u } = require("fs-extra"), l = require("axios"), { API_KEY: h } = global.configModule[this.config.name];
    try {
        if (0 == a.length || !a) return t.sendMessage("» Nhập ký tự cần tìm kiếm!", s, r);
        if (0 == a.join(" ").indexOf("https://")) {
            const e = a.join(" ").trim();
            try {
                t.sendMessage("Đang tải, vui lòng đợi...", s, ((e, a) => setTimeout((() => { t.unsendMessage(a.messageID) }), 2e4)));
                let { data: a } = await l.get(`https://manhict.tech/tiktok?link=${e}&apikey=${h}`);
                if (200 != a.msg) return t.sendMessage("Có lỗi xảy ra vui lòng thử lại sau!", s, r);
                let n = a.data.title,
                    o = a.data.video_no_watermark;
                const d = await l.get(o, { responseType: "arraybuffer" });
                return c(path, Buffer.from(d.data, "utf-8")), void t.sendMessage({ body: n, attachment: i(path) }, s, (() => u(path)), r)
            } catch (e) { return console.log(e), t.sendMessage("Có lỗi xảy ra!", s, r) }
        } else try {
            var g, f = [],
                y = [],
                m = "",
                p = 0;
            const n = encodeURIComponent(a.join(" "));
            var { data: k } = await l.get(`https://manhict.tech/tiktok/search?query=${n}&time=${timeVD}&apikey=${h}`);
            if (k.error) return t.sendMessage(k.error, s);
            g = k.results;
            for (let e of g) {
                f.push(e.video), y.push(e.desc);
                var M = `${e.time}`,
                    v = Math.floor(M / 1e3 / 60 < 0),
                    x = Math.floor(M / 1e3 % 60);
                if (1 == (p = p += 1)) var I = "⓵";
                if (2 == p) I = "⓶";
                if (3 == p) I = "⓷";
                if (4 == p) I = "⓸";
                if (5 == p) I = "⓹";
                if (6 == p) I = "⓺";
                if (7 == p) I = "⓻";
                if (8 == p) I = "⓼";
                if (9 == p) I = "⓽";
                if (10 == p) I = "⓾";
                m += `${I}.《${v+":"+x}》${e.desc}\n\n`
            }
            var D = `»🔎 There are ${f.length} results matching your search keyword:\n\n${m}» Please reply (feedback) choose one of the above searches.`;
            return t.sendMessage({ body: D }, s, ((t, a) => { client.handleReply.push({ name: this.config.name, messageID: a.messageID, author: e.senderID, tikTitle: y, tikLink: f }) }), r)
        } catch (e) { return t.sendMessage("Có lỗi xảy ra:" + e, s, r) }
    } catch (e) { return void console.log(e) }
}, module.exports.handleReply = async function({ event: e, api: t, handleReply: a }) {
    const { threadID: s, body: n, messageID: r } = e, { createReadStream: i, existsSync: o, writeFileSync: c, readdirSync: d, unlinkSync: u } = require("fs-extra"), l = require("axios");
    if (h = n, isNaN(h) || (h < 1 || h > 10)) return t.sendMessage("Chọn từ 1 -> 10, baby. love uwu ❤️", s, r);
    var h;
    t.unsendMessage(a.messageID), t.sendMessage("Đang tải, vui lòng đợi...", s, ((e, a) => setTimeout((() => { t.unsendMessage(a.messageID) }), 2e4)));
    try {
        const e = a.tikTitle[n - 1],
            o = a.tikLink[n - 1],
            d = await l.get(o, { responseType: "arraybuffer" });
        c(path, Buffer.from(d.data, "utf-8"));
        return await t.sendMessage({ body: e, attachment: i(path) }, s, (() => u(path)), r)
    } catch (e) { return console.log(e), t.sendMessage("Có lỗi xảy ra!", s, r) }
};