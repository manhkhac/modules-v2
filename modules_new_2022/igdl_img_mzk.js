/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "igdl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Tìm kiếm hình ảnh",
    commandCategory: "Tiện ích",
    usages: "[Text]",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const { threadID, messageID } = event;

    if (!args.join(" ").indexOf("https://") == 0) { return api.sendMessage(`Bạn phải nhập url Igstgram\ncó dạng album: https://www.instagram.com/p/CYA1N-1rSvy/?utm_medium=copy_link`, threadID, messageID); }
    api.sendMessage(`Đang tải ảnh, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
    const linkurl = (args.join(" ")).trim();
    const { data } = await axios.get(`https://manhict.tech/v1/igdl/img?url=${linkurl}`);
    if (data.error) return api.sendMessage(data.error, threadID);
    data.pop();
    var num = 0;
    var imgData = [];
    for (var i = 0; i < data.length; i++) {
        let path = __dirname + `/cache/${num+=1}.jpg`;
        let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
        imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }
    await api.sendMessage({
        attachment: imgData,
        body: 'Ảnh của bạn đây:D'
    }, event.threadID, event.messageID);

    for (let j = 1; j < data.length; j++) {
        fs.unlinkSync(__dirname + `/cache/${j}.png`)
    }
}