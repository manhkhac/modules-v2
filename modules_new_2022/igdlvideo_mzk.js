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
module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID } = event;
    const axios = require("axios");
    const fs = require("fs-extra");
    const { API_KEY } = global.configModule[this.config.name];
    if (!args.join(" ").indexOf("https://") == 0) { return api.sendMessage("Bạn phải nhập url video IG !", threadID, messageID); }
    api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
    const linkurl = (args.join(" ")).trim();
    try {
        let { data } = await axios.get(`https://manhict.tech/v1/igdl/video?url=${linkurl}&apikey=${API_KEY}`);
        if (data.error) return api.sendMessage(data.error, threadID);
        let followers = data.result.user.followers;
        let link = data.result.medias[0].downloadUrl;
        var path = __dirname + `/cache/${rdPath}.mp4`;
        const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, Buffer.from(getms, "utf-8"));
        if (fs.statSync(path).size > 104000000) return api.sendMessage('File cannot be sent because it is larger than 100MB.', threadID, () => unlinkSync(path), messageID);
        else return api.sendMessage({ body: `Followers: ${followers}`, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID)
    } catch (e) {
        return api.sendMessage('Không thể xử lý yêu cầu của bạn!!!', threadID, messageID);
    }
}