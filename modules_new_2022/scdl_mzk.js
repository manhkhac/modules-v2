/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "scdl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link Soundcloud",
    commandCategory: "Phương tiện",
    usages: "[link nhạc]",
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
var randomPath = Math.floor(Math.random() * 999999999999);
module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID } = event;
    const axios = require("axios");
    const { createReadStream, existsSync, writeFileSync, readdirSync, unlinkSync } = require('fs-extra');
    const { downloadFile } = global.utils;
    const { API_KEY } = global.configModule[this.config.name];
    if (!args.join(" ").indexOf("https://") == 0) { return api.sendMessage("Bạn phải làm nhập url video Soundlcloud !", threadID, messageID); }
    api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
    const linkurl = (args.join(" ")).trim();
    try {
        let { data } = await axios.get(`http://mzkapi.me/scdl?link=${linkurl}&apikey=${API_KEY}`);
        if (data.error) return api.sendMessage(data.error, threadID);
        let title = data.title;
        let link = data.link;
        var path = __dirname + `/cache/${randomPath}.mp3`;
        await downloadFile(link, path);
        const msg = await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
        return msg;
    } catch (e) {
        return api.sendMessage('Không thể xử lý yêu cầu của bạn!!!', threadID, messageID);
    }
}