module.exports.config = {
    name: "sim",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Chat cùng con simsimi dễ thương nhất",
    commandCategory: "simsimi",
    usages: "[args]",
    cooldowns: 2,
    dependencies: {
        axios: ""
    },
    envConfig: {
        APIKEY: "mzkVip_Simsimi"
    }
}
async function simsimi(a, b, c) {
    const axios = require("axios"),
        { APIKEY } = global.configModule.sim,
        g = (a) => encodeURIComponent(a);
    try {
        var { data: j } = await axios({ url: `http://mzkapi.me/sim?type=ask&ask=${g(a)}&apikey=${APIKEY}`, method: "GET" });
        return { error: !1, data: j }
    } catch (p) {
        return { error: !0, data: {} }
    }
}
module.exports.onLoad = async function() {
    "undefined" == typeof global.manhG && (global.manhG = {}), "undefined" == typeof global.manhG.simsimi && (global.manhG.simsimi = new Map);
};
module.exports.handleEvent = async function({ api, event }) {
    const { threadID, messageID, senderID, body } = event, g = (senderID) => api.sendMessage(senderID, threadID, messageID);
    if (global.manhG.simsimi.has(threadID)) {
        if (senderID == api.getCurrentUserID() || "" == body || messageID == global.manhG.simsimi.get(threadID)) return;
        var { data, error } = await simsimi(body, api, event);
        return !0 == error ? void 0 : !1 == data.answer ? g(data.error) : g(data.answer)
    }
}
module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event, body = (args) => api.sendMessage(args, threadID, messageID);
    if (0 == args.length) return body("Bạn chưa nhập tin nhắn");
    switch (args[0]) {
        case "on":
            return global.manhG.simsimi.has(threadID) ? body("Bật gì tận 2 lần hả em.") : (global.manhG.simsimi.set(threadID, messageID), body("Bật sim thành công."));
        case "off":
            return global.manhG.simsimi.has(threadID) ? (global.manhG.simsimi.delete(threadID), body("Tắt sim thành công.")) : body("Tao đang phấn khởi tắt cái qq.");
        default:
            var { data, error } = await simsimi(args.join(" "), api, event);
            return !0 == data ? void 0 : !1 == data.answer ? body(data.error) : body(data.answer);
    }
};