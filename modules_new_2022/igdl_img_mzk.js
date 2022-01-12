/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "igdl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Tìm kiếm hình ảnh Abum Íntagram",
    commandCategory: "Tiện ích",
    usages: "[Text]",
    cooldowns: 0,
};
module.exports.run = async function({
    api: e,
    event: a,
    args: t
}) {
    const n = require("axios"),
        r = require("fs-extra"),
        {
            threadID: s,
            messageID: i
        } = (require("request"), a);
    if (!t[0]) return e.sendMessage("Bạn phải nhập url Igstgram !", s, i);
    e.sendMessage("Đang tải ảnh, vui lòng đợi...", s, ((a, t) => setTimeout((() => {
        e.unsendMessage(t.messageID)
    }), 2e4)));
    const g = t.join(" ").trim(),
        {
            data: c
        } = await n.get(`https://manhict.tech/igdownload?link=${g}`);
    c.pop();
    for (var u = 0, d = [], h = 0; h < c.length; h++) {
        let e = __dirname + `/cache/${u+=1}.jpg`,
            a = (await n.get(`${c[h]}`, {
                responseType: "arraybuffer"
            })).data;
        r.writeFileSync(e, Buffer.from(a, "utf-8")), d.push(r.createReadStream(__dirname + `/cache/${u}.jpg`))
    }
    await e.sendMessage({
        attachment: d,
        body: "Ảnh của bạn đây:D"
    }, a.threadID, a.messageID);
    for (let e = 1; e < c.length; e++) r.unlinkSync(__dirname + `/cache/${e}.png`)
};