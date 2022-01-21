/**
 * @author MạnhG
 * @warn Do not edit code or edit credits
 */

"use strict"
module.exports.config = {
    name: "sing",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[link / keySearch]",
    cooldowns: 10,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": "",
        "tinyurl": ""
    }
};
let API_KEY = "KeyTest"; //Nơi thay API_KEY của bạn
let configname = "sing";
let time_Search = 5; //Thời gian tìm kiếm ra nhạc thời lượng dài ngắn....VD: 4,5,6,7,8
let rdPath = Math.floor(Math.random() * 99999999999999);
module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID, senderID } = event;
    const axios = require('axios')
    const { createReadStream, statSync, writeFileSync, readdirSync, unlinkSync } = require('fs-extra');
    if (args.join(" ").indexOf("https://") == 0) {
        const linkurl = (args.join(" ")).trim();
        try {
            api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 30000));
            let { data } = await axios.get(`https://manhict.tech/sing?link=${linkurl}&apikey=${API_KEY}`);
            if (data.error) return api.sendMessage(data.error, threadID);
            let title = data.title;
            let link = data.link;
            var path = __dirname + `/cache/${rdPath}.m4a`;

            if (link == "") {
                let { data } = await axios.get(`https://manhict.tech/video?link=${linkurl}&apikey=${API_KEY}`);
                if (data.error) return api.sendMessage(data.error, threadID);
                let titlev2 = data.title;
                let linkv2 = data.link.audio;
                const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                writeFileSync(path, Buffer.from(getms, "utf-8"));
                const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                return msg;
            } else {
                const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
                writeFileSync(path, Buffer.from(getms, "utf-8"));
                if (statSync(path).size > 26000000) {
                    api.sendMessage(`Không thể gửi file có dung lượng lớn hơn 25MB.\n\nTiến hành render và gửi lại...`, threadID, () => unlinkSync(path), messageID);
                    let { data } = await axios.get(`https://manhict.tech/video?link=${linkurl}&apikey=${API_KEY}`);
                    if (data.error) return api.sendMessage(data.error, threadID);
                    let titlev2 = data.title;
                    let linkv2 = data.link.audio;
                    const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                    writeFileSync(path, Buffer.from(getms, "utf-8"));
                    const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                    return msg;
                } else return await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
            }
        } catch (e) {
            console.log(e);
            return api.sendMessage(e, threadID, messageID);
        }
    } else if (args.join(" ") == "") {
        return api.sendMessage("Reply tin nhắn này nhập thời gian tìm kiếm YTB(Là 1 con số 3 < timeSearch < 9)\n\nVí dụ:\n4 -> get những bài nhạc ngắn\n7 -> get những bài nhạc siêu dài", threadID, (err, info) => {
            client.handleReply.push({
                step: 1,
                name: configname,
                messageID: info.messageID,
                content: {
                    id: senderID,
                    timeSearch: "",
                    keySearch: ""
                }
            })
        }, messageID);
    } else {
        let results = [],
            link = [],
            msg = "",
            num = 0,
            value;
        const keywordSearch = encodeURIComponent(args.join(" "));
        try {
            var { data } = await axios.get(`https://manhict.tech/youtube?q=${keywordSearch}&apikey=${API_KEY}`);
            if (data.error) return api.sendMessage(data.error, threadID);
        } catch (error) {
            return api.sendMessage(error, threadID);
        }
        results = data.results;
        for (let key in results) {
            if (results[key].video != undefined) {
                value = (results[key].video);
                if (value.duration.length <= time_Search && value.duration != "Live") {
                    num = num += 1;
                    link.push(value.id);
                    let time = value.duration;
                    msg += `${num}.《${time}》 ${value.title}\n\n`;
                }
            }
        }
        var bodySend = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
        api.sendMessage({
                body: bodySend
            }, threadID, (error, info) => {
                client.handleReply.push({
                    step: "bodySend",
                    name: configname,
                    messageID: info.messageID,
                    author: event.senderID,
                    idYT: link
                })
            },
            messageID);
        return;
    }
}

module.exports.handleReply = async function({ event, api, handleReply }) {
    const axios = require('axios')
    const { createReadStream, statSync, writeFileSync, readdirSync, unlinkSync } = require('fs-extra');
    const { threadID, senderID, messageID, body } = event;

    function number1(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 4 || x > 8);
    }

    function number(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 1 || x > 20);
    }

    const input = body.trim();
    const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
        client.handleReply.splice(client.handleReply.indexOf(handleReply), 1);
        api.unsendMessage(handleReply.messageID);
        client.handleReply.push({
            step: step,
            name: configname,
            messageID: info.messageID,
            content: content
        })
    }, messageID);

    let content = handleReply.content;
    switch (handleReply.step) {
        case 1:
            content.timeSearch = input;
            if (number1(body)) return api.sendMessage('Chọn từ 4 -> 8, baby. love uwu ❤️', threadID, messageID);
            sendC("Reply tin nhắn này nhập từ cần tìm kiếm hoặc url video", 2, content);
            break;

        case 2:
            content.keySearch = input;
            client.handleReply.splice(client.handleReply.indexOf(handleReply), 1);
            api.unsendMessage(handleReply.messageID);
            let c = content;
            if (c.keySearch.indexOf("https://") == 0) {
                const linkurl = (c.keySearch);
                try {
                    api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 30000));
                    let { data } = await axios.get(`https://manhict.tech/sing?link=${linkurl}&apikey=${API_KEY}`);
                    if (data.error) return api.sendMessage(data.error, threadID);
                    let title = data.title;
                    let link = data.link;
                    var path = __dirname + `/cache/${rdPath}.m4a`;

                    if (link == "") {
                        let { data } = await axios.get(`https://manhict.tech/video?link=${linkurl}&apikey=${API_KEY}`);
                        if (data.error) return api.sendMessage(data.error, threadID);
                        let titlev2 = data.title;
                        let linkv2 = data.link.audio;
                        const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                        writeFileSync(path, Buffer.from(getms, "utf-8"));
                        const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                        return msg;
                    } else {
                        const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
                        writeFileSync(path, Buffer.from(getms, "utf-8"));
                        if (statSync(path).size > 26000000) {
                            api.sendMessage(`Không thể gửi file có dung lượng lớn hơn 25MB.\n\nTiến hành render và gửi lại...`, threadID, () => unlinkSync(path), messageID);
                            let { data } = await axios.get(`https://manhict.tech/video?link=${linkurl}&apikey=${API_KEY}`);
                            if (data.error) return api.sendMessage(data.error, threadID);
                            let titlev2 = data.title;
                            let linkv2 = data.link.audio;
                            const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                            writeFileSync(path, Buffer.from(getms, "utf-8"));
                            const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                            return msg;
                        } else return await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                    }
                } catch (e) {
                    console.log(e);
                    return api.sendMessage(e, threadID, messageID);
                }
            } else {
                let results = [],
                    link = [],
                    msg = "",
                    num = 0,
                    value;
                const keywordSearch = encodeURIComponent(c.keySearch);
                try {
                    var { data } = await axios.get(`https://manhict.tech/youtube?q=${keywordSearch}&apikey=${API_KEY}`);
                    if (data.error) return api.sendMessage(data.error, threadID);
                } catch (error) {
                    return api.sendMessage(error, threadID);
                }
                results = data.results;
                for (let key in results) {
                    if (results[key].video != undefined) {
                        value = (results[key].video);
                        if (value.duration.length <= c.timeSearch && value.duration != "Live") {
                            num = num += 1;
                            link.push(value.id);
                            let time = value.duration;
                            msg += `${num}.《${time}》 ${value.title}\n\n`;
                        }
                    }
                }
                var bodySend = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
                api.sendMessage({
                        body: bodySend
                    }, threadID, (error, info) => {
                        client.handleReply.push({
                            step: "bodySend",
                            name: configname,
                            messageID: info.messageID,
                            author: event.senderID,
                            idYT: link
                        })
                    },
                    messageID);
                return;
            }
            break;

        case "bodySend":
            client.handleReply.splice(client.handleReply.indexOf(handleReply), 1);
            if (number(body)) return api.sendMessage('Choose from 1 -> 20, baby. love uwu ❤️', threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 30000));
            try {
                let { data } = await axios.get(`https://manhict.tech/sing/id?id=${handleReply.idYT[body - 1]}&apikey=${API_KEY}`);
                if (data.error) return api.sendMessage(data.error, threadID);
                let title = data.title;
                let link = data.link;
                var path = __dirname + `/cache/${rdPath}.m4a`;

                if (link == "") {
                    let { data } = await axios.get(`https://manhict.tech/singv2/id?id=${handleReply.idYT[body - 1]}&apikey=${API_KEY}`);
                    if (data.error) return api.sendMessage(data.error, threadID);
                    let titlev2 = data.title;
                    let linkv2 = data.link;
                    const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                    writeFileSync(path, Buffer.from(getms, "utf-8"));
                    const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                    return msg;
                } else {
                    const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
                    writeFileSync(path, Buffer.from(getms, "utf-8"));
                    if (statSync(path).size > 26000000) {
                        api.sendMessage(`Không thể gửi file có dung lượng lớn hơn 25MB.\n\nTiến hành render và gửi lại...`, threadID, () => unlinkSync(path), messageID);
                        let { data } = await axios.get(`https://manhict.tech/singv2/id?id=${handleReply.idYT[event.body - 1]}&apikey=${API_KEY}`);
                        if (data.error) return api.sendMessage(data.error, threadID);
                        let titlev2 = data.title;
                        let linkv2 = data.link;
                        const getms = (await axios.get(linkv2, { responseType: "arraybuffer" })).data;
                        writeFileSync(path, Buffer.from(getms, "utf-8"));
                        const msg = await api.sendMessage({ body: titlev2, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                        return msg;
                    } else return await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                }
            } catch (e) {
                console.log(e);
                return api.sendMessage(e, threadID, messageID);
            }
            break;

        default:
            break;
    }
}
