/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "audio",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm nhanh",
    commandCategory: "Phương tiện",
    usages: "[Text]",
    cooldowns: 10,
    dependencies: {
        "ytdl-core": "",
        "simple-youtube-api": "",
        "fs-extra": "",
        "axios": ""
    },
    envConfig: {
        "API_KEY": "mzkFree_722124509AC10"
    }
};
var numberMoney = "500";
var rdus = Math.floor(Math.random() * 99999999999);
var path = __dirname + `/cache/${rdus}.m4a`;
module.exports.run = async function({ event: e, api: n, args: t, Currencies: a }) {
    const { threadID: s, messageID: r, senderID: o } = e, { createReadStream: i, existsSync: d, writeFileSync: l, readdirSync: h, unlinkSync: u } = global.nodemodule["fs-extra"], c = global.nodemodule.axios;
    var g = (await a.getData(o)).money;
    if (g < numberMoney) return n.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, s, r);
    var { API_KEY: y } = global.configModule[this.config.name];
    try {
        a.setData(o, options = { money: g - parseInt(numberMoney) });
        if (0 == t.length || !t) return n.sendMessage("» Search cannot be left blank!", s, r);
        if (0 == t.join(" ").indexOf("https://")) {
            const e = t.join(" ").trim();
            try {
                var m;
                n.sendMessage("Đang tải, vui lòng đợi...", s, ((e, t) => setTimeout((() => { n.unsendMessage(t.messageID) }), 2e4)));
                let { data: t } = await c.get(`https://manhict.tech/video?link=${e}&apikey=${y}`);
                if ("ok" != t.status) return n.sendMessage("Erorr", s, r);
                m = t.title, b = t.link.audio;
                const a = await c.get(b, { responseType: "arraybuffer" });
                return l(path, Buffer.from(a.data, "utf-8")), void n.sendMessage({ body: m, attachment: i(path) }, s, (() => u(path)), r)
            } catch (e) { return console.log(e), n.sendMessage("Có lỗi xảy ra!", s, r) }
        } else try {
            var p, f, b = [],
                M = "",
                v = 0;
            const a = encodeURIComponent(t.join(" "));
            p = (await c.get(`https://manhict.tech/youtube?q=${a}&apikey=${y}`)).data.results;
            for (let e in p)
                if (null != p[e].video && (f = p[e].video).duration.length < 5 && "Live" != f.duration) { v = v += 1, b.push(f.id), M += `${v}.《${f.duration}》 ${f.title}\n\n` }
            var I = `»🔎 There are ${b.length} results matching your search keyword:\n\n${M}» Please reply (feedback) choose one of the above searches.`;
            return n.sendMessage({ body: I }, s, ((n, t) => { client.handleReply.push({ name: this.config.name, messageID: t.messageID, author: e.senderID, idYT: b }) }), r)
        } catch (e) { return n.sendMessage("The request could not be processed due to an error: " + e.message, s, r) }
    } catch (e) { return void console.log(e) }
}, module.exports.handleReply = async function({ api: e, event: n, handleReply: t, Currencies: a }) {
    const s = global.nodemodule["ytdl-core"],
        { threadID: r, senderID: o, messageID: i } = n,
        { createReadStream: d, createWriteStream: l, unlinkSync: h, statSync: u } = global.nodemodule["fs-extra"];
    var c = (await a.getData(o)).money;
    if (parseInt(o) != parseInt(t.author)) {
        if (c < numberMoney) return e.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, r, i);
        a.setData(o, options = { money: c - parseInt(numberMoney) })
    }
    try {
        s.getInfo(t.idYT[n.body - 1]).then((a => {
            let o = a.videoDetails.title;
            s(t.idYT[n.body - 1]).pipe(l(path)).on("close", (() => u(path).size > 99952214400 ? e.sendMessage("Không thể gửi file vì dung lượng lớn hơn 50MB.", r, (() => h(path)), i) : e.sendMessage({ body: `${o}`, attachment: d(path) }, r, (() => h(path)), i))).on("error", (n => e.sendMessage(`Đã xảy ra vấn đề khi đang xử lý request, lỗi: \n${n}`, r, i)))
        }))
    } catch { e.sendMessage("Không thể xử lý yêu cầu của bạn!", r, i) }
    return e.unsendMessage(t.messageID)
};
