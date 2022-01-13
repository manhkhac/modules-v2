module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[search]",
    cooldowns: 10,
    envConfig: {
        "API_KEY": "mzkFree_722124509AC10"
    }
};
var rdus = Math.floor(Math.random() * 99999999999999);
var timeSearch = 7; // Tìm kiếm video theo thời gian, ví dụ: 4, 5, 6
module.exports.run = async function({
    event: e,
    api: t,
    args: s,
    body: a
}) {
    const r = require("axios"),
        {
            createReadStream: n,
            statSync: i,
            writeFileSync: o,
            createWriteStream: d,
            unlinkSync: u
        } = require("fs-extra"),
        {
            threadID: c,
            senderID: l,
            messageID: g
        } = e,
        {
            API_KEY: m
        } = global.configModule[this.config.name];
    try {
        if (0 == s.length || !s) return t.sendMessage("» Nhập từ cần tìm!", c, g);
        if (0 == s.join(" ").indexOf("https://")) {
            const e = s.join(" ").trim();
            try {
                let {
                    data: s
                } = await r.get(`http://mzkapi.me/video?link=http://youtu.be/${e}&apikey=${m}`);
                if (s.error) return t.sendMessage(s.error, c);
                if (t.sendMessage("Đang tải, vui lòng đợi", c, ((e, s) => setTimeout((() => {
                        t.unsendMessage(s.messageID)
                    }), 3e4))), "ok" != s.status) return t.sendMessage("Can't download this video!", c, g);
                let a = s.title,
                    d = s.link.medium;
                var h = __dirname + `/cache/${rdus}.m4a`;
                const l = (await r.get(d.trim(), {
                    responseType: "arraybuffer"
                })).data;
                if (o(h, Buffer.from(l, "utf-8")), i(h).size > 1164e6) return t.sendMessage("File cannot be sent because it is larger than 500MB.", c, (() => u(h)), g);
                return await t.sendMessage({
                    body: a,
                    attachment: n(h)
                }, c, (() => u(h)), g)
            } catch (e) {
                return console.log(e), t.sendMessage("Your request could not be processed!", c, g)
            }
        } else try {
            var f, y, p = [],
                M = "",
                b = 0;
            const n = encodeURIComponent(s.join(" "));
            var {
                data: v
            } = await r.get(`http://mzkapi.me/youtube?q=${n}&apikey=${m}`);
            if (v.error) return t.sendMessage(v.error, c);
            f = v.results;
            for (let e in f)
                if (null != f[e].video && (y = f[e].video).duration.length <= timeSearch && "Live" != y.duration) {
                    b = b += 1, p.push(y.id), M += `${b}.《${y.duration}》 ${y.title}\n\n`
                }
            a = `»🔎 There are ${p.length} results matching your search keyword:\n\n${M}» Please reply (feedback) choose one of the above searches.`;
            return void t.sendMessage(a, c, ((t, s) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: s.messageID,
                    author: e.senderID,
                    idYT: p
                })
            }), g)
        } catch (e) {
            return t.sendMessage("The request could not be processed due to an error: " + e.message, c, g)
        }
    } catch (e) {
        return void console.log(e)
    }
}, module.exports.handleReply = async function({
    event: e,
    api: t,
    handleReply: s
}) {
    const a = require("axios"),
        {
            createReadStream: r,
            statSync: n,
            writeFileSync: i,
            readdirSync: o,
            unlinkSync: d
        } = require("fs-extra"),
        {
            threadID: u,
            senderID: c,
            messageID: l,
            body: g
        } = e,
        {
            API_KEY: m
        } = global.configModule[this.config.name];
    if (h = g, isNaN(h) || (h < 1 || h > 20)) return t.sendMessage("Choose from 1 -> 20, baby. love uwu ❤️", u, l);
    var h;
    t.unsendMessage(s.messageID), t.sendMessage("Đang tải, vui lòng đợi...", u, ((e, s) => setTimeout((() => {
        t.unsendMessage(s.messageID)
    }), 3e4)));
    try {
        let {
            data: o
        } = await a.get(`http://mzkapi.me/singv2/id?id=${s.idYT[e.body-1]}&apikey=${m}`);
        if (o.error) return t.sendMessage(o.error, u);
        if ("ok" != o.status) return t.sendMessage("Can't download this video!", u, l);
        let c = o.title,
            g = o.link;
        var f = __dirname + `/cache/${rdus}.m4a`;
        const h = (await a.get(g, {
            responseType: "arraybuffer"
        })).data;
        if (i(f, Buffer.from(h, "utf-8")), n(f).size > 1164e6) return t.sendMessage("File cannot be sent because it is larger than 500MB.", u, (() => d(f)), l);
        return await t.sendMessage({
            body: c,
            attachment: r(f)
        }, u, (() => d(f)), l)
    } catch (e) {
        return console.log(e), t.sendMessage("Có lỗi xảy ra:" + e, u, l)
    }
};