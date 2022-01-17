module.exports.config = {
    name: "audio",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
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
var timeSearch = 4; // Tìm kiếm theo thời gian, ví dụ: 4, 5, 6,...,<= 9
var path = __dirname + `/cache/${rdus}.m4a`;
module.exports.run = async function({ event, api, args, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const { createReadStream, existsSync, writeFileSync, readdirSync, unlinkSync } = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var data = await Currencies.getData(senderID),
        money = data.money;
    //if (money < numberMoney) return api.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, threadID, messageID)
    var  API_KEY  = global.configModule[this.config.name];
    try {
        Currencies.setData(senderID, options = { money: money - parseInt(numberMoney) })
        if (args.length == 0 || !args) return api.sendMessage('» Search cannot be left blank!', threadID, messageID);
        if (args.join(" ").indexOf("https://") == 0) {
            const linkurl = (args.join(" ")).trim();
            try {
                var link, desc;
                api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
                let { data } = await axios.get(`https://manhict.tech/video?link=${linkurl}&apikey=${API_KEY}`);
                if (data.status != "ok") return api.sendMessage(`Erorr`, threadID, messageID);
                desc = data.title;
                link = data.link.audio;
                const getms = await axios.get(link, { responseType: "arraybuffer" });
                writeFileSync(path, Buffer.from(getms.data, "utf-8"))
                api.sendMessage({ body: desc, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                return;
            } catch (e) {
                console.log(e);
                return api.sendMessage('Có lỗi xảy ra!', threadID, messageID);
            }
        } else {
            try {
                var results = [],
                    link = [],
                    msg = "",
                    num = 0,
                    value;
                const keywordSearch = encodeURIComponent(args.join(" "));
                results = (await axios.get(`https://manhict.tech/youtube?q=${keywordSearch}&apikey=${API_KEY}`)).data.results;
                for (let key in results) {
                    if (results[key].video != undefined) {
                        value = (results[key].video);
                        if (value.duration.length <= timeSearch && value.duration != "Live") {
                            num = num += 1;
                            link.push(value.id);
                            let time = value.duration;
                            msg += (`${num}.《${time}》 ${value.title}\n\n`);
                        }
                    }
                }
                var body = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
                return api.sendMessage({
                        body: body
                    }, threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            idYT: link
                        })
                    },
                    messageID);
            } catch (error) {
                return api.sendMessage("The request could not be processed due to an error: " + error.message, threadID, messageID);
            }
        }
    } catch (ex) {
        console.log(ex);
        return;
    }
}
module.exports.handleReply = async function({ api, event, handleReply, Currencies }) {
    const ytdl = global.nodemodule["ytdl-core"];
    const { threadID, senderID, messageID } = event;
    const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
    var data = await Currencies.getData(senderID),
        money = data.money;
    if (parseInt(senderID) != parseInt(handleReply.author)) {
        if (money < numberMoney) return api.sendMessage(`Bạn không đủ tiền để sử dụng lệnh này!\nBạn cần tối thiểu ${numberMoney}$ để nghe nhạc`, threadID, messageID);
        Currencies.setData(senderID, options = { money: money - parseInt(numberMoney) })
    };
    try {
        ytdl.getInfo(handleReply.idYT[event.body - 1]).then(res => {
            let body = res.videoDetails.title;
            ytdl(handleReply.idYT[event.body - 1])
                .pipe(createWriteStream(path))
                .on("close", () => {
                    if (statSync(path).size > 99952214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 50MB.', threadID, () => unlinkSync(path), messageID);
                    else return api.sendMessage({ body: `${body}`, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID)
                })
                .on("error", (error) => api.sendMessage(`Đã xảy ra vấn đề khi đang xử lý request, lỗi: \n${error}`, threadID, messageID));
        });
    } catch {
        api.sendMessage("Không thể xử lý yêu cầu của bạn!", threadID, messageID);
    }
    return api.unsendMessage(handleReply.messageID);
}